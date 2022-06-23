<template>
	<div>{{ message }}</div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
	message: {
		type: String,
		default: "TESTCOMPONENT",
	},
});
</script>

<style></style>
