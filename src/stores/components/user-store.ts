import { defineStore } from "pinia";
import { apiClient, UserData } from "boot/openapi-client";

export const useUserStore = defineStore("user-store", {
	state: () => ({
		user: <UserData>{},
	}),
	getters: {},
	actions: {
		async findUserByName(name: string): Promise<UserData> {
			return await apiClient.userLookup
				.findByUserName(name)
				.then((data) => {
					this.user = data;
					return this.user;
				});
		},
		async findUserById(id: string): Promise<UserData> {
			return await apiClient.userLookup.findById(id).then((data) => {
				this.user = data;
				return this.user;
			});
		},
	},
});
