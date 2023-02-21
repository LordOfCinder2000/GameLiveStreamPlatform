<template>
	<div class="text-h6 q-mb-sm">My balance</div>
	<q-card flat square class="bg-list-active">
		<q-card-section class="q-pa-sm row">
			<div class="col column flex-center" style="height: 100px">
				<div class="text-h4 text-positive text-bold">
					{{
						$filters.virtualCurrencyBalance(
							$i18n.locale,
							200000000,
							1e10
						)
					}}
				</div>

				<div class="row flex-center">
					<q-icon
						size="32px"
						name="img:https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
					/>
					<span class="text-bold text-h6 q-pa-sm">Coin</span>
				</div>
			</div>
			<q-separator vertical class="col-shrink" size="0.5px" inset />
			<div class="col column flex-center" style="height: 100px">
				<div class="text-h4 text-positive text-bold">
					{{
						$filters.virtualCurrencyBalance(
							$i18n.locale,
							200000000,
							1e10
						)
					}}
				</div>

				<div class="row flex-center">
					<q-icon
						size="32px"
						name="img:https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
					/>
					<span class="text-bold text-h6 q-pa-sm">Coin</span>
				</div>
			</div>
		</q-card-section>
	</q-card>
	<div class="q-mt-lg row items-center q-pr-xl">
		<DateRangeInput style="min-width: 250px" />
		<span class="col-auto justify-start q-ml-md"
			>Displaying records from last 12 months only</span
		>
	</div>

	<div class="text-h6 q-my-sm">Record</div>
	<q-tabs
		v-model="tab"
		class="text-grey"
		active-color="positive"
		indicator-color="positive"
		align="left"
		narrow-indicator
	>
		<q-tab name="mails" label="Mails" />
		<q-tab name="alarms" label="Alarms" />
		<q-tab name="movies" label="Movies" />
	</q-tabs>
	<q-separator />
	<q-tab-panels v-model="tab" animated>
		<q-tab-panel name="mails">
			<Suspense>
				<PaymentTable />
				<template #fallback>
					<SkeletonTable />
				</template>
			</Suspense>
		</q-tab-panel>

		<q-tab-panel name="alarms">
			<Suspense>
				<PaymentTable />
				<template #fallback>
					<SkeletonTable />
				</template>
			</Suspense>
		</q-tab-panel>

		<q-tab-panel name="movies">
			<Suspense>
				<PaymentTable />
				<template #fallback>
					<SkeletonTable />
				</template>
			</Suspense>
		</q-tab-panel>
	</q-tab-panels>
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from "vue";
import DateRangeInput from "components/inputs/DateRangeInput.vue";

const PaymentTable = defineAsyncComponent(
	() => import("components/tables/PaymentTable.vue")
);

const SkeletonTable = defineAsyncComponent(
	() => import("components/tables/SkeletonTable.vue")
);

const tab = ref("mails");
const tabPanels = ref();
</script>

<style lang="scss"></style>
