import { defineStore } from "pinia";
import { apiClient, ChannelDto } from "boot/openapi-client";

export const useChannelStore = defineStore("channel-store", {
	state: () => ({
		channel: <ChannelDto>{},
	}),
	getters: {},
	actions: {
		async getChannelByUserName(name: string): Promise<ChannelDto> {
			try {
				this.channel = await apiClient.channel.getByUserName(name);
				return this.channel;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		isAdmin(channelId?: string) {
			if (channelId == null && this.channel.id == null) {
				return false;
			}
			return this.channel.id == channelId;
		},

		getAvatarUrlById(id: string | null | undefined) {
			if (id === null && id === undefined) return "";
			return `${process.env.API_URL}/api/account/${id}/profile-picture`;
		},
	},
});
