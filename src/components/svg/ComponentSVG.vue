<template>
	<component
		:is="componentIs.component"
		:width="width"
		:height="height"
		:color="color"
	></component>
</template>

<script setup>
import { ref, computed, shallowRef } from "vue";
import PauseSVG from "./PauseSVG.vue";
import PlaySVG from "./PlaySVG.vue";
const props = defineProps({
	name: String,
	width: {
		type: String,
		default: "24px",
	},
	height: {
		type: String,
		default: "24px",
	},
	color: {
		type: String,
		default: "#000000",
	},
});
const icons = shallowRef([
	{ name: "pause", component: PauseSVG },
	{ name: "play", component: PlaySVG },
]);
const componentIs = computed(() => {
	return icons.value.filter((icon) => icon.name == props.name)[0];
});
</script>

<style></style>
