import { defineStore } from "pinia";
import { apiClient, ChatRoomDto } from "boot/openapi-client";

export const useChatRoomStore = defineStore("chat-room-store", {
	state: () => ({
		chatRoom: <ChatRoomDto>{},
	}),
	getters: {},
	actions: {
		async getChatRoomById(id: string): Promise<ChatRoomDto> {
			return await apiClient.channel.getChatRoom(id).then((data) => {
				this.chatRoom = data;
				return this.chatRoom;
			});
		},
	},
});
