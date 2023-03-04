<template>
	<q-table
		ref="tableRef"
		title="Donates"
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
		:visible-columns="visibleColumns"
		color="positive"
	>
		<template v-slot:top-right>
			<slot name="option">
				<q-select
					color="positive"
					v-model="option"
					outlined
					dense
					options-dense
					:display-value="option"
					emit-value
					map-options
					:options="donateOptions"
					option-value="name"
					options-cover
					style="min-width: 150px"
				/>
			</slot>
		</template>

		<template v-slot:header-cell-user="props">
			<q-th auto-width :props="props">
				{{ isDonated ? "Giver" : "Receiver" }}
			</q-th>
		</template>

		<template v-slot:body-cell-time="props">
			<q-td auto-width :props="props">
				<q-list
					><q-item-section>
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
		<template v-slot:body-cell-user="props">
			<q-td auto-width :props="props">
				<router-link
					:to="{
						name: 'channel',
						params: { channel: props.value.ownerUserName },
					}"
					class="row no-wrap flex-center"
				>
					<ProfileAvatar
						class="q-mr-sm"
						size="md"
						:src="getAvatarUrlById(props.value.id)"
					/>

					<span class="text-bold text-positive">{{
						props.value.ownerUserName
					}}</span>
				</router-link>
			</q-td>
		</template>
		<template v-slot:body-cell-gift="props">
			<q-td :props="props">
				<q-icon
					class="q-mr-xs"
					size="lg"
					:name="`img:${props.value.imageUrl}`"
				>
				</q-icon>
				<span class="text-positive">{{
					props.value.name + " x " + props.row.quantity
				}}</span>
			</q-td>
		</template>
		<template v-slot:body-cell-value="props">
			<q-td :props="props">
				<span class="text-positive">{{
					`${isDonated ? "+" : "-"} ${$filters.virtualCurrencyBalance(
						$i18n.locale,
						props.value
					)}`
				}}</span>
				<q-icon
					class="q-ml-xs"
					size="sm"
					:name="`img:${props.row.gift.virtualPrice.imageUrl}`"
				/>
			</q-td>
		</template>
		<template v-slot:body-cell-actions="props">
			<slot name="actions" :props="props.value">
				<q-td :props="props" @click="giveBack(props.row)">
					<q-btn
						flat
						dense
						color="negative"
						icon="settings_backup_restore"
					>
						<q-tooltip> Give back </q-tooltip>
					</q-btn>
				</q-td>
			</slot>
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
import { ref, computed, onMounted, watch, isReactive } from "vue";
import { DonateDto, DonateActionType } from "boot/openapi-client";
import { useDonateStore } from "stores/donate-store";
import { useWalletStore } from "stores/wallet-store";
import { useChannelStore } from "stores/components/channel-store";
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
const { getAvatarUrlById } = useChannelStore();
const { getListDonate, giveBackDonate } = useDonateStore();

const tableRef = ref(null);
const loading = ref(false);
const donateOptions = ref(["Donated", "Donating"]);
const option = ref<DonateActionType>("Donated");
const isDonated = computed(() => option.value === "Donated");
watch(option, async () => {
	if (!isDonated.value) {
		const indexToRemove: number = visibleColumns.value.indexOf("actions");
		if (indexToRemove !== -1) {
			visibleColumns.value.splice(indexToRemove, 1);
		}
	} else if (!visibleColumns.value.includes("actions")) {
		visibleColumns.value.push("actions");
	}
	await fetchFromServer(0, pagination.value.rowsPerPage);
	pagination.value.page = 1;
});
const columns = <QTableColumn[]>[
	{
		name: "time",
		required: true,
		label: "Time",
		align: "left",
		field: (row) => row.creationTime,
		sortable: true,
	},
	{
		name: "user",
		align: "left",
		label: option.value,
		field: (row: DonateDto) =>
			isDonated.value ? row.giverChannel : row.recipientChannel,
	},
	{
		name: "gift",
		align: "left",
		label: "Gift",
		field: (row) => row.gift,
	},
	{
		name: "detail",
		label: "Detail",
		align: "left",
		field: (row) => row.detail,
		style: "max-width: 300px",
		classes: "ellipsis",
	},
	{
		name: "value",
		label: "Value",
		align: "center",
		field: (row) => row.quantity * row.gift.virtualPrice.amount,
	},
	{
		name: "actions",
		label: "Actions",
	},
];
const rows = ref<DonateDto[]>([]);
const pagesNumber = computed(() =>
	Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
);
const visibleColumns = ref(columns.map((column: QTableColumn) => column.name));

const pagination = ref({
	sortBy: "time",
	descending: false,
	page: 1,
	rowsPerPage: 5,
	rowsNumber: 0,
});

const clickPage = async (value: number) => {
	// rows.value = fetchFromServer(
	// 	(value - 1) * pagination.value.rowsPerPage,
	// 	pagination.value.rowsPerPage
	// );

	await fetchFromServer(
		(value - 1) * pagination.value.rowsPerPage,
		pagination.value.rowsPerPage
	);
};

const giveBack = (row: DonateDto) => {
	$q.dialog({
		html: true,
		title: "Confirm",
		message: `Would you like to give back gift for the giver <strong class="text-positive">${row.giverChannel?.ownerUserName}</strong>?`,
		persistent: true,
		cancel: {
			outline: true,
			color: "positive",
		},
		ok: {
			unelevated: true,
			color: "positive",
		},
	}).onOk(async () => {
		if (row.id)
			await giveBackDonate(row.id)
				.then(async () => {
					const { getWallet } = useWalletStore();
					$q.notify({
						type: "positive",
						message: "Give back completed successful!",
					});
					await getWallet();
				})
				.catch(() => {
					$q.notify({
						type: "negative",
						message: "Give back completed fail!",
					});
				});
	});
};

const fetchFromServer = async (skipCount: number, maxResultCount: number) => {
	loading.value = true;
	await getListDonate(
		option.value,
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

onMounted(async () => {
	// get initial data from server (1st page)
	// tableRef.value.requestServerInteraction();
	// rows.value = fetchFromServer(0, pagination.value.rowsPerPage);
	await fetchFromServer(0, pagination.value.rowsPerPage);
});

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
//#region Test data

// const originalRows = <DonateDto[]>[];
// for (let index = 0; index < 100; index++) {
// 	originalRows.push({
// 		id: `gift_${index}`,
// 		creationTime: new Date().toISOString(),
// 		giverChannelId: `giver_channel_${index}`,
// 		gift: {
// 			id: index,
// 			sku: `sku_${index}`,
// 			name: "name gift",
// 			imageUrl:
// 				"https://static.trovo.live/imgupload/shop/20200421_tyxzwfzebxbhelmet.png?imageView2/2/format/webp&max_age=31536000",
// 			virtualPrice: {
// 				imageUrl:
// 					"https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png",
// 				name: "Catoken",
// 				amount: 99,
// 			},
// 		},
// 		quantity: 99,
// 		detail: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
// 	});
// }

// function fetchFromServer(skipCount: number, maxResultCount: number) {
// 	const data = originalRows.slice();

// 	return data.slice(skipCount, skipCount + maxResultCount);
// }

// function getRowsNumberCount() {
// 	return originalRows.length;
// }
// const newPagination = (newPagination: {
// 	sortBy: string;
// 	descending: boolean;
// 	page: number;
// 	rowsPerPage: number;
// 	rowsNumber?: number;
// }) => {
// 	const { page, rowsPerPage, sortBy, descending, rowsNumber } = newPagination;
// 	const startRow = (page - 1) * rowsPerPage;
// 	rows.value = fetchFromServer(startRow, rowsPerPage);
// };
//#endregion
</script>

<style lang="scss" scoped></style>
