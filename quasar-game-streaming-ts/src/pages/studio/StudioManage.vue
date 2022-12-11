<template>
	<ModulePage :listTabs="listTabs" :tabTitle="'Studio manager'" />
</template>

<script setup lang="ts">
import { shallowRef, defineAsyncComponent } from "vue";
import ModulePage, { ListTabs } from "pages/ModulePage.vue";
// import { ListTabs } from "pages/models";

const StudioBroadcast = defineAsyncComponent(
	() => import("pages/studio/StudioBroadcast.vue")
);
const StudioSetting = defineAsyncComponent(
	() => import("pages/studio/StudioSetting.vue")
);
const StudioTool = defineAsyncComponent(
	() => import("pages/studio/StudioTool.vue")
);
const listTabs = shallowRef<ListTabs[]>([
	{
		id: 1,
		icon: "podcasts",
		name: "broadcast",
		componentName: StudioBroadcast,
		label: "Quản lý phát sóng",
	},
	{
		id: 2,
		icon: "settings",
		name: "setting",
		componentName: StudioSetting,
		label: "Cài đặt",
	},
	{
		id: 3,
		icon: "videocam",
		name: "tool",
		componentName: StudioTool,
		label: "Công cụ phát sóng",
	},
]);
</script>

<style lang="scss"></style>
