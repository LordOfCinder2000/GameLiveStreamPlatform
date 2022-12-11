import { defineStore } from "pinia";
import { apiClient, ChannelDto } from "boot/openapi-client";

export const useChannelStore = defineStore("channel-store", {
	state: () => ({
		channel: <ChannelDto>{},
	}),
	getters: {},
	actions: {
		async findChannelByUserName(name: string): Promise<ChannelDto> {
			return await apiClient.channel
				.getByUserName(name)
				.then((data) => {
					this.channel = data;
					return this.channel;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
});
