import { RouteLocationNormalized } from "vue-router";
import { useChannelStore } from "stores/components/channel-store";
import { useChatRoomStore } from "stores/components/chat-room-store";

export async function channelNavigationGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized
) {
	const { getChannelByUserName } = useChannelStore();
	const { getChatRoomByAdminId } = useChatRoomStore();

	try {
		const channel = await getChannelByUserName(
			to.params["channel"] as string
		);
		if (!channel) {
			return { name: "error-404" };
		}
		const chatRoom = await getChatRoomByAdminId(channel.id ?? "");
		if (!chatRoom) {
			return { name: "error-404" };
		}
	} catch (error) {
		return { name: "error-404" };
	}
}

export async function chatRoomNavigationGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized
) {
	const { getChatRoomByAdminId } = useChatRoomStore();
	const channelStore = useChannelStore();

	await getChatRoomByAdminId(channelStore.channel.id ?? "")
		.then((chatRoom) => {
			if (!chatRoom) {
				return { name: "error-404" };
			}
		})
		.catch(() => {
			return { name: "error-404" };
		});
}
