<template>
	<q-card
		ref="chat"
		v-show="!collapseChat"
		flat
		square
		class="chat-container column full-height"
		:style="{ width: width }"
	>
		<div class="chat-header col-auto">
			<q-item class="fit">
				<q-item-section avatar></q-item-section>
				<q-item-section
					class="text-center vertical-middle text-uppercase text-weight-bold"
				>
					Trò chuyện
				</q-item-section>
				<q-item-section style="color: inherit" class="" side>
					<q-btn dense flat>
						<q-icon name="people" />
					</q-btn>
				</q-item-section>
			</q-item>
		</div>
		<q-separator />
		<div ref="chatBody" class="chat-body col fit">
			<q-scroll-area
				ref="chatScroll"
				:thumb-style="{ width: '5px' }"
				class="fit q-px-md fit"
				@scroll="chatScrollHandler"
			>
				<div
					class="chat-wrapper q-pt-md q-pb-sm column relative-position"
				>
					<span class="q-mb-sm text-center"
						>Chào mừng đến kênh chat</span
					>
					<!-- <q-intersection
	   
	    :root="chatBodyIntersection"
	  > -->
					<ChatMessage
						v-for="usersMessage in usersMessages"
						:key="usersMessage.id"
						:name="usersMessage.name"
						:avatar="usersMessage.avatar"
					>
						{{ usersMessage.id }} Lorem ipsum dolor sit amet loremor
						sit amet lorem
					</ChatMessage>

					<!-- :class="[`bg-green-${n}`]"
	    class="bg-green" -->

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
				<!-- <q-scroll-observer debounce="300" @scroll="chatScrollHandler" /> -->
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
					type=""
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
					</q-btn>
					<q-btn dense flat>
						<q-icon name="outbound" />
					</q-btn>
				</div>

				<div class="col-auto">
					<q-btn
						@click="sendMessage(1)"
						class="float-right"
						color="positive"
						label="Gửi"
					/>
				</div>
			</div>
		</div>
	</q-card>
	<q-card
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

<script>
import {
	defineAsyncComponent,
	defineComponent,
	ref,
	watchEffect,
	watch,
	onMounted,
	computed,
	nextTick,
	onUpdated,
} from "vue";

import ChatMessage from "components/chat/ChatMessage.vue";
import { Mentionable } from "vue-mention";

export default defineComponent({
	name: "ChatRoom",
	components: {
		Mentionable,
		ChatEmoji: defineAsyncComponent(() =>
			import("components/chat/ChatEmoji.vue")
		),
		ChatMessage,
	},
	props: {
		width: {
			type: String,
			default: "100%",
		},
	},

	setup() {
		const collapseChat = ref(false);
		const chat = ref(null);
		const collapseChatTrigger = () => {
			collapseChat.value = !collapseChat.value;
		};

		const chatScroll = ref(null);
		const scrollToBottom = (duration) => {
			changeBtnScrollBottom("click");
			const scrollArea = chatScroll.value;
			const scrollTarget = scrollArea.getScrollTarget();
			scrollArea.setScrollPosition(
				"vertical",
				scrollTarget.scrollHeight,
				duration
			);
		};

		const newMessageBtn = ref(false);
		const btnScrollBottom = ref({
			label: "Chat bị dừng khi cuộn",
			icon: "pause",
		});

		const changeBtnScrollBottom = (e) => {
			if (e.type === "mouseenter") {
				btnScrollBottom.value.label = "Xem các tin nhắn mới";
				btnScrollBottom.value.icon = "arrow_downward";
			}
			if (e.type === "mouseleave" || e === "click") {
				btnScrollBottom.value.label = "Chat bị dừng khi cuộn";
				btnScrollBottom.value.icon = "pause";
			}
		};
		const chatScrollHandler = (info) => {
			//   console.log("cuon: ", info.verticalPercentage);
			if (
				0.93 <= info.verticalPercentage < 1.0 &&
				info.verticalContainerSize <
					chatScroll.value.$el.querySelector(".chat-wrapper")
						.offsetHeight
			) {
				newMessageBtn.value = true;
				// btnScrollBottom.value.label = "Chat bị dừng khi cuộn";
				// btnScrollBottom.value.icon = "pause";

				// nextTick(() => {
				//   setTimeout(() => {
				//     btnScrollBottom.value.label = "Xem các tin nhắn mới";
				//     btnScrollBottom.value.icon = "arrow_downward";
				//   }, 1000);
				// });
			} else {
				newMessageBtn.value = false;
			}
		};

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
		const chatInput = ref(null);
		var currentTextSelect;
		const getCurrentTextSelect = (e) => {
			currentTextSelect =
				e.path[3].children[0].children[0].selectionStart;
			//   console.log("blur: ", currentTextSelect);
		};

		const chatBody = ref(null);
		const chatBodyIntersection = computed(() =>
			chatBody.value ? chatBody.value.$el : null
		);

		const usersMessages = ref([]);

		watchEffect(() => {});

		let maxChatMessages = 150;
		let flagScroll = true;
		watch(usersMessages.value, () => {
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
				// console.log("curren: ", chatScroll.value.getScrollPercentage().top);
				if (
					chatScroll.value.getScroll().verticalContainerSize <
						chatScroll.value.$el.querySelector(".chat-wrapper")
							.offsetHeight &&
					flagScroll
				) {
					scrollToBottom(0);
					flagScroll = false;
				}
				if (chatScroll.value.getScrollPercentage().top > 0.9)
					scrollToBottom(0);
			});
		});

		// Dữ liệu để test
		let count = 0;
		const sendMessage = (number) => {
			for (let index = 0; index < number; index++) {
				usersMessages.value.push({
					id: count++,
					name: `gatay${count}`,
					avatar: `https://i.pravatar.cc/${100 + index * 2}`,
				});
			}
		};

		const showEmojiPicker = ref(false);
		const onSelectEmoji = (emoji) => {
			// alert(`emoji ${emoji.i} selected, check console for details`);
			// input.value += emoji.i;
			if (currentTextSelect != undefined) {
				chatText.value = [
					chatText.value.slice(0, currentTextSelect),
					emoji.native,
					chatText.value.slice(currentTextSelect),
				].join("");
			} else {
				chatText.value += emoji.native;
			}
			//   console.log(chatText.value);
		};
		const showEmojiHandel = () => {
			showEmojiPicker.value = !showEmojiPicker.value;
			//   console.log(currentTextSelect);
		};

		sendMessage(0);
		onMounted(() => {
			nextTick(() => {
				nextTick(() => {
					//   scrollToBottom(0);
					setInterval(() => {
						sendMessage(1);
					}, 1000);
				});
			});
		});
		onUpdated(() => {
			scrollToBottom(0);
		});
		return {
			chatInput,
			chatText,
			chat,
			collapseChat,
			collapseChatTrigger,
			chatScroll,
			scrollToBottom,
			chatScrollHandler,
			changeBtnScrollBottom,
			btnScrollBottom,
			newMessageBtn,
			items,
			chatBody,
			chatBodyIntersection,
			usersMessages,
			sendMessage,
			showEmojiPicker,
			onSelectEmoji,
			showEmojiHandel,
			getCurrentTextSelect,
			logFunction() {
				console.log("log function");
			},
		};
	},
});
</script>

<style lang="scss">
.chat-container {
}
.chat {
	&-btn-collapse {
		top: 0.5rem;
		left: 0.5rem;
		&--show {
			left: -2.5rem;
		}
	}
}
.mention-item {
	margin: 0.3rem 0.5rem;
	padding: 0.5rem;
	border-radius: 4px;
}

.mention-selected {
	background: $positive;
}
</style>
