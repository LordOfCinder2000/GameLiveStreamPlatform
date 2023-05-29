<template>
	<div
		style="min-height: 2rem"
		@mouseenter="showMention = true"
		@mouseleave="showMention = false"
		class="chat-message-container row items-baseline q-px-xs q-py-xs rounded-borders cursor-pointer q-hoverable relative-position"
	>
		<!-- <span class="q-focus-helper"></span> -->
		<div class="col-auto">
			<span v-if="showTimestamp" class="q-mr-xs">
				{{ chatMessage.timestamp }}
			</span>
		</div>
		<div class="chat-message-avatar col-auto">
			<q-avatar @click="showPopupUserInfo = true" size="2rem">
				<q-img
					spinner-size="1rem"
					spinner-color="positive"
					initial-ratio="1"
					:src="chatMessage.avatar"
					placeholder-src="https://astatic.trovocdn.net/cat/img/e8ec087.webp"
				>
					<template v-slot:error>
						<q-img src="~assets/images/default-avatar.webp" />
					</template>
				</q-img>
			</q-avatar>

			<q-popup-proxy v-model="showPopupUserInfo" no-parent-event>
				<ChatUserInfo
					:name="chatMessage.name"
					:avatar="chatMessage.avatar"
				/>
			</q-popup-proxy>
		</div>

		<div class="chat-message-content q-ml-sm col">
			<div class="chat-message-user">
				<div
					class="chat-message-name q-hoverable"
					@click="showPopupUserInfo = true"
				>
					<span class="q-focus-helper"></span>
					<span
						class="text-subtitle2 text-bold"
						:style="{ color: randomColor }"
						>{{ chatMessage.name }}
						<span>:</span>
					</span>
				</div>
			</div>

			<span class="chat-message-text q-ml-xs">
				<slot name="default"> {{ chatMessage.message }}</slot>
			</span>
		</div>
		<div v-if="showMention" class="chat-mention absolute-top-right">
			<q-card class="my-card">
				<q-btn dense flat>
					<c-tooltip
						:offset="[5, 5]"
						arrow="bottom"
						anchor="top middle"
						self="bottom middle"
					>
						Nhắc đến</c-tooltip
					>

					<q-icon name="alternate_email" />
				</q-btn>
			</q-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { QPopupProxy } from "quasar";
import { defineAsyncComponent, ref, computed } from "vue";
export interface ChatMessage {
	id: string | number;
	timestamp: string;
	name: string;
	avatar: string;
	message: string;
}

export interface Props {
	chatMessage: ChatMessage;
	showTimestamp: boolean;
}
const ChatUserInfo = defineAsyncComponent(
	() => import("components/chat/ChatUserInfo.vue")
);
const CTooltip = defineAsyncComponent(
	() => import("components/CustomTooltip.vue")
);

const props = defineProps<Props>();
const showMention = ref(false);
const showPopupUserInfo = ref(false);

const randomColor = computed(() => {
	// return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
});
</script>

<style lang="scss" scoped>
.chat-message {
	&-container {
		.chat-mention {
			position: absolute;
			top: -1.5rem;
			right: 0.5rem;
		}
	}
	&-content {
		// overflow-wrap: anywhere;
		overflow-wrap: break-word;
	}
	&-user {
		display: inline-block;
	}
	&-text {
		line-height: 150%;
	}
}
</style>
