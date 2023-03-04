<template>
	<q-table
		ref="tableRef"
		title="Payments"
		:style="rows.length !== 0 ? { height: '400px' } : {}"
		class="sticky-virtualscroll-table"
		:dense="$q.screen.lt.sm"
		virtual-scroll
		:rows-per-page-options="[0]"
		:virtual-scroll-sticky-size-start="$q.screen.lt.sm ? 24 : 48"
		:rows="rows"
		:columns="columns"
		row-key="id"
		:loading="loading"
		binary-state-sort
		color="positive"
	>
		<template v-slot:header-cell-paymentMethod="props">
			<q-th auto-width :props="props">
				{{ props.col.label }}
			</q-th>
		</template>

		<template v-slot:body-cell-time="props">
			<q-td auto-width :props="props">
				<q-list>
					<q-item-section>
						<q-item-label>{{
							date.formatDate(props.value, "DD/MM/YYYY")
						}}</q-item-label>
						<q-item-label caption>{{
							date.formatDate(props.value, "HH:mm")
						}}</q-item-label>
					</q-item-section>
				</q-list>
			</q-td>
		</template>
		<template v-slot:body-cell-package="props">
			<q-td :props="props">
				<q-img
					no-spinner
					:src="props.value[0].imageUrl"
					:ratio="1"
					width="2rem"
				/>
				<span class="text-positive q-ml-xs">{{
					props.value[0].name + " x " + props.value[0].quantity
				}}</span>
			</q-td>
		</template>
		<template v-slot:body-cell-totalAmount="props">
			<q-td :props="props">
				<span class="text-bold">{{
					$filters.fiatFormat(
						$i18n.locale,
						props.row.currency,
						props.value
					)
				}}</span>
			</q-td>
		</template>
		<template v-slot:body-cell-value="props">
			<q-td :props="props">
				<span class="text-positive">{{
					`+ ${$filters.virtualCurrencyBalance(
						$i18n.locale,
						props.value
					)}`
				}}</span>
				<q-icon
					class="q-ml-xs"
					size="sm"
					:name="`img:${props.row.paymentItems[0].content.imageUrl}`"
				/>
			</q-td>
		</template>
		<template v-slot:body-cell-status="props">
			<q-td :props="props">
				<q-chip
					size="sm"
					:color="props.value.color"
					:text-color="props.value.textColor"
					:label="props.value.status"
				/>
			</q-td>
		</template>

		<template v-slot:no-data>
			<div class="fit flex flex-center">
				<NoData />
			</div>
		</template>

		<template v-slot:bottom>
			<div class="fit flex flex-center">
				<q-pagination
					v-model="pagination.page"
					color="positive"
					:max="pagesNumber"
					:max-pages="6"
					boundary-numbers
					@update:model-value="clickPage"
				/>
			</div>
		</template>
	</q-table>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { ItemSellableDto, PaymentDto } from "boot/openapi-client";
import { usePaymentStore } from "stores/payment-store";
import { useQuasar } from "quasar";
import { QTableColumn, date } from "quasar";
export interface Props {
	filter: {
		fromDate?: Date;
		toDate?: Date;
	};
}
const props = defineProps<Props>();
const $q = useQuasar();
const { getListPayment } = usePaymentStore();

const tableRef = ref(null);
const loading = ref(false);
const columns = <QTableColumn[]>[
	{
		name: "time",
		required: true,
		label: "Time",
		align: "left",
		field: (row) =>
			row.completionTime ?? row.canceledTime ?? row.creationTime,
		sortable: true,
	},
	{
		name: "paymentMethod",
		align: "center",
		label: "Payment method",
		field: (row) => row.paymentMethod,
		classes: "text-bold",
	},
	{
		name: "package",
		align: "left",
		label: "Package",
		field: (row) => row.paymentItems,
	},
	{
		name: "totalAmount",
		label: "Amount",
		align: "center",
		field: (row) => row.actualPaymentAmount,
	},
	{
		name: "value",
		label: "Value",
		align: "center",
		field: (row) =>
			row.paymentItems.reduce(
				(accumulator: number, currentValue: any) =>
					accumulator +
					currentValue.content.quantity * currentValue.quantity,
				0
			),
		sortable: true,
	},
	{
		name: "status",
		required: true,
		label: "Status",
		field: (row) => {
			if (row.completionTime)
				return {
					status: "Completed",
					color: "green",
					textColor: "white",
				};

			if (row.canceledTime)
				return {
					status: "Canceled",
					color: "red",
					textColor: "white",
				};

			return {
				status: "In-process",
				textColor: "black",
			};
		},
	},
];
const rows = ref<PaymentDto[]>([]);

const pagesNumber = computed(() =>
	Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
);

const pagination = ref({
	sortBy: "time",
	descending: false,
	page: 1,
	rowsPerPage: 5,
	rowsNumber: 0,
});

const clickPage = async (value: number) => {
	await fetchFromServer(
		(value - 1) * pagination.value.rowsPerPage,
		pagination.value.rowsPerPage
	);
};

const fetchFromServer = async (skipCount: number, maxResultCount: number) => {
	loading.value = true;
	await getListPayment(
		props.filter?.toDate?.toISOString(),
		props.filter?.fromDate?.toISOString(),
		"",
		skipCount,
		maxResultCount
	)
		.then((data) => {
			rows.value = data.items ?? [];
			pagination.value.rowsNumber = data.totalCount ?? 0;
		})
		.finally(() => {
			loading.value = false;
		});
};

watch(
	() => props.filter,
	async (val) => {
		if (val.fromDate && val.toDate) {
			await fetchFromServer(
				(pagination.value.page - 1) * pagination.value.rowsPerPage,
				pagination.value.rowsPerPage
			);
		}
	}
);

onMounted(async () => {
	await fetchFromServer(0, pagination.value.rowsPerPage);
});
</script>

<style lang="scss" scoped></style>
