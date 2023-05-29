<template>
	<UserDialog
		ref="dialog"
		class="about-wrapper"
		title="Edit about me"
		@cancel="text = ''"
		@save="text = ''"
	>
		<q-input
			ref="input"
			square
			autogrow
			v-model="text"
			placeholder="Tell more about you."
			color="positive"
			style="width: 30vw"
			filled
			maxlength="2000"
			clearable
			autofocus
			counter
			input-class="aboutInput"
			class="q-mb-xs"
		>
		</q-input>
	</UserDialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserDialog from "./UserDialog.vue";
const text = ref("");
const input = ref(null);
const dialog = ref(null);

defineExpose({ dialog });
</script>
<style lang="scss">
.aboutInput {
	height: 300px !important;
}
</style>
