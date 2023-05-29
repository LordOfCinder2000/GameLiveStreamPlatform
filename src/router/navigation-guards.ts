import { RouteLocationNormalized } from "vue-router";
import { useChannelStore } from "stores/components/channel-store";
import { useChatRoomStore } from "stores/components/chat-room-store";

export async function channelNavigationGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized
) {
	const { findChannelByUserName } = useChannelStore();
	const { getChatRoomById } = useChatRoomStore();

	return await findChannelByUserName(to.params["channel"] as string)
		.then(async (channel) => {
			if (!channel) {
				return { name: "error-404" };
			}
			await getChatRoomById(channel.id ?? "")
				.then((chatRoom) => {
					if (!chatRoom) {
						return { name: "error-404" };
					}
				})
				.catch(() => {
					return { name: "error-404" };
				});
		})
		.catch(() => {
			return { name: "error-404" };
		});
}

export async function chatRoomNavigationGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized
) {
	const { getChatRoomById } = useChatRoomStore();
	const { channel } = useChannelStore();
	await getChatRoomById(channel.id ?? "")
		.then((chatRoom) => {
			if (!chatRoom) {
				return { name: "error-404" };
			}
		})
		.catch(() => {
			return { name: "error-404" };
		});
}
