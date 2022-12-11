import {
	User,
	UserManager,
	Log,
	PopupWindowFeatures,
	UserManagerSettings,
	WebStorageStateStore,
} from "oidc-client-ts";

//// OIDC_TS
Log.setLogger(console);
Log.setLevel(Log.INFO);
export class AuthService {
	userManager: UserManager;
	constructor(args?: UserManagerSettings) {
		const settings = {
			authority: "https://localhost:44356/",
			client_id: "GameStreaming_Quasar",
			redirect_uri:
				"https://localhost:8080/authentication/login-callback",
			silent_redirect_uri:
				"https://localhost:8080/authentication/silent-callback",
			response_type: "code",
			post_logout_redirect_uri:
				"https://localhost:8080/authentication/logout-callback",
			scope: "GameStreaming openid profile offline_access",
			automaticSilentRenew: true,
			automaticSilentSignin: false,
			// acr_values: "google",
			popupWindowFeatures: <PopupWindowFeatures>{
				width: 500,
			},
			// staleStateAgeInSeconds: 10,

			userStore: new WebStorageStateStore({
				store: window.localStorage,
			}),
			...args,
		};
		this.userManager = new UserManager(settings);
		this.userManager.events.addSilentRenewError(function () {
			console.error("Silent Renew Error");
		});
	}
}
///Oidc pinia
export const oidcSettings = {
	authority: "https://localhost:44356/",
	client_id: "GameStreaming_Quasar",
	redirect_uri: "https://localhost:8080/authentication/login-callback",
	silent_redirect_uri:
		"https://localhost:8080/authentication/silent-callback",
	response_type: "code",
	scope: "GameStreaming openid profile offline_access",
	automaticSilentRenew: true,
	automaticSilentSignin: true,
	// acr_values: "google",
	staleStateAgeInSeconds: 10,
	popupWindowFeatures: <PopupWindowFeatures>{
		width: 500,
	},
	userStore: new WebStorageStateStore({
		store: window.localStorage,
	}),
	post_logout_redirect_uri:
		"https://localhost:8080/authentication/logout-callback",
};
