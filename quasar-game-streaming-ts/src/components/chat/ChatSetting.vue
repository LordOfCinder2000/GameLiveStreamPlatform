<template>
	<q-menu transition-show="jump-down" transition-hide="jump-up">
		<q-list :style="{ 'max-width': width }" class="scroll" dense>
			<q-toolbar>
				<div><q-icon /></div>

				<q-toolbar-title class="text-center text-subtitle2">
					Chat room settings</q-toolbar-title
				>
				<q-btn flat round dense icon="close" v-close-popup />
			</q-toolbar>
			<q-separator />
			<q-item
				v-for="menuItem in menuItems"
				:key="menuItem.id"
				:clickable="menuItem.sideComponent == null"
				:v-ripple="menuItem.sideComponent == null"
				@click.prevent="menuItem.click"
			>
				<q-item-section avatar top>
					<q-avatar :icon="menuItem.icon" />
				</q-item-section>

				<q-item-section>
					<q-item-label lines="1">{{ menuItem.label }}</q-item-label>
				</q-item-section>

				<q-item-section side>
					<component :is="menuItem.sideComponent"></component>
				</q-item-section>
			</q-item>
		</q-list>
	</q-menu>
</template>

<script lang="ts" setup>
import { ref, h, computed, cloneVNode, watch } from "vue";
import { QToggle } from "quasar";

const emit = defineEmits<{
	(e: "hideChatBox"): void;
	(e: "toggleTimestamp", value: boolean): void;
	(e: "toggleNotification", value: boolean): void;
}>();

const props = defineProps({
	width: {
		type: Number,
		default: 380,
	},
});

const width = computed(() => {
	return props.width - 15 + "px";
});

const qToggle = h(QToggle, {
	color: "positive",
});

const onTimestamp = ref(false);
const qToggleTimestamp = () =>
	cloneVNode(qToggle, {
		modelValue: onTimestamp.value,
		"onUpdate:model-value": (value: boolean) => {
			onTimestamp.value = value;
		},
	});

const onNotifications = ref(true);
const qToggleNotifications = () =>
	cloneVNode(qToggle, {
		modelValue: onNotifications.value,
		"onUpdate:model-value": (value: boolean) => {
			onNotifications.value = value;
		},
	});

watch(onTimestamp, () => {
	emit("toggleTimestamp", onTimestamp.value);
});
watch(onNotifications, () => {
	emit("toggleNotification", onNotifications.value);
});
const menuItems = ref([
	{
		id: 1,
		icon: "comments_disabled",
		label: "Hide chat box",
		click: () => emit("hideChatBox"),
	},
	{
		id: 2,
		icon: "schedule",
		label: "Show timestamp",
		sideComponent: qToggleTimestamp,
	},
	{
		id: 3,
		icon: "notifications_active",
		label: "Disable chat room notifications",
		sideComponent: qToggleNotifications,
	},
]);
</script>

<style lang="scss"></style>
