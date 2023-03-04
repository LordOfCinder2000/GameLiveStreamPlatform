<template>
	<div
		ref="chat"
		v-show="!collapseChat"
		:class="{ fullscreen: isPopoutChatRoom }"
		class="chat-container column full-height relative-position"
		:style="isPopoutChatRoom ? {} : { width: width.toString() + 'px' }"
	>
		<q-layout container>
			<div class="column fit">
				<q-drawer
					v-model="rightDrawerOpen"
					side="right"
					:bordered="isPopoutChatRoom"
					overlay
					behavior="desktop"
					:mini-width="width"
					:width="width"
				>
					<Suspense>
						<ChatUserJoin
							ref="chatUserJoin"
							v-if="rightDrawerOpen"
						/>
						<template #fallback>
							<q-inner-loading color="positive" :showing="true" />
						</template>
					</Suspense>
				</q-drawer>

				<div class="chat-header col-auto">
					<q-toolbar>
						<q-btn
							v-show="!isPopoutChatRoom"
							@click="collapseChatTrigger"
							dense
							flat
						>
							<q-icon name="mdi-arrow-expand-right" />
						</q-btn>

						<Teleport
							v-if="!isPopoutChatRoom"
							to="#chat-room-wrapper"
						>
							<div
								v-if="!isPopoutChatRoom && collapseChat"
								class="transparent chat-btn-collapse absolute-top-left"
								:class="[
									{ 'chat-btn-collapse--show': collapseChat },
								]"
							>
								<q-btn @click="collapseChatTrigger" dense flat>
									<q-icon
										name="mdi-arrow-expand-right"
										class="rotate-180"
									/>
								</q-btn>
							</div>
						</Teleport>

						<q-toolbar-title
							class="text-center text-subtitle2 text-uppercase text-weight-bold"
						>
							Trò chuyện
						</q-toolbar-title>
						<q-btn
							@click.prevent="
								() => {
									rightDrawerOpen = true;
								}
							"
							dense
							flat
						>
							<q-icon name="people" />
						</q-btn>
					</q-toolbar>
				</div>
				<q-separator color="positive" />

				<div class="chat-body col relative-position">
					<div class="fit column flex-center">
						<!-- Donate notification -->

						<div class="absolute-full flex flex-center">
							<transition
								appear
								enter-active-class="animated lightSpeedInLeft"
								leave-active-class="animated lightSpeedOutRight"
							>
								<q-img
									class="z-max"
									v-if="donateShow"
									:ratio="16 / 9"
									fit="scale-down"
									:src="
										donate.gift?.mediaList?.find(
											(x) => (x.type = 'Image')
										)?.url ?? ''
									"
									no-spinner
								/>
							</transition>
						</div>

						<ChatNotification
							class="absolute-top"
							v-model="showNotification"
							:disable="disableNotification"
							@hide="showNotification = false"
						>
							{{ notifyMessage }}
						</ChatNotification>
						<div v-if="hideChatBox">
							<div class="text-center q-mb-sm">
								<span>Chat box is hidden</span>
							</div>

							<q-btn
								color="positive"
								unelevated
								no-caps
								label="Show chat box"
								@click="hideChatBox = false"
							/>
						</div>
						<q-scroll-area
							v-show="!hideChatBox"
							ref="chatScroll"
							:thumb-style="{ width: '5px' }"
							class="q-px-xs fit"
							@scroll="chatScrollHandler"
						>
							<div
								class="chat-wrapper q-pt-md q-pb-sm column relative-position"
							>
								<p class="q-mb-sm text-center">
									Chào mừng đến kênh chat
								</p>

								<div class="chat-messages">
									<ChatMessage
										v-for="usersMessage in userMessages"
										:key="usersMessage.chatMessage.id"
										v-bind="usersMessage"
										@mention="
											(value) => {
												chatRoomStore.setMentionUser(
													value
												);
											}
										"
									/>
								</div>

								<q-btn
									v-if="newMessageBtn"
									color="positive"
									dense
									class="chat-scroll-bottom fixed-center"
									:label="btnScrollBottom.label"
									no-caps
									:icon="btnScrollBottom.icon"
									padding="sm"
									@click="scrollToBottom(300)"
									@mouseenter="changeBtnScrollBottom"
									@mouseleave="changeBtnScrollBottom"
								/>
							</div>
						</q-scroll-area>
					</div>
				</div>
				<q-separator color="positive" />

				<div class="chat-footer col-auto q-py-xs">
					<div class="column">
						<!-- Chat INPUT -->
						<Suspense>
							<ChatInput
								@update:model-value="
									(value) => {
										sendMessageError = '';
									}
								"
								@sendMessage="sendMessageToChatRoom"
								:errorMessage="sendMessageError"
								class="q-toolbar"
							/>

							<template #fallback>
								<ChatInputSkeleton class="q-toolbar" />
							</template>
						</Suspense>

						<div class="q-toolbar flex items-center">
							<div class="row full-width">
								<div class="flex items-center q-gutter-x-sm">
									<q-btn dense flat>
										<q-icon name="settings" />
										<ChatSetting
											:width="width"
											@hideChatBox="hideChatBox = true"
											@toggleNotification="
												toggleNotification
											"
											@toggleTimestamp="toggleTimestamp"
										/>
									</q-btn>
									<q-btn @click="openPopout" dense flat>
										<q-icon name="outbound" />
									</q-btn>
								</div>
								<q-space />
								<div>
									<q-btn
										class="float-right"
										color="positive"
										label="Send"
										@click="sendMessageToChatRoom"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</q-layout>
	</div>
</template>
<script lang="ts" setup>
import {
	ref,
	watch,
	nextTick,
	onBeforeMount,
	onBeforeUnmount,
	defineAsyncComponent,
	computed,
	onUnmounted,
} from "vue";
import { QScrollArea, openURL, useQuasar, date, uid } from "quasar";
import { useRoute } from "vue-router";
import { useChatHubSignalR } from "boot/signalr";
import { apiClient, DonateDto } from "boot/openapi-client";
import { Props as ChatMessageProps } from "components/chat/ChatMessage.vue";
import { useOidcStore } from "stores/modules/oidc-store";
import {
	useChatRoomStore,
	ChannelChatRoomInfoDtoExtend,
} from "stores/components/chat-room-store";
import { useAccountStore } from "stores/components/account-store";
import { useChannelStore } from "stores/components/channel-store";
import { useUserProfileStore } from "stores/user-profile-store";
//#region Async import
const ChatMessage = defineAsyncComponent(
	() => import("components/chat/ChatMessage.vue")
);
const DonateMessage = defineAsyncComponent(
	() => import("components/chat/DonateMessage.vue")
);
const ChatSetting = defineAsyncComponent(
	() => import("components/chat/ChatSetting.vue")
);
const ChatUserJoin = defineAsyncComponent(
	() => import("components/chat/ChatUserJoin.vue")
);
const ChatNotification = defineAsyncComponent(
	() => import("components/chat/ChatNotification.vue")
);
const ChatInput = defineAsyncComponent(
	() => import("components/chat/ChatInput.vue")
);
//#endregion

const props = defineProps({
	width: {
		type: Number,
		default: 380,
	},
	channelId: {
		type: String,
		default: null,
	},
});

const $q = useQuasar();

const channelStore = useChannelStore();
const chat = ref(null);
const chatUserJoin = ref<InstanceType<typeof ChatUserJoin> | null>(null);
const hideChatBox = ref(false);
const isPopoutChatRoom = ref(false);
const collapseChat = ref(false);
const rightDrawerOpen = ref(false);
const collapseChatTrigger = () => {
	collapseChat.value = !collapseChat.value;
};
// Router control
const route = useRoute();
const chatRoomStore = useChatRoomStore();
const userProfileStore = useUserProfileStore();

onBeforeMount(() => {
	if (route.name == "popout-chat") {
		isPopoutChatRoom.value = true;
	} else {
		isPopoutChatRoom.value = false;
	}
});

//#region  Chat Scroll
const chatScroll = ref<QScrollArea | null>(null);
const scrollToBottom = (duration: number) => {
	const scrollHeight = chatScroll.value?.getScrollTarget().scrollHeight;
	chatScroll.value?.setScrollPosition(
		"vertical",
		scrollHeight ?? 0,
		duration
	);
};

const newMessageBtn = ref(false);
const btnScrollBottom = ref({
	label: "Chat bị dừng khi cuộn",
	icon: "pause",
});

const changeBtnScrollBottom = (e: any) => {
	if (e.type === "mouseenter") {
		btnScrollBottom.value.label = "Xem các tin nhắn mới";
		btnScrollBottom.value.icon = "arrow_downward";
	}
	if (e.type === "mouseleave") {
		btnScrollBottom.value.label = "Chat bị dừng khi cuộn";
		btnScrollBottom.value.icon = "pause";
	}
};

const chatScrollHandler = (info: any) => {
	if (
		info.verticalPercentage <= 0.93 &&
		info.verticalContainerSize < info.verticalSize &&
		Number((info.verticalContainerSize / info.verticalSize).toFixed(1)) != 1
	) {
		newMessageBtn.value = true;
	} else {
		newMessageBtn.value = false;
	}
};

//#endregion

//#region Chat Message
const userMessages = ref<ChatMessageProps[]>([]);

let maxChatMessages = 150;
let flagScroll = true;

watch(
	userMessages,
	() => {
		if (userMessages.value && userMessages.value.length > maxChatMessages) {
			userMessages.value.splice(
				0,
				userMessages.value.length - maxChatMessages
			);
		}
		nextTick(() => {
			if (chatScroll.value != null) {
				var scroll = chatScroll.value.getScroll();
				if (
					scroll.verticalContainerSize < scroll.verticalSize &&
					flagScroll
				) {
					scrollToBottom(0);
					flagScroll = false;
				}
				if (chatScroll.value.getScrollPercentage().top > 0.9) {
					scrollToBottom(0);
				}
			}
		});
	},
	{
		deep: true,
	}
);
//#endregion

/* Dữ liệu để test
// let count = 0;
// const sendMessage = (number: number) => {
// 	for (let index = 0; index < number; index++) {
// 		userMessages.value?.push({
// 			id: ++count,
// 			senderId: count.toString(),
// 			timestamp: "00:00",
// 			name: `gatay${count}`,
// 			avatar: `https://i.pravatar.cc/${100 + index * 2}`,
// 			message:
// 				"Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
// 		});
// 	}
// };


// onMounted(() => {
// 	nextTick(() => {
// 		nextTick(() => {
// 			var timesRun = 0;
// 			var interval = setInterval(function () {
// 				sendMessage(1);
// 				timesRun += 1;
// 				if (timesRun === 15) {
// 					clearInterval(interval);
// 				}
// 				//do whatever here..
// 			}, 100);
// 		});
// 	});
// });
*/

//#region Chat Timestamp
const showTimestamp = ref(false);
const toggleTimestamp = (value: boolean) => {
	showTimestamp.value = value;
};
//#endregion

//#region Chat Notify
const notifyMessage = ref("Welcome");
const showNotification = ref(false);
const disableNotification = ref(false);
const toggleNotification = (value: boolean) => {
	disableNotification.value = value;
};
const setTextAndShowNotification = (message: string) => {
	notifyMessage.value = message;
	showNotification.value = true;
};
//#endregion

//#region Chat Signalr
const {
	chatHubSignalR,
	ReceiveChatMessage,
	SendMessageToChatRoom,
	OnError,
	OnNotFound,
	JoinChatRoom,
	GetChannelInChatRoom,
	OnBlockedError,
	ChangeChatRoomSettingNotify,
	ChannelChatRoomActionNotify,
	ReceiveDonateNotify,
} = useChatHubSignalR();
chatRoomStore.chatHubSignalR = chatHubSignalR;

const leaveChatRoom = new BroadcastChannel("leaveChatRoom");
leaveChatRoom.onmessage = async (message) => {
	if (message.data === userProfileStore.myProfile.id) {
		await apiClient.chat
			.joinChatRoom(
				chatHubSignalR.connection.connectionId ?? "",
				chatRoomStore.chatRoom.id
			)
			.catch((error) => {
				console.log(error);
			});
	}

	leaveChatRoom.close();
};

onBeforeMount(async () => {
	//Api
	chatHubSignalR.connectionSuccess(async () => {
		if (chatHubSignalR.connection.connectionId) {
			await apiClient.chat
				.joinChatRoom(
					chatHubSignalR.connection.connectionId,
					chatRoomStore.chatRoom.id
				)
				.then(() => {
					// document.addEventListener("visibilitychange", () => {
					// 	if (document.visibilityState === "hidden") {
					// 	}
					// });
					window.addEventListener("beforeunload", function (event) {
						apiClient
							.config({ KEEP_ALIVE: true })
							.chat.leaveChatRoom(
								chatHubSignalR.connection.connectionId ?? "",
								chatRoomStore.chatRoom.id
							);
						const leaveChatRoom = new BroadcastChannel(
							"leaveChatRoom"
						);
						leaveChatRoom.postMessage(
							userProfileStore.myProfile.id
						);
						event.preventDefault();
					});
				});
		}
	});

	//SignalR
	// await chatHubSignalR.invoke(JoinChatRoom, chatRoom.id).catch(() => {});
});

chatHubSignalR.connection.onclose(async () => {
	await apiClient.chat
		.leaveChatRoom(
			chatHubSignalR.connection.connectionId ?? "",
			chatRoomStore.chatRoom.id
		)
		.catch((error) => {
			console.log(error);
		});
});

onBeforeUnmount(async () => {
	//Api

	await apiClient.chat
		.leaveChatRoom(
			chatHubSignalR.connection.connectionId ?? "",
			chatRoomStore.chatRoom.id
		)
		.then(async () => {
			await chatHubSignalR.connection.stop().catch((error) => {
				console.log(error);
			});
		})
		.catch((error) => {
			console.log(error);
		});
	//SignalR
	// await chatHubSignalR.invoke(LeaveChatRoom, chatRoom.id).catch(() => {});
});

const sendMessageError = ref("");
const sendMessageToChatRoom = async () => {
	await chatRoomStore
		.getChatRoomSetting()
		.then((data) => {})
		.catch((error) => {
			console.log(error);
		});
	const { oidcIsAuthenticated } = useOidcStore();
	if (oidcIsAuthenticated) {
		//Api
		if (chatHubSignalR.connection.connectionId) {
			await apiClient
				.config({
					HEADERS: {
						"X-ClientId": `ChatRoomId_${chatRoomStore.chatRoom.id}`,
					},
				})
				.chat.sendMessageToChatRoom(
					chatHubSignalR.connection.connectionId,
					{
						content: chatRoomStore.chatText,
						receivedChatRoomId: chatRoomStore.chatRoom.id ?? "",
					}
				)
				.then(() => {
					scrollToBottom(0);
					sendMessageError.value = "";
				})
				.catch((error: ApiError) => {
					console.log(error);
					if (error.status == 429) {
						sendMessageError.value = "Slow down cowboy!";
					}
					if (error.status == 403 && error.body.error) {
						sendMessageError.value =
							error.body.error.message ?? "Error send message!";
						// error.body.;
					}
				});
		}
		//SignalR
		// await chatHubSignalR
		// 	.invoke(SendMessageToChatRoom, {
		// 		content: chatRoomStore.chatText.value,
		// 		receivedChatRoomId: chatRoom.id,
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	} else {
		const { openLoginDialog } = useAccountStore();
		openLoginDialog();
	}
};

chatHubSignalR.on(ReceiveChatMessage, async (data) => {
	console.log(data);
	const content = data.content?.trim();
	if (content) {
		userMessages.value?.push({
			showTimestamp: false,
			blurMessage: false,
			chatMessage: {
				id: uid(),
				senderChannelId: data.senderChannelId ?? "",
				creationTime:
					date.formatDate(data.creationTime, "HH:mm") ?? "00:00",
				senderUserName: data.senderUserName ?? "no-name",
				avatar: channelStore.getAvatarUrlById(data.senderChannelId),
				content: content,
			},
		});

		const index = chatRoomStore.userChatted.findIndex(
			(x) => x.channelId === data.senderChannelId
		);

		if (index === -1 && data.senderChannelId) {
			chatRoomStore.userChatted.push({
				channelId: data.senderChannelId,
				ownerChannelUserName: data.senderUserName,
			});
		}

		const mentionUsers = [
			...new Set(
				content
					.match(/@\w+/g)
					?.map((mentionUser) => mentionUser.substring(1))
			),
		];
		if (
			data.senderUserName !== userProfileStore.myProfile.userName &&
			mentionUsers?.findIndex(
				(x) => x === userProfileStore.myProfile.userName
			) !== -1
		) {
			setTextAndShowNotification(
				`${data.senderUserName} has mentioned you in a message!`
			);
		}
	}
});

chatHubSignalR.on(OnError, (data) => {
	$q.notify({
		type: "negative",
		message: data ?? "SignalR error",
	});
});

chatHubSignalR.on(OnNotFound, (data) => {
	$q.notify({
		type: "negative",
		message: data ?? "SignalR not found",
	});
});

chatHubSignalR.on(GetChannelInChatRoom, (data) => {
	console.log(data);
});

chatHubSignalR.on(OnBlockedError, (data) => {
	$q.notify({
		type: "negative",
		message: `Your channel has been blocked for ${data} minus`,
	});
});

chatHubSignalR.on(ChangeChatRoomSettingNotify, (data) => {
	console.log("signalR: " + data);
	chatRoomStore.settings = data;
});

const toggleBlurMessage = (senderChannelId: string, blurMessage: boolean) => {
	userMessages.value.forEach((usersMessage, index) => {
		if (usersMessage.chatMessage.senderChannelId === senderChannelId) {
			userMessages.value[index].blurMessage = blurMessage;
		}
	});
};

chatHubSignalR.on(ChannelChatRoomActionNotify, async (data) => {
	console.log("signalR: " + data.ownerChannelUserName);
	switch (data.action) {
		case "Block":
			if (data.blockTime !== null && data.blockTime !== "NoBlock") {
				const banTime = chatRoomStore.banTimes.find(
					(banTime) => banTime.time === data.blockTime
				);
				setTextAndShowNotification(
					`${data.ownerChannelUserName} has been banned from messaging in the chat room for ${banTime?.label}!`
				);

				toggleBlurMessage(data.channelId ?? "", true);
			} else if (data.blockTime === "NoBlock") {
				setTextAndShowNotification(
					`${data.ownerChannelUserName} has been unbanned from messaging in the chat room!`
				);
				toggleBlurMessage(data.channelId ?? "", false);
			}
			break;
		case "SetRole":
			if (data.role !== null && data.role === "Moderator") {
				setTextAndShowNotification(
					`${data.ownerChannelUserName} has been set is moderator of chat room!`
				);
			} else {
				setTextAndShowNotification(
					`${data.ownerChannelUserName} has been unset as moderator from chat room!`
				);
			}
			break;
		case "Join":
			if (data.ownerChannelUserName) {
				setTextAndShowNotification(
					`${data.ownerChannelUserName} has join the chat room`
				);
			}
			break;
		case "Leave":
			if (data.channelId === userProfileStore.myProfile.id) {
				return;
			}
			break;
		default:
			break;
	}

	if (chatUserJoin.value) {
		const index = chatUserJoin.value.followers.findIndex(
			(follower) => follower.channelId === data.channelId
		);

		// not in array
		if (index === -1) {
			if (data.action === "Join") {
				chatUserJoin.value.followers.push(data);
			}
		} else {
			if (data.action === "Leave") {
				chatUserJoin.value.followers =
					chatUserJoin.value.followers.filter(
						(follower) => follower.channelId !== data.channelId
					);
			}
			if (data.action === "SetRole" || data.action === "Block")
				chatUserJoin.value.followers[index] = {
					...chatUserJoin.value.followers[index],
					...data,
				};
		}
	}
});
// #endregion

const openPopout = async () => {
	openURL(
		`${window.location.origin}/popout/chat/${route.params["channel"]}`,
		(e) => {
			console.log(e);
		},
		{
			noopener: true,
			menubar: true,
			toolbar: true,
			noreferrer: true,
			popup: true,
			innerWidth: 180,
		}
	);
};

onUnmounted(() => {
	chatRoomStore.$reset();
	channelStore.$reset();
});

const donateShow = ref(false);
const donate = ref<DonateDto>({});
let count = 0;
for (let index = 0; index < 9; index++) {
	// if (index % 2 === 0)
	// 	userMessages.value?.push({
	// 		isSystem: true,
	// 		showTimestamp: false,
	// 		chatMessage: {
	// 			id: uid(),
	// 			senderUserName: "System",
	// 			creationTime: "00:00",
	// 			content: `	<span>&nbsp;Item meme x10&nbsp;</span>
	// 						<img
	// 							style="font-size: 3rem"
	// 							class="q-icon"
	// 							src="https://cdn.quasar.dev/img/avatar.png"
	// 						/>
	// 					`,
	// 		},
	// 	});
	// const donate = {
	// 	giverChannelId: uid(),
	// 	creationTime: Date.now(),
	// 	giverChannel: {
	// 		ownerUserName: "Test",
	// 	},
	// };
	// userMessages.value?.push({
	// 	showTimestamp: false,
	// 	blurMessage: false,
	// 	chatMessage: {
	// 		id: uid(),
	// 		senderChannelId: donate.giverChannelId,
	// 		creationTime:
	// 			date.formatDate(donate.creationTime, "HH:mm") ?? "00:00",
	// 		senderUserName: donate.giverChannel?.ownerUserName ?? "no-name",
	// 		avatar: channelStore.getAvatarUrlById(donate.giverChannelId),
	// 		content: "",
	// 	},
	// });
}
chatHubSignalR.on(ReceiveDonateNotify, (data) => {
	donate.value = data;
	donateShow.value = true;
	switch (data.gift?.groups?.at(0)?.name) {
		case "Vip":
			setTimeout(() => {
				donateShow.value = false;
			}, 5000);
			break;

		default:
			setTimeout(() => {
				donateShow.value = false;
			}, 3000);
			break;
	}

	userMessages.value?.push({
		isSystem: true,
		showTimestamp: false,
		chatMessage: {
			id: uid(),
			senderChannelId: data.giverChannelId,
			creationTime:
				date.formatDate(data.creationTime, "HH:mm") ?? "00:00",
			senderUserName: data.giverChannel?.ownerUserName ?? "no-name",
			avatar: channelStore.getAvatarUrlById(data.giverChannelId),
			content: `<strong class="text-positive">&nbsp;x${data.gift?.quantity} ${data.gift?.name}&nbsp;</strong>
						<img
							style="font-size: 3rem"
							class="q-icon"
							src="${data.gift?.imageUrl}"
						/>`,
		},
	});
});

defineExpose({
	collapseChat,
});
</script>

<style lang="scss" scoped>
.chat {
	&-btn-collapse {
		top: 0.5rem;
		left: 0.5rem;
		&--show {
			left: -2.5rem;
		}
		&:hover {
			color: $positive;
		}
	}
	&-scroll-bottom {
		top: 95%;
		left: 50%;
		transform: translate(-50%, -95%);
	}
	&-container {
		:deep(.q-layout-container) {
			& > div > div,
			.q-layout {
				overflow: hidden;
				height: 100%;
			}
			.q-scrollarea {
				&__content {
					max-width: 100%;
				}
			}
		}
	}
}
</style>
