<template>
	<div
		style="min-height: 2rem"
		@mouseenter="showMention = true"
		@mouseleave="showMention = false"
		class="chat-message-container q-hoverable row items-baseline q-px-xs q-py-xs rounded-borders relative-position"
	>
		<span class="q-focus-helper"></span>
		<div class="col-auto">
			<span v-if="showTimestamp" class="q-mr-xs">
				{{ chatMessage.creationTime }}
			</span>
		</div>
		<div class="chat-message-avatar cursor-pointer col-auto">
			<ProfileAvatar
				@click="showPopupUserInfo = true"
				size="2rem"
				:src="chatMessage.avatar"
			/>

			<ChatUserInfo
				v-model="showPopupUserInfo"
				v-bind="{
					channelId: chatMessage.senderChannelId ?? '',
					avatar: chatMessage.avatar ?? '',
				}"
				no-parent-event
				:channelId="chatMessage.senderChannelId ?? ''"
			/>
		</div>

		<div class="chat-message-content q-ml-sm col">
			<div class="chat-message-user">
				<div
					class="chat-message-name cursor-pointer"
					@click="showPopupUserInfo = true"
				>
					<span
						class="text-subtitle2 text-bold q-mr-xs"
						:style="{ color: randomColor }"
					>
						{{ chatMessage.senderUserName }}
						<span>:</span>
					</span>
				</div>
			</div>

			<div
				:class="[
					'chat-message-text',
					{ 'chat-message-text--blur': blurMessage },
				]"
			>
				<slot name="default" v-once>
					<span
						v-html="
							$filters.mentionHighlight(chatMessage.content ?? '')
						"
					></span>
				</slot>
			</div>
		</div>
		<div v-if="showMention" class="chat-mention absolute-top-right">
			<q-card>
				<q-btn
					dense
					flat
					@click="emit('mention', chatMessage.senderUserName ?? '')"
				>
					<c-tooltip
						:offset="[5, 5]"
						arrow="bottom"
						anchor="top middle"
						self="bottom middle"
					>
						Nhắc đến
					</c-tooltip>

					<q-icon name="alternate_email" />
				</q-btn>
			</q-card>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { QPopupProxy } from "quasar";
import { ChatMessageDto } from "boot/openapi-client";
import { defineAsyncComponent, ref, computed, watch } from "vue";

export interface ChatMessageDtoExtend extends ChatMessageDto {
	id: string;
	avatar: string;
}
export interface Props {
	chatMessage: ChatMessageDtoExtend;
	showTimestamp: boolean;
	blurMessage: boolean;
}

const ProfileAvatar = defineAsyncComponent(
	() => import("components/ProfileAvatar.vue")
);
const ChatUserInfo = defineAsyncComponent(
	() => import("components/chat/ChatUserInfo.vue")
);
const CTooltip = defineAsyncComponent(
	() => import("components/CustomTooltip.vue")
);
const emit = defineEmits<{
	(e: "mention", value: string): void;
}>();

const props = withDefaults(defineProps<Props>(), {
	blurMessage: false,
});
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
		display: inline-block;
		&--blur {
			// color: transparent;
			// text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			filter: blur(0.17rem);
		}
	}
}
</style>
