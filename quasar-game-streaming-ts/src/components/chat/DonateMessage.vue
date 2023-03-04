<template>
	<div
		style="min-height: 2rem"
		class="chat-message-container q-hoverable row items-baseline q-px-xs q-py-xs rounded-borders relative-position"
	>
		<span class="q-focus-helper"></span>
		<div class="col-auto">
			<span v-if="showTimestamp" class="q-mr-xs">
				{{ donate.creationTime }}
			</span>
		</div>

		<div class="chat-message-content q-ml-sm col">
			<div class="chat-message-user">
				<div class="chat-message-name cursor-pointer">
					<span class="text-subtitle2 text-bold q-mr-xs">
						System
						<span>:</span>
					</span>
				</div>
			</div>

			<div class="chat-message-text">
				<slot name="default" v-once>
					<span
						v-html="$filters.mentionHighlight(donateMessage)"
					></span>
				</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { DonateDto } from "boot/openapi-client";
import { ref, computed } from "vue";

export interface Props {
	donate: DonateDto;
	showTimestamp: boolean;
}

const props = defineProps<Props>();

const donateMessage = computed(() => "");
</script>

<style lang="scss" scoped>
.chat-message {
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
	}
}
</style>
