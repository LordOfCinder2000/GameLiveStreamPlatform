import { useAppConfigurationStore } from "./app-configuration-store";
import { defineStore } from "pinia";
import {
	ProfileDto,
	authClient,
	authClientRequireAuth,
	apiClientRequireAuth,
} from "boot/openapi-client";
export const useUserProfileStore = defineStore("user-profile-store", {
	state: () => ({
		myProfile: <ProfileDto>{},
	}),
	getters: {},
	actions: {
		async setUserProfileState() {
			// authClient.setRequireAuthHeader("true");
			await apiClientRequireAuth.profile.get().then((data) => {
				this.myProfile = data;
			});
		},
	},
});
