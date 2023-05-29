<template>
	<transition
		v-show="showNotification"
		appear
		enter-active-class="animated fadeInLeft"
		leave-active-class="animated fadeOutRight"
		class="chat-notification"
	>
		<q-list>
			<q-item
				class="bg-positive text-white"
				clickable
				@click="emit('close')"
			>
				<q-item-section>New tab</q-item-section>
			</q-item>
		</q-list>
	</transition>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
	showNotification: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["close"]);
</script>

<style lang="scss" scoped>
.chat-notification {
	z-index: 1;
}
</style>
