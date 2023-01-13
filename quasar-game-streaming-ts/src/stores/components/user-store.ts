import { defineStore } from "pinia";
import { apiClient, UserData } from "boot/openapi-client";

export const useUserStore = defineStore("user-store", {
	state: () => ({
		user: <UserData>{},
	}),
	getters: {},
	actions: {
		async findUserByName(name: string): Promise<UserData> {
			try {
				this.user = await apiClient.userLookup.findByUserName(name);
				return this.user;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		async findUserById(id: string): Promise<UserData> {
			try {
				this.user = await apiClient.userLookup.findById(id);
				return this.user;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	},
});
