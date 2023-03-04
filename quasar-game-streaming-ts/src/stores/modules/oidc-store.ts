import { defineStore } from "pinia";
import { PopupWindowFeatures, WebStorageStateStore } from "oidc-client-ts";
import { useUserProfileStore } from "stores/user-profile-store";
import { piniaOidcCreateStoreModule } from "modules/oidc-store-pinia";
import { PiniaOidcClientSettings } from "modules/oidc-store-pinia/types/oidc";
import { PiniaOidcStore, StoreOidcClientSettings } from "modules/oidc-store";
import type {
	PiniaOidcStoreState,
	PiniaOidcStoreGetters,
	PiniaOidcStoreActions,
} from "modules/oidc-store";

const oidcSettings = <PiniaOidcClientSettings | StoreOidcClientSettings>{
	authority: process.env.AUTH_URL + "/",
	client_id: process.env.OIDC_CLIENT_ID,
	redirect_uri: process.env.BASE_URL + process.env.OIDC_REDIRECT_URI,
	silent_redirect_uri:
		process.env.BASE_URL + process.env.OIDC_SILENT_REDIRECT_URI,
	post_logout_redirect_uri:
		process.env.BASE_URL + process.env.OIDC_POST_LOGOUT_REDIRECT_URI,
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
	// metadata: {
	// 	issuer: process.env.AUTH_URL + "/",
	// 	authorization_endpoint:
	// 		process.env.AUTH_URL +
	// 		"/Account/Login?ReturnUrl=/connect/authorize",
	// 	token_endpoint: process.env.AUTH_URL + "/connect/token",
	// },
};

//#region oidc-store

// const oidcStore = new PiniaOidcStore(oidcSettings, {
// 	publicRoutePaths: ["/"],
// 	routeBase: "/",
// 	isAuthenticatedBy: "access_token",
// 	dispatchEventsOnWindow: true,
// });

// // export const useOidcStore = defineStore("oidc-store", {
// // 	state: () => oidcStore.State as PiniaOidcStoreState,
// // 	getters: oidcStore.Getters as PiniaOidcStoreGetters,
// // 	actions: oidcStore.Actions as PiniaOidcStoreActions,
// // });
// export const useOidcStore = oidcStore.CreateStore("oidc-store");
//#endregion

//#region oidc-store-pinia
const customPiniaOidcCreateStoreModule = piniaOidcCreateStoreModule(
	oidcSettings,
	{ isAuthenticatedBy: "access_token" },
	{
		userLoaded: async (user) => {
			console.log("OIDC user is loaded:", user);
			const { setMyProfile } = useUserProfileStore();
			await setMyProfile();
		},
	}
);

export const useOidcStore = defineStore(customPiniaOidcCreateStoreModule);
//#endregion
