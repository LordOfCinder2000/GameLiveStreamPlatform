<template>
	<div class="flex flex-center">
		<div class="full-width q-pa-xs" v-if="chatRoomStore.getRateLimit">
			<div class="text-caption flex items-center">
				<q-icon
					class="q-pa-xs"
					color="positive"
					size="xs"
					name="privacy_tip"
				/>
				<span>
					Slow mode is active
					{{ chatRoomStore.getRateLimit.period }}
					per/message
				</span>
			</div>
		</div>
		<Mentionable
			class="fit"
			:keys="['@', '#']"
			:items="mentionItems"
			offset="6"
			insert-space
			@apply="onApply"
		>
			<q-input
				@keydown.enter.exact.prevent="
					emit('send-message', chatRoomStore.chatText)
				"
				ref="chatInput"
				placeholder="Send message"
				v-model="chatRoomStore.chatText"
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
				@update:model-value="updateModel"
				:error-message="errorMessage"
				:error="errorMessage.length > 0"
			>
				<template v-slot:append>
					<q-btn dense flat @click="showEmojiHandel">
						<q-icon name="add_reaction" />
					</q-btn>
					<ChatEmoji @onSelectEmoji="onSelectEmoji" />
				</template>
			</q-input>
			<template #no-result>
				<div class="q-pa-sm">
					<!-- <q-spinner-dots color="positive" size="2rem" v-if="true" /> -->
					<span>No result</span>
				</div>
			</template>
		</Mentionable>
	</div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, computed } from "vue";
import { useChatRoomStore } from "stores/components/chat-room-store";
import { QInput } from "quasar";
import { Mentionable } from "vue-mention";
export interface Props {
	errorMessage: string;
}

const ChatEmoji = defineAsyncComponent(
	() => import("components/chat/ChatEmoji.vue")
);
const emit = defineEmits<{
	(e: "send-message", value: string): void;
	(e: "update:model-value", value: string): void;
}>();

const props = withDefaults(defineProps<Props>(), {
	errorMessage: "",
});
const chatRoomStore = useChatRoomStore();
const chatInput = ref<QInput | null>(null);
let currentTextSelect = -1;
const getCurrentTextSelect = () => {
	currentTextSelect = (chatInput.value?.nativeEl as HTMLTextAreaElement)
		.selectionStart;
};
const updateModel = (value: unknown) => {
	emit("update:model-value", value as string);
};

//#region Chat emoji
const showEmojiPicker = ref(false);
const onSelectEmoji = (emoji: any) => {
	if (chatRoomStore.chatText.length <= 300) {
		if (currentTextSelect != -1) {
			chatRoomStore.chatText = [
				chatRoomStore.chatText.slice(0, currentTextSelect),
				emoji.native,
				chatRoomStore.chatText.slice(currentTextSelect),
			].join("");
		} else {
			chatRoomStore.chatText += emoji.native;
		}
	}
};
const showEmojiHandel = () => {
	showEmojiPicker.value = !showEmojiPicker.value;
};
//#endregion

//#region  Mention
// const mentionItems = computed(() =>
// 	chatRoomStore.userChatted.map((x) => ({
// 		value: x.ownerChannelUserName ?? "",
// 		label: x.ownerChannelUserName ?? "",
// 	}))
// );
let mentionItems = <any>[];
for (let i = 1; i <= 100; i++) {
	mentionItems.push({ label: "Item" + i, value: i });
}

const onApply = (item: any, key: string, replacedWith: any) => {
	console.log(item, `has been replaced with ${replacedWith}`);
};
//#endregion
</script>

<style scoped></style>
