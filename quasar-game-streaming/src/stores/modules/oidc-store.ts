import { defineStore } from "pinia";
import { PopupWindowFeatures, WebStorageStateStore } from "oidc-client-ts";
const oidcSettings = {
	authority: process.env.AUTH_URL + "/",
	client_id: process.env.OIDC_CLIENT_ID as string,
	redirect_uri:
		(process.env.BASE_URL as string) + process.env.OIDC_REDIRECT_URI,
	silent_redirect_uri:
		(process.env.BASE_URL as string) + process.env.OIDC_SILENT_REDIRECT_URI,
	post_logout_redirect_uri:
		(process.env.BASE_URL as string) +
		process.env.OIDC_POST_LOGOUT_REDIRECT_URI,
	response_type: "code",
	scope: process.env.OIDC_SCOPE,
	automaticSilentRenew: true,
	automaticSilentSignin: true,
	staleStateAgeInSeconds: 10,
	popupWindowFeatures: <PopupWindowFeatures>{
		width: 500,
	},
	userStore: new WebStorageStateStore({
		store: window.localStorage,
	}),
};

// const oidcSettings = {
// 	authority: "https://localhost:44356/",
// 	client_id: "GameStreaming_Quasar",
// 	redirect_uri: "https://localhost:8080/authentication/login-callback",
// 	silent_redirect_uri:
// 		"https://localhost:8080/authentication/silent-callback",
// 	response_type: "code",
// 	scope: "GameStreaming openid profile offline_access",
// 	automaticSilentRenew: true,
// 	automaticSilentSignin: true,
// 	// acr_values: "google",
// 	staleStateAgeInSeconds: 10,
// 	popupWindowFeatures: <PopupWindowFeatures>{
// 		width: 500,
// 	},
// 	userStore: new WebStorageStateStore({
// 		store: window.localStorage,
// 	}),
// 	post_logout_redirect_uri:
// 		"https://localhost:8080/authentication/logout-callback",
// };

////// oidc-store
// import { PiniaOidcStore } from "modules/oidc-store";
// import type {
// 	PiniaOidcStoreState,
// 	PiniaOidcStoreGetters,
// 	PiniaOidcStoreActions,
// } from "modules/oidc-store";

// const oidcStore = new PiniaOidcStore(oidcSettings, {
// 	publicRoutePaths: ["/"],
// 	routeBase: "/",
// 	isAuthenticatedBy: "access_token",
// 	dispatchEventsOnWindow: true,
// });

// export const useOidcStore = oidcStore.CreateStore("oidc-store");

// export const useOidcStore = defineStore("oidc-store", {
// 	state: () => oidcStore.State as PiniaOidcStoreState,
// 	getters: oidcStore.Getters as PiniaOidcStoreGetters,
// 	actions: oidcStore.Actions as PiniaOidcStoreActions,
// });

////// oidc-store-pinia
import { piniaOidcCreateStoreModule } from "modules/oidc-store-pinia";

const customPiniaOidcCreateStoreModule =
	piniaOidcCreateStoreModule(oidcSettings);

export const useOidcStore = defineStore(customPiniaOidcCreateStoreModule);
