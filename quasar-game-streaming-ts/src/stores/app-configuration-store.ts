import { defineStore } from "pinia";
import { authClient, apiClient } from "boot/openapi-client";
export const useAppConfigurationStore = defineStore("app-configuration-store", {
	state: () => ({
		appConfiguration: {},
	}),
	getters: {},
	actions: {
		async getApplicationConfiguration() {
			return await apiClient.abpApplicationConfiguration
				.get()
				.then((data) => {
					return (this.appConfiguration = data);
				})
				.catch((error) => {
					console.log(error);
					throw error;
				});
		},
	},
});
