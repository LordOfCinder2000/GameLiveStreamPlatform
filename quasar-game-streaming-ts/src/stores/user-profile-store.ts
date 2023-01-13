import { useAppConfigurationStore } from "./app-configuration-store";
import { defineStore } from "pinia";
import { ProfileDto, apiClient } from "boot/openapi-client";
import { useOidcStore } from "./modules/oidc-store";
import { useChatRoomStore } from "./components/chat-room-store";

type ProfileDtoExtend = ProfileDto & {
	id: string;
};

export const useUserProfileStore = defineStore("user-profile-store", {
	state: () => ({
		myProfile: <ProfileDtoExtend>{},
	}),
	getters: {
		isAdminOfChatRoom: (state) => {
			const chatRoomStore = useChatRoomStore();
			return chatRoomStore.chatRoom.adminId == state.myProfile.id;
		},
		isModOfChatRoom: (state) => {
			const chatRoomStore = useChatRoomStore();
			return chatRoomStore.moderators.find(
				(x) => x.channelId == state.myProfile.id
			)
				? true
				: false;
		},
	},

	actions: {
		async setMyProfile() {
			try {
				await apiClient.profile.get().then((data) => {
					const oidcStore = useOidcStore();
					this.myProfile = {
						id: oidcStore.oidcUser["sub"],
						...data,
					};
				});
			} catch (error) {
				console.log(error);
			}
		},
	},
});
