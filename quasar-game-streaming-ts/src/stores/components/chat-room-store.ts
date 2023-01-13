import { defineStore } from "pinia";
import {
	apiClient,
	ChannelChatRoomDto,
	ChannelChatRoomInfoDto,
	ChatRoomBlockTimeType,
	ChatRoomDto,
	ChatRoomSettingDto,
	JsonPatchDocument,
	UpdateChatRoomSettingDto,
} from "boot/openapi-client";
import { SignalRService } from "@quangdao/vue-signalr";

export interface ChannelChatRoomInfoDtoExtend extends ChannelChatRoomInfoDto {
	avatar?: string;
}

export const useChatRoomStore = defineStore("chat-room-store", {
	state: () => ({
		chatRoom: <ChatRoomDto>{},
		settings: <ChatRoomSettingDto>{
			followerSendMessageOnly: false,
			sendMessageRateLimitRule: {
				period: "3s",
			},
		},
		moderators: <ChannelChatRoomDto[]>[],
		banTimes: <
			{
				label: string;
				time: ChatRoomBlockTimeType;
			}[]
		>[
			{
				label: "5 minutes",
				time: "FiveMinutes",
			},
			{
				label: "30 minutes",
				time: "ThirtyMinutes",
			},
			{
				label: "60 minutes",
				time: "SixtyMinutes",
			},
			{
				label: "1 day",
				time: "OneDay",
			},
			{
				label: "1 week",
				time: "OneWeek",
			},
			{
				label: "365 days",
				time: "OneYear",
			},
		],
		userChatted: <ChannelChatRoomInfoDto[]>[],
		chatText: "",
		chatHubSignalR: <SignalRService>{},
	}),
	getters: {
		getRateLimit(state) {
			return state.settings.sendMessageRateLimitRule;
		},
		getPeriodNumber(state) {
			let time = 0;
			if (state.settings.sendMessageRateLimitRule?.period) {
				time = parseInt(state.settings.sendMessageRateLimitRule.period);
			}
			return time;
		},
	},
	actions: {
		setMentionUser(mention: string) {
			if (mention) {
				this.chatText = this.chatText.trim() + ` @${mention} `;
			}
		},

		async getChatRoomByAdminId(id: string): Promise<ChatRoomDto> {
			try {
				this.chatRoom = await apiClient.chatRoom.getByAdminId(id);
				return this.chatRoom;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		async getChatRoomSetting(): Promise<ChatRoomSettingDto> {
			try {
				this.settings = await apiClient.chatRoom.getSetting(
					this.chatRoom.id
				);
				return this.settings;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		async toggleFollowerOnly() {
			const requestBody: JsonPatchDocument = [
				{
					op: "replace",
					path: "/followerSendMessageOnly",
					value: this.settings.followerSendMessageOnly,
				},
			];
			await this.patchSetting(requestBody);
		},

		async setRateLimit(rateLimit: number) {
			const requestBody: JsonPatchDocument = [
				{
					op: "replace",
					path: "/sendMessageRateLimitRule",
					value: {
						period: rateLimit,
					},
				},
			];
			await this.patchSetting(requestBody);
		},

		async unsetRateLimit() {
			const requestBody: JsonPatchDocument = [
				{
					op: "remove",
					path: "/sendMessageRateLimitRule",
				},
			];
			await this.patchSetting(requestBody);
		},

		async patchSetting(requestBody: JsonPatchDocument) {
			await apiClient.chatRoom
				.patchSetting(this.chatRoom.id, requestBody)
				.then(async () => {
					return await this.getChatRoomSetting(this.chatRoom.id);
				})
				.catch((error) => {
					console.log(error);
				});
		},

		async getListModerator(): Promise<ChannelChatRoomDto> {
			try {
				this.moderators = await apiClient.chatRoom.getListModerators(
					this.chatRoom.id
				);
				return this.moderators;
			} catch (error) {
				console.log(error);
				throw error;
			}
		},

		async getChannelJoinedInfo(
			channelId: string
		): Promise<ChannelChatRoomInfoDtoExtend> {
			try {
				const data = await apiClient.chatRoom.getChannelJoinedInfo(
					this.chatRoom.id,
					channelId
				);

				return {
					...data,
					avatar: `${process.env.API_URL}/api/account/${data.channelId}/profile-picture`,
				};
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
	},
});
