<template>
	<q-input
		ref="inputRef"
		dense
		color="positive"
		outlined
		v-model="dateInput"
		mask="##/##/#### — ##/##/####"
		unmasked-value
		fill-mask="0"
		no-error-icon
		:rules="inputRules"
		hide-bottom-space
	>
		<template v-slot:prepend>
			<q-icon name="event" color="positive" class="cursor-pointer">
				<q-popup-proxy transition-show="scale" transition-hide="scale">
					<q-date
						v-model="date"
						:landscape="$q.screen.gt.xs"
						first-day-of-week="1"
						range
						today-btn
						no-unset
						years-in-month-view
						:mask="dateMask"
						color="positive "
						subtitle="Range date"
					>
						<div class="row items-center justify-end">
							<q-btn
								v-close-popup
								label="Close"
								color="primary"
								flat
							/>
						</div>
					</q-date>
				</q-popup-proxy>
			</q-icon>
		</template>
	</q-input>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { date as quasarDate, ValidationRule, QInput } from "quasar";

const dateMask = "DDMMYYYY";
const initFromDate = () =>
	quasarDate.formatDate(
		quasarDate.subtractFromDate(Date.now(), { year: 1 }),
		dateMask
	);
const initToDate = () => quasarDate.formatDate(Date.now(), dateMask);
const date = ref({
	from: initFromDate(),
	to: initToDate(),
});
watch(date, (value) => {
	console.log(value);
	dateInput.value = date.value.from + date.value.to;
});

const dateInput = ref(date.value.from + date.value.to);
const covertData = (value: string) => {
	const halfLength = Math.ceil(value.length / 2);
	const fromDate = value.substring(0, halfLength);
	const toDate = value.substring(halfLength);

	return { fromDate, toDate };
};
watch(dateInput, (value) => {
	console.log(value);
	const { fromDate, toDate } = covertData(value);
	date.value = { from: fromDate, to: toDate };
});

const inputRef = ref<QInput | null>(null);
const inputRules = ref<ValidationRule[]>([
	(val) => {
		const { fromDate, toDate } = covertData(val);
		if (fromDate >= toDate) return "From date greater than to date";
		if (fromDate > initToDate() || toDate > initToDate())
			return "Date greater than today";
		return true;
	},
]);
</script>

<style lang="scss" scoped></style>
