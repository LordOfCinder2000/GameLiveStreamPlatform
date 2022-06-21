<template>
	<UserDialog
		ref="dialog"
		title="Edit birthday"
		@cancel="birthDay = ''"
		@save="birthDay = ''"
	>
		<q-date
			ref="datepicker"
			:landscape="$q.screen.gt.xs"
			:mask="mask"
			first-day-of-week="1"
			today-btn
			v-model="birthDay"
			color="positive "
			square
			flat
			style="width: 30vw"
			:options="options"
			subtitle="Birthday"
			:title="birthDay"
			class="q-my-xs"
		>
			<q-card-actions align="between" class="no-wrap">
				<q-btn
					outline
					dense
					label="Clear"
					color="primary"
					no-caps
					@click="birthDay = ''"
				/>
				<q-btn
					outline
					dense
					label="Today"
					color="positive"
					no-caps
					@click="$refs.datepicker.setToday()"
				/>
			</q-card-actions>
		</q-date>
	</UserDialog>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";
import UserDialog from "./UserDialog.vue";
const mask = ref("DD-MMMM-YYYY");
const birthDay = ref("");

const now = date.formatDate(Date.now(), mask.value);
const options = (data) => {
	data = date.formatDate(data, mask.value);
	return data <= now;
};
const dialog = ref(null);
defineExpose({ dialog });
</script>

<style></style>
