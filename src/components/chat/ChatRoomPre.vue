<template>
	<q-card
		ref="chat"
		v-show="!collapseChat"
		flat
		square
		:class="{ fullscreen: isPopoutChatRoom }"
		class="chat-container column full-height relative-position"
		:style="{ width: width }"
	>
		<div class="column fit">
			<div class="chat-header col-auto">
				<q-item class="fit">
					<q-item-section avatar></q-item-section>
					<q-item-section
						class="text-center vertical-middle text-uppercase text-weight-bold"
					>
						Trò chuyện
					</q-item-section>
					<q-item-section side style="color: inherit">
						<q-btn @click.prevent="" dense flat>
							<q-icon name="people" />
						</q-btn>
					</q-item-section>
				</q-item>
				<q-menu
					auto-close
					transition-show="slide-right"
					transition-hide="slide-right"
					fit
					square
					persistent
				>
					<q-list v-if="showNotification">
						<q-item
							class="bg-positive text-white"
							clickable
							v-close-popup
						>
							<q-item-section>New tab</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</div>
			<q-separator />
			<div ref="chatBody" class="chat-body col fit column flex-center">
				<div v-show="hideChatBox">
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
					class="fit q-px-md"
					@scroll="chatScrollHandler"
				>
					<div
						class="chat-wrapper q-pt-md q-pb-sm column relative-position"
					>
						<span class="q-mb-sm text-center">
							Chào mừng đến kênh chat
						</span>

						<ChatMessage
							ref="chatMessage"
							v-for="usersMessage in usersMessages"
							:key="usersMessage.id"
							:chatMessage="usersMessage"
							:showTimestamp="showTimestamp"
						>
							<!-- {{ usersMessage.message }} -->
						</ChatMessage>

						<q-btn
							v-if="newMessageBtn"
							color="positive"
							dense
							style="
								top: 95%;
								left: 50%;
								transform: translate(-50%, -95%);
							"
							class="fixed-center"
							:label="btnScrollBottom.label"
							@click="scrollToBottom(300)"
							no-caps
							:icon="btnScrollBottom.icon"
							padding="sm"
							@mouseenter="changeBtnScrollBottom"
							@mouseleave="changeBtnScrollBottom"
						/>
					</div>
				</q-scroll-area>
			</div>

			<q-separator />
			<div class="chat-footer col-auto q-pa-sm">
				<!-- Chat INPUT -->
				<Mentionable :keys="['@']" :items="items" offset="6">
					<q-input
						ref="chatInput"
						placeholder="Gửi tin nhắn"
						v-model="chatText"
						dense
						maxlength="301"
						standout
						input-style="max-height: 3rem"
						autogrow
						:rules="[
							(val) =>
								val.length <= 300 ||
								'Please use maximum 300 characters',
						]"
						hide-bottom-space
						class="relative-position"
						@blur="getCurrentTextSelect"
					>
						<template v-slot:append>
							<q-btn dense flat @click="showEmojiHandel">
								<q-icon name="add_reaction" />
							</q-btn>
							<ChatEmoji @onSelectEmoji="onSelectEmoji" />
							<!-- class="absolute-right"
							style="top: -20rem"
							v-if="showEmojiPicker"
							:native="true" -->
						</template>
					</q-input>
				</Mentionable>

				<div class="row q-mt-sm overflow-hidden">
					<div class="col q-gutter-sm">
						<q-btn dense flat>
							<q-icon name="settings" />
							<ChatSetting
								:width="380"
								@hideChatBox="hideChatBox = true"
								@toggleNotification="toggleNotification"
								@toggleTimestamp="toggleTimestamp"
							/>
						</q-btn>
						<q-btn @click="openPopout" dense flat>
							<q-icon name="outbound" />
						</q-btn>
					</div>

					<div class="col-auto">
						<q-btn
							@click="sendMessageToChatRoom"
							class="float-right"
							color="positive"
							label="Gửi"
						/>
					</div>
				</div>
			</div>
		</div>
	</q-card>
	<q-card
		v-if="!isPopoutChatRoom"
		class="transparent chat-btn-collapse absolute-top-left"
		:class="[{ 'chat-btn-collapse--show': collapseChat }]"
		flat
		square
	>
		<q-btn @click="collapseChatTrigger" dense flat>
			<q-icon
				name="mdi-arrow-expand-right"
				:class="[{ 'rotate-180': collapseChat }]"
			/>
		</q-btn>
	</q-card>
</template>
<script lang="ts" setup>
import {
	ref,
	watch,
	nextTick,
	onBeforeMount,
	onUnmounted,
	onBeforeUnmount,
	inject,
	defineAsyncComponent,
	onMounted,
} from "vue";
import { QScrollArea, QInput, openURL, useQuasar } from "quasar";

import { Mentionable } from "vue-mention";
import { useRouter, useRoute } from "vue-router";
// import ChatMessage from "components/chat/ChatMessage.vue";
// import ChatEmoji from "components/chat/ChatEmoji.vue";
// import ChatSetting from "components/chat/ChatSetting.vue";
import { useChatHubSignalR } from "boot/signalr";
import { apiClient, apiClientRequireAuth } from "boot/openapi-client";
import { useChatRoomStore } from "stores/components/chat-room-store";
import { useUserStore } from "stores/components/user-store";
import { useOidcStore } from "stores/modules/oidc-store";
import { useAccountStore } from "stores/components/account-store";
import { ChatMessage } from "components/chat/ChatMessage.vue";
//#region
// export interface ChatMessage {
// 	id: string | number;
// 	timestamp: string;
// 	name: string;
// 	avatar: string;
// 	message: string;
// }

const ChatMessage = defineAsyncComponent(
	() => import("components/chat/ChatMessage.vue")
);
const ChatEmoji = defineAsyncComponent(
	() => import("components/chat/ChatEmoji.vue")
);
const ChatSetting = defineAsyncComponent(
	() => import("components/chat/ChatSetting.vue")
);
const ChatUserJoin = defineAsyncComponent(
	() => import("components/chat/ChatUserJoin.vue")
);
const props = defineProps({
	width: {
		type: String,
	},
	channelId: {
		type: String,
		default: null,
	},
});

const $q = useQuasar();

const chat = ref(null);
const hideChatBox = ref(false);
const chatBody = ref(null);
const isPopoutChatRoom = ref(false);
const collapseChat = ref(false);
const collapseChatTrigger = () => {
	collapseChat.value = !collapseChat.value;
};

//Router control
const route = useRoute();

const channelId = ref<string | null>(null);
const { chatRoom } = useChatRoomStore();
onBeforeMount(() => {
	if (route.name == "popout-chat-pre") {
		isPopoutChatRoom.value = true;
	} else {
		isPopoutChatRoom.value = false;
	}
});
// onBeforeMount(async () => {
// 	if (route.params["channel"]) {
// 		await apiClient.userLookup
// 			.findByUserName(route.params["channel"] as string)
// 			.then((succ) => {
// 				if (succ.id) {
// 					channelId.value = succ.id;
// 				}
// 			})
// 			.catch((err) => {});
// 	} else if (props.channelId) {
// 		channelId.value = props.channelId;
// 	}

// 	if (!channelId.value) {
// 		await router.push({ name: "error-404" });
// 	}
// });

// Chat scroll
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

// Mention
const items = ref([
	{
		value: "cat",
		label: "Mr Cat",
	},
	{
		value: "dog",
		label: "Mr Dog",
	},
]);

const chatText = ref("");
const chatInput = ref<QInput | null>(null);
let currentTextSelect = -1;
const getCurrentTextSelect = () => {
	currentTextSelect = (chatInput.value?.nativeEl as HTMLTextAreaElement)
		.selectionStart;
};

// Chat Messages
const usersMessages = ref<ChatMessage[] | null>([]);

let maxChatMessages = 150;
let flagScroll = true;

watch(
	usersMessages,
	() => {
		if (
			usersMessages.value &&
			usersMessages.value.length > maxChatMessages
		) {
			usersMessages.value.splice(
				0,
				usersMessages.value.length - maxChatMessages
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

// Dữ liệu để test
let count = 0;
const sendMessage = (number: number) => {
	for (let index = 0; index < number; index++) {
		usersMessages.value?.push({
			id: count++,
			timestamp: "00:00",
			name: `gatay${count}`,
			avatar: `https://i.pravatar.cc/${100 + index * 2}`,
			message:
				"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere enim recusandae voluptatibus illum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere enim recusandae voluptatibus illum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere enim recusandae voluptatibus illum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere enim recusandae voluptatibus illum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere enim recusandae voluptatibus illum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere enim recusandae voluptatibus illum.",
		});
	}
};

// Chat emoji
const showEmojiPicker = ref(false);
const onSelectEmoji = (emoji: any) => {
	if (currentTextSelect != -1) {
		chatText.value = [
			chatText.value.slice(0, currentTextSelect),
			emoji.native,
			chatText.value.slice(currentTextSelect),
		].join("");
	} else {
		chatText.value += emoji.native;
	}
};
const showEmojiHandel = () => {
	showEmojiPicker.value = !showEmojiPicker.value;
};

onMounted(() => {
	nextTick(() => {
		nextTick(() => {
			var timesRun = 0;
			var interval = setInterval(function () {
				sendMessage(1);
				timesRun += 1;
				if (timesRun === 15) {
					clearInterval(interval);
				}
				//do whatever here..
			}, 100);
		});
	});
});

const chatMessage = ref<InstanceType<typeof ChatMessage> | null>();
const showTimestamp = ref(false);
const toggleTimestamp = (value: boolean) => {
	showTimestamp.value = value;
};

const showNotification = ref(true);
const toggleNotification = (value: boolean) => {
	showNotification.value = value;
};
//#endregion

// Signalr
const {
	chatHubSignalR,
	ReceiveChatMessage,
	SendMessageToChatRoom,
	OnError,
	OnNotFound,
	JoinChatRoom,
	GetChannelInChatRoom,
	LeaveChatRoom,
} = useChatHubSignalR();

const { findUserById } = useUserStore();

onBeforeMount(async () => {
	//Api
	chatHubSignalR.connectionSuccess(async () => {
		await apiClient.chat
			.joinChatRoom(
				chatHubSignalR.connection.connectionId ?? "",
				chatRoom.id
			)
			.catch((error) => {
				console.log(error);
			});
	});

	//SignalR
	// await chatHubSignalR.invoke(JoinChatRoom, chatRoom.id).catch(() => {});
});

onBeforeUnmount(async () => {
	//Api
	chatHubSignalR.connectionSuccess(async () => {
		await apiClient.chat
			.leaveChatRoom(
				chatHubSignalR.connection.connectionId ?? "",
				chatRoom.id
			)
			.catch((error) => {
				console.log(error);
			});
	});

	//SignalR
	// await chatHubSignalR.invoke(LeaveChatRoom, chatRoom.id).catch(() => {});
});

const sendMessageToChatRoom = async () => {
	const { oidcIsAuthenticated } = useOidcStore();
	if (oidcIsAuthenticated) {
		//Api
		await apiClientRequireAuth.chat
			.sendMessageToChatRoom({
				content: chatText.value,
				receivedChatRoomId: chatRoom.id,
			})
			.catch((error) => {
				console.log(error);
			});

		//SignalR
		// await chatHubSignalR
		// 	.invoke(SendMessageToChatRoom, {
		// 		content: chatText.value,
		// 		receivedChatRoomId: chatRoom.id,
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	} else {
		// const bus = inject("bus") as EventBus;
		// bus.emit("some-event", "arg1 value", "arg2 value", "arg3 value");

		const { openLoginPopup } = useAccountStore();
		openLoginPopup();
	}
};

chatHubSignalR.on(ReceiveChatMessage, async (data) => {
	console.log(data);
	const content = data.content?.trim();

	if (content) {
		const userSendMessage = await findUserById(data.senderChannelId ?? "");
		usersMessages.value?.push({
			id: count++,
			timestamp: "00:00",
			name: userSendMessage.userName ?? "",
			avatar: `${process.env.API_URL}/api/account/${data.senderChannelId}/profile-picture`,
			message: content,
		});
	}
});

chatHubSignalR.on(OnError, (data) => {
	$q.notify({
		color: "negative",
		message: data ?? "SignalR error",
	});
});

chatHubSignalR.on(OnNotFound, (data) => {
	$q.notify({
		color: "negative",
		message: data ?? "SignalR not found",
	});
});

chatHubSignalR.on(GetChannelInChatRoom, (data) => {
	console.log(data);
});

///////////////

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
}
</style>
