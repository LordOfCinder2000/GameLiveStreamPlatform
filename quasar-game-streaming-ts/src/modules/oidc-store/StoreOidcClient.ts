import {
	AccessTokenCallback,
	OidcClient,
	OidcClientSettings,
	SigninPopupArgs,
	SigninRedirectArgs,
	ExtraSigninRequestArgs,
	SigninSilentArgs,
	SignoutPopupArgs,
	SignoutRedirectArgs,
	User,
	UserManager,
	CreateSigninRequestArgs,
	MetadataService,
	UserManagerSettingsStore,
	UserManagerSettings,
	OidcClientSettingsStore,
	SigninResponse,
	UserProfile,
	JwtClaims,
	IdTokenClaims,
} from "oidc-client-ts";

import { OidcUtils, PayloadType } from ".";
import { OidcHelpers, JsonService } from ".";

export interface OidcSigninSilentOptions {
	ignoreErrors?: boolean;
}
export interface OidcSigninPopupOptions {
	ignoreErrors?: boolean;
}

export interface OidcSigninPasswordOptions {
	ignoreErrors?: boolean;
}

export interface OidcSigninRedirectOptions {
	useReplaceToNavigate?: boolean;
	skipUserInfo?: boolean;
	extraQueryParams?: Record<string, string | number | boolean>;
}

type StoreOidcListenersKeyType =
	| ((user: User) => void)
	| (() => void)
	| ((payload?: PayloadType) => void)
	| undefined;

type StoreOidcErrorListenersKey = "oidcError" | "automaticSilentRenewError";

export interface StoreOidcListeners {
	userLoaded?: (user: User) => void;
	userUnloaded?: () => void;
	accessTokenExpiring?: () => void;
	accessTokenExpired?: () => void;
	silentRenewError?: () => void;
	userSignedOut?: () => void;
	oidcError?: (payload?: PayloadType) => void;
	automaticSilentRenewError?: (payload?: PayloadType) => void;
	[key: string]: StoreOidcListenersKeyType;
}

export interface StoreOidcClientSettings extends OidcClientSettings {
	loginHint?: string;
	popupRedirectUri?: string;
	silentRedirectUri?: string;
	automaticSilentRenew?: boolean;
	automaticSilentSignin?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

/**
 * Class containing information about oidc-client-ts current UserManager, settings, and Event Listeners
 * This class is used as a object in a OidcStore classes (PiniaOidcStore and VuexOidcStore)
 */
export interface SigninPassword {
	username?: string;
	password?: string;
}
export type SigninPasswordArgs = SigninPassword & ExtraSigninRequestArgs;

const ProtocolClaims = [
	"iss",
	"aud",
	"exp",
	"nbf",
	"iat",
	"jti",
	"auth_time",
	"nonce",
	"acr",
	"amr",
	"azp",
	"at_hash",
] as const;

class CustomUserManager extends UserManager {
	/**
	 *
	 */
	private readonly _jsonService: JsonService = new JsonService();
	private readonly _metadataService: MetadataService;
	private _oidcClientSettings: StoreOidcClientSettings;
	/**
	 *
	 */
	constructor(settings: StoreOidcClientSettings) {
		super(settings);
		this._oidcClientSettings = settings;
		this._metadataService = new MetadataService(this.settings);

		// this._metadataService = new MetadataService(new OidcClientSettingsStore(settings));
	}

	public async signinPassword(args: SigninPasswordArgs = {}): Promise<User> {
		this._logger.create("signinRedirect");
		const url = await this._metadataService.getTokenEndpoint(false);
		const response = new SigninResponse(
			OidcUtils.ReadParams(url, this.settings.response_mode)
		);
		response.scope = this.settings.scope;

		await this._processToken(response, url, args);
		if (response.isOpenId) {
			this._validateIdTokenAttributes(response);
		}
		await this._processClaims(response, false, response.isOpenId);
		this._logger.debug("got signin response");

		const user = new User(response);

		await this.storeUser(user);
		this._logger.debug("user stored");
		this._events.load(user);
		if (user.profile && user.profile.sub) {
			this._logger.info("success, signed in subject", user.profile.sub);
		} else {
			this._logger.info("no subject");
		}
		return user;
	}

	protected async _processToken(
		response: SigninResponse,
		url: string,
		args: SigninPasswordArgs = {}
	): Promise<void> {
		const params = new URLSearchParams({ grant_type: "password" });

		for (const [key, value] of Object.entries(args)) {
			if (value != null) {
				params.set(key, value);
			}
		}

		params.append("client_id", this._oidcClientSettings.client_id);
		if (this._oidcClientSettings.client_secret) {
			params.append(
				"client_secret",
				this._oidcClientSettings.client_secret
			);
		}
		if (this._oidcClientSettings.scope) {
			params.append("scope", this._oidcClientSettings.scope);
		}

		const tokenResponse = await this._jsonService.postForm(url, {
			body: params,
		});
		Object.assign(response, tokenResponse);
	}

	protected async _processClaims(
		response: SigninResponse,
		skipUserInfo = false,
		validateSub = true
	): Promise<void> {
		const logger = this._logger.create("_processClaims");
		response.profile = this._filterProtocolClaims(response.profile);

		if (
			skipUserInfo ||
			!this.settings.loadUserInfo ||
			!response.access_token
		) {
			logger.debug("not loading user info");
			return;
		}

		logger.debug("loading user info");
		const token = response.access_token;
		if (!token) {
			this._logger.throw(new Error("No token passed"));
		}
		const url = await this._metadataService.getUserInfoEndpoint();
		logger.debug("got userinfo url", url);

		const claims = await this._jsonService.getJson(url, { token });
		logger.debug("got claims", claims);

		logger.debug("user info claims received from user info endpoint");

		if (validateSub && claims.sub !== response.profile.sub) {
			logger.throw(
				new Error(
					"subject from UserInfo response does not match subject in ID Token"
				)
			);
		}

		response.profile = this._mergeClaims(
			response.profile,
			this._filterProtocolClaims(claims as IdTokenClaims)
		);
		logger.debug(
			"user info claims received, updated profile:",
			response.profile
		);
	}

	protected _filterProtocolClaims(claims: UserProfile): UserProfile {
		const result = { ...claims };

		if (this.settings.filterProtocolClaims) {
			for (const type of ProtocolClaims) {
				delete result[type];
			}
		}

		return result;
	}

	protected _mergeClaims(
		claims1: UserProfile,
		claims2: JwtClaims
	): UserProfile {
		const result = { ...claims1 };

		for (const [claim, values] of Object.entries(claims2)) {
			for (const value of Array.isArray(values) ? values : [values]) {
				const previousValue = result[claim];
				if (!previousValue) {
					result[claim] = value;
				} else if (Array.isArray(previousValue)) {
					if (!previousValue.includes(value)) {
						previousValue.push(value);
					}
				} else if (result[claim] !== value) {
					if (
						typeof value === "object" &&
						this.settings.mergeClaims
					) {
						result[claim] = this._mergeClaims(
							previousValue as UserProfile,
							value
						);
					} else {
						result[claim] = [previousValue, value];
					}
				}
			}
		}

		return result;
	}

	protected _validateIdTokenAttributes(
		response: SigninResponse,
		currentToken?: string
	): void {
		const logger = this._logger.create("_validateIdTokenAttributes");

		logger.debug("decoding ID Token JWT");
		const profile = OidcUtils.Decode(response.id_token ?? "");

		if (!profile.sub) {
			logger.throw(new Error("ID Token is missing a subject claim"));
		}

		if (currentToken) {
			const current = OidcUtils.Decode(currentToken);
			if (current.sub !== profile.sub) {
				logger.throw(
					new Error("sub in id_token does not match current sub")
				);
			}
			if (current.auth_time && current.auth_time !== profile.auth_time) {
				logger.throw(
					new Error(
						"auth_time in id_token does not match original auth_time"
					)
				);
			}
			if (current.azp && current.azp !== profile.azp) {
				logger.throw(
					new Error("azp in id_token does not match original azp")
				);
			}
			if (!current.azp && profile.azp) {
				logger.throw(
					new Error(
						"azp not in id_token, but present in original id_token"
					)
				);
			}
		}

		response.profile = profile as UserProfile;
	}
}

export class StoreOidcClient {
	private _oidcClient: OidcClient;
	private _userManager: UserManager;
	private _oidcClientSettings: StoreOidcClientSettings;
	private _oidcEventListeners: StoreOidcListeners;
	private _customUserManager: CustomUserManager;

	constructor(
		oidcClientSettings: StoreOidcClientSettings,
		oidcEventListeners?: StoreOidcListeners
	) {
		this._userManager = OidcHelpers.CreateUserManager(oidcClientSettings);
		this._oidcClient = OidcHelpers.CreateOidcClient(oidcClientSettings);
		this._oidcClientSettings = oidcClientSettings;
		this._oidcEventListeners = oidcEventListeners ? oidcEventListeners : {};
		this._customUserManager = new CustomUserManager(oidcClientSettings);
	}
	DispatchCustomErrorEvent = (
		eventName: StoreOidcErrorListenersKey,
		payload: PayloadType
	) => {
		// oidcError and automaticSilentRenewError are not UserManagement events, they are events implemeted in vue-store-oidc,
		if (typeof this._oidcEventListeners[eventName] === "function") {
			this._oidcEventListeners[eventName]?.(payload);
		}
	};
	get OidcClientSettings() {
		return this._oidcClientSettings;
	}
	get OidcEventListeners() {
		return this._oidcEventListeners;
	}
	GetUser = () => this._userManager.getUser();
	RemoveUser = () => this._userManager.removeUser();
	StoreUser = (user: User | null) => this._userManager.storeUser(user);
	ClearStaleState = () => this._userManager.clearStaleState();
	AddOidcEventListener = (payload: PayloadType) => {
		OidcHelpers.AddUserManagerEventListener(
			this._userManager,
			OidcUtils.PayloadItem(payload, "eventName"),
			OidcUtils.PayloadItem(payload, "eventListener")
		);
	};
	RemoveOidcEventListener = (payload: PayloadType) => {
		OidcHelpers.RemoveUserManagerEventListener(
			this._userManager,
			OidcUtils.PayloadItem(payload, "eventName"),
			OidcUtils.PayloadItem(payload, "eventListener")
		);
	};
	AddAccessTokenExpired = (cb: AccessTokenCallback) =>
		this._userManager.events.addAccessTokenExpired(cb);
	AddAccessTokenExpiring = (cb: AccessTokenCallback) =>
		this._userManager.events.addAccessTokenExpiring(cb);
	SigninSilent = (options?: PayloadType) =>
		this._userManager.signinSilent(<SigninSilentArgs>options);
	SigninRedirect = (options?: PayloadType) =>
		this._userManager.signinRedirect(<SigninRedirectArgs>options);
	SigninRedirectCallback = (options?: PayloadType) =>
		this._userManager.signinRedirectCallback(<string>options);
	SigninPopup = (options?: PayloadType) =>
		this._userManager.signinPopup(<SigninPopupArgs>options);
	SigninPopupCallback = (options?: PayloadType) =>
		this._userManager.signinPopupCallback(<string>options);
	SignoutRedirect = (options?: PayloadType) =>
		this._userManager.signoutRedirect(<SignoutRedirectArgs>options);
	SignoutRedirectCallback = (options?: PayloadType) =>
		this._userManager.signoutRedirectCallback(<string>options);
	SignoutPopup = (options?: PayloadType) =>
		this._userManager.signoutPopup(<SignoutPopupArgs>options);
	SignoutPopupCallback = (options?: PayloadType) =>
		this._userManager.signoutPopupCallback(<string>options);
	CreateSignoutRequest = (args: any) =>
		this._oidcClient.createSignoutRequest(args);
	SignoutCallback = (options?: PayloadType) =>
		this._userManager.signoutCallback(<string>options);
	SigninSilentCallback = (options?: PayloadType) =>
		this._userManager.signinSilentCallback(<string>options);
	SigninPassword = (options?: PayloadType) =>
		this._customUserManager.signinPassword(<SigninPasswordArgs>options);
}
