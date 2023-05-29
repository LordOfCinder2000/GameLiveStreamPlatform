import { defineStore } from "pinia";
import { authClient, apiClient, testApiClient } from "boot/openapi-client";
export const useAppConfigurationStore = defineStore("app-configuration-store", {
	state: () => ({
		appConfiguration: {},
	}),
	getters: {},
	actions: {
		async getApplicationConfiguration() {
			return await testApiClient.abpApplicationConfiguration
				.get()
				.then((data) => {
					this.appConfiguration = data;
				})
				.catch(() => {});
		},
	},
});
