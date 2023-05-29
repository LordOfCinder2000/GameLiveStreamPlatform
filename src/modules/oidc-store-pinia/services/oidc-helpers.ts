import {
	OidcClientSettings,
	UserManager,
	WebStorageStateStore,
	OidcClient,
	Logger,
	ErrorResponse,
	ErrorTimeout,
	ExtraSigninRequestArgs,
	MetadataService,
	SigninResponse,
	IdTokenClaims,
	UserProfile,
	JwtClaims,
	User,
} from "oidc-client-ts";
import {
	PiniaOidcClientSettings,
	PiniaOidcStoreListeners,
} from "../types/oidc";
import { DefaultOidcConfig } from "./index";
import {
	camelCaseToSnakeCase,
	firstLetterUppercase,
	objectAssign,
	parseJwt,
	decode,
	readParams,
} from "./utils";

const defaultOidcConfig: DefaultOidcConfig = {
	userStore: new WebStorageStateStore(),
	loadUserInfo: true,
	automaticSilentSignin: true,
};

const requiredConfigProperties = [
	"authority",
	"client_id",
	"redirect_uri",
	"response_type",
	"scope",
];

const settingsThatAreSnakeCasedInOidcClient: string[] = [
	"clientId",
	"redirectUri",
	"responseType",
	"maxAge",
	"uiLocales",
	"loginHint",
	"acrValues",
	"postLogoutRedirectUri",
	"popupRedirectUri",
	"silentRedirectUri",
];

const snakeCasedSettings = (oidcSettings: OidcClientSettings) => {
	settingsThatAreSnakeCasedInOidcClient.forEach((setting) => {
		const settingKey = setting as keyof OidcClientSettings;
		if (typeof oidcSettings[settingKey] !== "undefined") {
			// @ts-ignore
			oidcSettings[camelCaseToSnakeCase(settingKey)] =
				oidcSettings[settingKey];
		}
	});
	return oidcSettings;
};

export const getOidcConfig = (oidcSettings: any): PiniaOidcClientSettings => {
	return objectAssign<PiniaOidcClientSettings>([
		defaultOidcConfig,
		snakeCasedSettings(oidcSettings),
		{ automaticSilentRenew: false }, // automaticSilentRenew is handled in pinia and not by user manager
	]);
};

export const createOidcUserManager = (
	oidcSettings: OidcClientSettings
): UserManager => {
	const oidcConfig = getOidcConfig(oidcSettings);

	requiredConfigProperties.forEach((requiredProperty) => {
		if (!oidcConfig[requiredProperty as keyof typeof oidcConfig]) {
			throw new Error(
				"Required oidc setting " +
					requiredProperty +
					" missing for creating UserManager"
			);
		}
	});
	return new UserManager(oidcConfig);
};

export const createOidcCustomUserManager = (
	oidcSettings: OidcClientSettings
): CustomUserManager => {
	const oidcConfig = getOidcConfig(oidcSettings);

	requiredConfigProperties.forEach((requiredProperty) => {
		if (!oidcConfig[requiredProperty as keyof typeof oidcConfig]) {
			throw new Error(
				"Required oidc setting " +
					requiredProperty +
					" missing for creating UserManager"
			);
		}
	});
	return new CustomUserManager(oidcConfig);
};

export const createOidcClient = (
	oidcSettings: OidcClientSettings
): OidcClient => {
	const oidcConfig = getOidcConfig(oidcSettings);

	requiredConfigProperties.forEach((requiredProperty) => {
		if (!oidcConfig[requiredProperty as keyof typeof oidcConfig]) {
			throw new Error(
				"Required oidc setting " +
					requiredProperty +
					" missing for creating OidcClient"
			);
		}
	});
	return new OidcClient(oidcConfig);
};

export const getOidcCallbackPath = (
	callbackUri?: string,
	routeBase = "/"
): string | null => {
	if (callbackUri) {
		const domainStartsAt = "://";
		const hostAndPath = callbackUri.substr(
			callbackUri.indexOf(domainStartsAt) + domainStartsAt.length
		);
		return hostAndPath
			.substr(hostAndPath.indexOf(routeBase) + routeBase.length - 1)
			.replace(/\/$/, "");
	}
	return null;
};

export const addUserManagerEventListener = (
	oidcUserManager: UserManager,
	eventName: string,
	eventListener: PiniaOidcStoreListeners[keyof PiniaOidcStoreListeners]
) => {
	const addFnName = "add" + firstLetterUppercase(eventName);
	if (
		typeof oidcUserManager.events[
			addFnName as keyof typeof oidcUserManager.events
		] === "function" &&
		typeof eventListener === "function"
	) {
		oidcUserManager.events[
			addFnName as keyof typeof oidcUserManager.events
		](eventListener);
	}
};

export const tokenExp = (token: string): number | null => {
	if (token) {
		const parsed = parseJwt(token);
		return parsed.exp ? parsed.exp * 1000 : null;
	}
	return null;
};

export const tokenIsExpired = (token: string) => {
	const tokenExpiryTime = tokenExp(token);
	if (tokenExpiryTime) {
		return tokenExpiryTime < new Date().getTime();
	}
	return false;
};

export const removeUserManagerEventListener = (
	oidcUserManager: UserManager,
	eventName: string,
	eventListener: PiniaOidcStoreListeners
) => {
	const removeFnName = "remove" + firstLetterUppercase(eventName);
	if (
		typeof oidcUserManager.events[
			removeFnName as keyof typeof oidcUserManager.events
		] === "function" &&
		typeof eventListener === "function"
	) {
		oidcUserManager.events[
			removeFnName as keyof typeof oidcUserManager.events
		](eventListener);
	}
};

export const processSilentSignInCallback = (
	oidcSettings: OidcClientSettings
) => {
	const oidcConfig = getOidcConfig(oidcSettings);

	requiredConfigProperties.forEach((requiredProperty) => {
		if (!oidcConfig[requiredProperty as keyof typeof oidcConfig]) {
			throw new Error(
				"Required oidc setting " +
					requiredProperty +
					" missing for creating UserManager"
			);
		}
	});
	return new UserManager(oidcConfig).signinSilentCallback();
};

export const processSignInCallback = (oidcSettings: OidcClientSettings) => {
	return new Promise((resolve, reject) => {
		const oidcUserManager = createOidcUserManager(oidcSettings);
		oidcUserManager
			.signinRedirectCallback()
			.then((user) => {
				resolve(
					sessionStorage.getItem("pinia_oidc_active_route") || "/"
				);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

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

export class CustomUserManager extends UserManager {
	/**
	 *
	 */
	private readonly _jsonService: JsonService = new JsonService();
	private readonly _metadataService: MetadataService;
	private _oidcClientSettings: OidcClientSettings;
	/**
	 *
	 */
	constructor(settings: OidcClientSettings) {
		super(settings);
		this._oidcClientSettings = settings;
		this._metadataService = new MetadataService(this.settings);

		// this._metadataService = new MetadataService(new OidcClientSettingsStore(settings));
	}

	public async signinPassword(args: SigninPasswordArgs = {}): Promise<User> {
		this._logger.create("signinRedirect");
		const url = await this._metadataService.getTokenEndpoint(false);
		const response = new SigninResponse(
			readParams(url, this.settings.response_mode)
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
		const profile = decode(response.id_token ?? "");

		if (!profile.sub) {
			logger.throw(new Error("ID Token is missing a subject claim"));
		}

		if (currentToken) {
			const current = decode(currentToken);
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

// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

/**
 * @internal
 */
export type JwtHandler = (text: string) => Promise<Record<string, unknown>>;

/**
 * @internal
 */
export interface GetJsonOpts {
	token?: string;
}

/**
 * @internal
 */
export interface PostFormOpts {
	body: URLSearchParams;
	basicAuth?: string;
	timeoutInSeconds?: number;
}

/**
 * @internal
 */
export class JsonService {
	private readonly _logger = new Logger("JsonService");

	private _contentTypes: string[] = [];

	public constructor(
		additionalContentTypes: string[] = [],
		private _jwtHandler: JwtHandler | null = null
	) {
		this._contentTypes.push(...additionalContentTypes, "application/json");
		if (_jwtHandler) {
			this._contentTypes.push("application/jwt");
		}
	}

	protected async fetchWithTimeout(
		input: RequestInfo,
		init: RequestInit & { timeoutInSeconds?: number } = {}
	) {
		const { timeoutInSeconds, ...initFetch } = init;
		if (!timeoutInSeconds) {
			return await fetch(input, initFetch);
		}

		const controller = new AbortController();
		const timeoutId = setTimeout(
			() => controller.abort(),
			timeoutInSeconds * 1000
		);

		try {
			const response = await fetch(input, {
				...init,
				signal: controller.signal,
			});
			return response;
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") {
				throw new ErrorTimeout("Network timed out");
			}
			throw err;
		} finally {
			clearTimeout(timeoutId);
		}
	}

	public async getJson(
		url: string,
		{ token }: GetJsonOpts = {}
	): Promise<Record<string, unknown>> {
		const logger = this._logger.create("getJson");
		const headers: HeadersInit = {
			Accept: this._contentTypes.join(", "),
		};
		if (token) {
			logger.debug("token passed, setting Authorization header");
			headers["Authorization"] = "Bearer " + token;
		}

		let response: Response;
		try {
			logger.debug("url:", url);
			response = await this.fetchWithTimeout(url, {
				method: "GET",
				headers,
			});
		} catch (err) {
			logger.error("Network Error");
			throw err;
		}

		logger.debug("HTTP response received, status", response.status);
		const contentType = response.headers.get("Content-Type");
		if (
			contentType &&
			!this._contentTypes.find((item) => contentType.startsWith(item))
		) {
			logger.throw(
				new Error(
					`Invalid response Content-Type: ${
						contentType ?? "undefined"
					}, from URL: ${url}`
				)
			);
		}
		if (
			response.ok &&
			this._jwtHandler &&
			contentType?.startsWith("application/jwt")
		) {
			return await this._jwtHandler(await response.text());
		}
		let json: Record<string, unknown>;
		try {
			json = await response.json();
		} catch (err) {
			logger.error("Error parsing JSON response", err);
			if (response.ok) throw err;
			throw new Error(`${response.statusText} (${response.status})`);
		}
		if (!response.ok) {
			logger.error("Error from server:", json);
			if (json.error) {
				throw new ErrorResponse(json);
			}
			throw new Error(
				`${response.statusText} (${response.status}): ${JSON.stringify(
					json
				)}`
			);
		}
		return json;
	}

	public async postForm(
		url: string,
		{ body, basicAuth, timeoutInSeconds }: PostFormOpts
	): Promise<Record<string, unknown>> {
		const logger = this._logger.create("postForm");
		const headers: HeadersInit = {
			Accept: this._contentTypes.join(", "),
			"Content-Type": "application/x-www-form-urlencoded",
		};
		if (basicAuth !== undefined) {
			headers["Authorization"] = "Basic " + basicAuth;
		}

		let response: Response;
		try {
			logger.debug("url:", url);
			response = await this.fetchWithTimeout(url, {
				method: "POST",
				headers,
				body,
				timeoutInSeconds,
			});
		} catch (err) {
			logger.error("Network error");
			throw err;
		}

		logger.debug("HTTP response received, status", response.status);
		const contentType = response.headers.get("Content-Type");
		if (
			contentType &&
			!this._contentTypes.find((item) => contentType.startsWith(item))
		) {
			throw new Error(
				`Invalid response Content-Type: ${
					contentType ?? "undefined"
				}, from URL: ${url}`
			);
		}

		const responseText = await response.text();

		let json: Record<string, unknown> = {};
		if (responseText) {
			try {
				json = JSON.parse(responseText);
			} catch (err) {
				logger.error("Error parsing JSON response", err);
				if (response.ok) throw err;
				throw new Error(`${response.statusText} (${response.status})`);
			}
		}

		if (!response.ok) {
			logger.error("Error from server:", json);
			if (json.error) {
				throw new ErrorResponse(json, body);
			}
			throw new Error(
				`${response.statusText} (${response.status}): ${JSON.stringify(
					json
				)}`
			);
		}

		return json;
	}
}
