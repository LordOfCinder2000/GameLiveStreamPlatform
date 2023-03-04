<template>
	<q-input
		ref="inputRef"
		dense
		color="positive"
		outlined
		v-model="dateInput"
		mask="##/##/#### — ##/##/####"
		unmasked-value
		fill-mask="#"
		no-error-icon
		:rules="inputRules"
		hide-bottom-space
		hint="from: DD/MM/YYYY —> to: DD/MM/YYYY"
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
import { ref, watch, watchEffect } from "vue";
import { date as quasarDate, ValidationRule, QInput } from "quasar";
export interface Props {
	dateRange: {
		fromDate: Date;
		toDate: Date;
	};
}
const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "update:model-value", value: { from: Date; to: Date }): void;
}>();

const dateMask = "DDMMYYYY";
const initFromDate = () =>
	quasarDate.formatDate(props.dateRange.fromDate, dateMask);
const initToDate = () =>
	quasarDate.formatDate(props.dateRange.toDate, dateMask);
const date = ref({
	from: initFromDate(),
	to: initToDate(),
});

watchEffect(() => {
	date.value = {
		from: quasarDate.formatDate(props.dateRange.fromDate, dateMask),
		to: quasarDate.formatDate(props.dateRange.toDate, dateMask),
	};
});

watch(date, (value) => {
	if (value) {
		dateInput.value = date.value.from + date.value.to;
		emit("update:model-value", {
			from: quasarDate.extractDate(date.value.from, dateMask),
			to: quasarDate.extractDate(date.value.to, dateMask),
		});
	}
});

const dateInput = ref(date.value.from + date.value.to);
const convertData = (value: string) => {
	const halfLength = Math.ceil(value.length / 2);
	const fromDate = value.substring(0, halfLength);
	const toDate = value.substring(halfLength);

	return { fromDate, toDate };
};
watch(dateInput, (value) => {
	if (value) {
		const { fromDate, toDate } = convertData(value);
		date.value = { from: fromDate, to: toDate };
	}
});

const inputRef = ref<QInput | null>(null);
const inputRules = ref<ValidationRule[]>([
	(val) => {
		if (val) {
			const { fromDate, toDate } = convertData(val);
			const fromDateTime = quasarDate
				.extractDate(fromDate, dateMask)
				.getTime();
			const toDateTime = quasarDate
				.extractDate(toDate, dateMask)
				.getTime();
			if (fromDateTime >= toDateTime)
				return "From date greater than to date";

			if (fromDateTime > Date.now() || toDateTime > Date.now())
				return "Date greater than today";
		}

		return true;
	},
]);

// const refresh = () => {
// 	const toDate = new Date();
// 	date.value = {
// 		from: quasarDate.subtractFromDate(toDate, { year: 1 }).getTime(),
// 		to: toDate,
// 	};
// };
</script>

<style lang="scss" scoped></style>
