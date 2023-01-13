<template>
	<transition
		v-if="!disable"
		appear
		enter-active-class="animated fadeInLeft"
		leave-active-class="animated fadeOutRight"
		class="chat-notification"
		v-show="showing"
	>
		<q-list>
			<q-item
				class="bg-positive text-white"
				clickable
				@click="handleHide"
			>
				<q-item-section>
					<slot></slot>
				</q-item-section>
			</q-item>
		</q-list>
	</transition>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import useModelToggle, {
	useModelToggleProps,
	useModelToggleEmits,
} from "composables/useModelToggle";
import useTimeout from "composables/useTimeout";

const props = defineProps({
	...useModelToggleProps,
});
const emit = defineEmits([...useModelToggleEmits]);
const { registerTimeout } = useTimeout();
const handleShow = (evt: Event) => {
	registerTimeout(() => {
		hide(evt);
		emit("hide", evt);
	}, 2000);
};
const handleHide = (evt: Event) => {
	emit("hide", evt);
};
const showing = ref(false);
const { hide } = useModelToggle({
	showing,
	handleShow: handleShow,
	handleHide: handleHide,
});
</script>

<style lang="scss" scoped>
.chat-notification {
	z-index: 1;
}
</style>
