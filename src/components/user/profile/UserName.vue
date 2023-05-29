<template>
	<q-input
		filled
		dense
		hide-bottom-space
		maxlength="200"
		color="positive"
		v-model="model"
		hint="Min 5 and Max 50 characters"
		lazy-rules
		:rules="inputRules"
		ref="profileInput"
	/>
</template>

<script setup>
import { ref, computed } from "vue";
const profileInput = ref(null);
const model = ref("");
const inputRules = [
	(val) => (val && val.length > 0) || "Please type something",
	(val) => (val && val.length <= 50) || "Please use max 50 characters",
	(val) => (val && val.length >= 5) || "Please use min 5 characters",
];
defineExpose({
	model,
	profileInput,
});
</script>

<style lang="scss"></style>
