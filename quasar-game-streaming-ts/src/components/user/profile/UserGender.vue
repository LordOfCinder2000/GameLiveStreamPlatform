<template>
	<q-btn
		style="min-width: 5rem"
		v-for="genderBtn in genderBtns"
		:key="genderBtn.value"
		:color="gender === genderBtn.value ? 'positive' : ''"
		:unelevated="gender === genderBtn.value"
		:outline="gender !== genderBtn.value"
		stack
		:icon="genderBtn.icon"
		:label="genderBtn.label"
		no-caps
		@click="gender = genderBtn.value"
		ref="profileGender"
	/>
</template>

<script setup>
import { ref } from "vue";
const profileGender = ref(null);
const gender = ref("");
const genderBtns = ref([
	{
		value: "male",
		label: "Male",
		icon: "male",
	},
	{
		value: "female",
		label: "Female",
		icon: "female",
	},
	{
		value: "other",
		label: "Other",
		icon: "transgender",
	},
]);

defineExpose({
	profileGender,
	gender,
});
</script>

<style></style>
