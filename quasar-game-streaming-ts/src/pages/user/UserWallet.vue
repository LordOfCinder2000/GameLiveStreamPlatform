<template>
	<div class="text-h6 q-mb-sm">My balance</div>
	<q-card flat square class="bg-list-active">
		<q-card-section class="q-pa-md row">
			<div class="col column flex-center">
				<div class="text-h4 text-positive text-bold">
					{{
						$filters.virtualCurrencyBalance(
							$i18n.locale,
							getCoin.quantity,
							1e10
						)
					}}
				</div>

				<div class="row flex-center">
					<q-icon size="32px" :name="`img:${getCoin.imageUrl}`" />
					<span class="text-bold text-h6 q-pa-sm">{{
						getCoin.name
					}}</span>
				</div>
			</div>
			<q-separator vertical class="col-shrink" size="0.5px" inset />
			<div class="col column flex-center" style="height: 100px">
				<div class="text-h4 text-positive text-bold">
					{{
						$filters.virtualCurrencyBalance(
							$i18n.locale,
							getMana.quantity,
							1e10
						)
					}}
				</div>

				<div class="row flex-center">
					<q-icon size="32px" :name="`img:${getMana.imageUrl}`" />
					<span class="text-bold text-h6 q-pa-sm">{{
						getMana.name
					}}</span>
				</div>
			</div>
		</q-card-section>
	</q-card>

	<div class="q-mt-lg row no-wrap q-pa-sm">
		<div class="row">
			<DateRangeInput
				@update:model-value="dateRangeInputUpdate"
				style="min-width: 250px"
				:dateRange="dateRange"
			/>
			<span class="q-ml-md ellipsis"
				>Displaying records from last 12 months only</span
			>
		</div>
		<q-space />
	</div>

	<div class="q-my-sm row items-center">
		<span class="text-h6">Records</span>
		<q-space />
		<q-btn
			class="q-mr-sm"
			round
			color="positive"
			outline
			icon="refresh"
			dense
			@click="refresh"
		>
			<my-tooltip arrow="bottom" anchor="top middle" self="bottom middle">
				Reset filter
			</my-tooltip>
		</q-btn>
	</div>
	<q-tabs
		v-model="tab"
		class="text-grey bg-list-active"
		active-color="positive"
		indicator-color="positive"
		align="left"
		narrow-indicator
	>
		<q-tab name="donate" label="Donates" no-caps />
		<q-tab name="payment" label="Payments" no-caps />
		<q-tab name="withdraw" label="Withdraws" no-caps />
	</q-tabs>
	<q-separator />
	<q-tab-panels v-model="tab" animated class="bg-list-active">
		<q-tab-panel name="donate">
			<Suspense>
				<DonateTable :filter="dateRangeFilter" />
				<template #fallback>
					<SkeletonTable />
				</template>
			</Suspense>
		</q-tab-panel>

		<q-tab-panel name="payment">
			<Suspense>
				<PaymentTable :filter="dateRangeFilter" />
				<template #fallback>
					<SkeletonTable />
				</template>
			</Suspense>
		</q-tab-panel>

		<q-tab-panel name="withdraw">
			<Suspense>
				<PaymentTable :filter="dateRangeFilter" />
				<template #fallback>
					<SkeletonTable />
				</template>
			</Suspense>
		</q-tab-panel>
	</q-tab-panels>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent, onBeforeMount } from "vue";
import { debounce, date } from "quasar";
import { storeToRefs } from "pinia";
import { useWalletStore } from "stores/wallet-store";
import DateRangeInput from "components/inputs/DateRangeInput.vue";

const PaymentTable = defineAsyncComponent(
	() => import("components/tables/PaymentTable.vue")
);

const DonateTable = defineAsyncComponent(
	() => import("components/tables/DonateTable.vue")
);

const SkeletonTable = defineAsyncComponent(
	() => import("components/tables/SkeletonTable.vue")
);

const walletStore = useWalletStore();
const { getCoin, getMana } = storeToRefs(walletStore);

const tab = ref("donate");
const initToDate = new Date();
const initFromDate = date.subtractFromDate(initToDate, { year: 1 });
const dateRange = ref<{
	fromDate: Date;
	toDate: Date;
}>({ fromDate: initFromDate, toDate: initToDate });

const dateRangeFilter = ref(dateRange.value);
const dateRangeInputUpdate = debounce((val: { from: Date; to: Date }) => {
	console.log(val);

	dateRangeFilter.value = {
		fromDate: val.from,
		toDate: date.addToDate(val.to, { day: 1 }),
	};
}, 1000);

const refresh = () => {
	const toDate = new Date();
	dateRange.value = {
		fromDate: date.subtractFromDate(toDate, { year: 1 }),
		toDate: toDate,
	};
};
</script>

<style lang="scss"></style>
