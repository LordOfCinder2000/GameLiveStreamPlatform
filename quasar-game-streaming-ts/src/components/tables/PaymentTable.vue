<template>
	<q-table
		ref="tableRef"
		title="Test"
		:style="rows.length !== 0 ? { height: '400px' } : {}"
		class="sticky-virtscroll-table"
		:dense="$q.screen.lt.sm"
		virtual-scroll
		:rows-per-page-options="[0]"
		:virtual-scroll-sticky-size-start="$q.screen.lt.sm ? 24 : 48"
		:rows="rows"
		:columns="columns"
		row-key="id"
		:loading="loading"
		:filter="filter"
		binary-state-sort
		@update:pagination="newPagination"
	>
		<template v-slot:top-right>
			<slot name="option">
				<q-select
					v-model="option"
					multiple
					outlined
					dense
					options-dense
					:display-value="$q.lang.table.columns"
					emit-value
					map-options
					:options="columns"
					option-value="name"
					options-cover
					style="min-width: 150px"
				/>
			</slot>
		</template>

		<template v-slot:no-data>
			<div class="fit flex flex-center">
				<NoData /><span>No data</span>
			</div>
		</template>
		<template v-slot:bottom>
			<div class="flex flex-center fit">
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

<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import NoData from "components/NoData.vue";
// import { QTableColumn } from "quasar";

const columns = [
	{
		name: "desc",
		required: true,
		label: "Dessert (100g serving)",
		align: "left",
		field: (row) => row.name,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "calories",
		align: "center",
		label: "Calories",
		field: "calories",
		sortable: true,
	},
	{ name: "fat", label: "Fat (g)", field: "fat", sortable: true },
	{ name: "carbs", label: "Carbs (g)", field: "carbs", sortable: true },
	{ name: "protein", label: "Protein (g)", field: "protein", sortable: true },
	{ name: "sodium", label: "Sodium (mg)", field: "sodium", sortable: true },
	{
		name: "calcium",
		label: "Calcium (%)",
		field: "calcium",
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: "iron",
		label: "Iron (%)",
		field: "iron",
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
];
const tableRef = ref();
const rows = ref([]);

const pagination = ref({
	sortBy: "desc",
	descending: false,
	page: 1,
	rowsPerPage: 40,
	// rowsNumber: 40,
});

const filter = ref("");
const loading = ref(false);
// we generate lots of originalrows here
const originalRows = [
	{
		id: 1,
		name: "Frozen Yogurt",
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0,
		sodium: 87,
		calcium: "14%",
		iron: "1%",
	},
	{
		id: 2,
		name: "Ice cream sandwich",
		calories: 237,
		fat: 9.0,
		carbs: 37,
		protein: 4.3,
		sodium: 129,
		calcium: "8%",
		iron: "1%",
	},
	{
		id: 3,
		name: "Eclair",
		calories: 262,
		fat: 16.0,
		carbs: 23,
		protein: 6.0,
		sodium: 337,
		calcium: "6%",
		iron: "7%",
	},
	{
		id: 4,
		name: "Cupcake",
		calories: 305,
		fat: 3.7,
		carbs: 67,
		protein: 4.3,
		sodium: 413,
		calcium: "3%",
		iron: "8%",
	},
	{
		id: 5,
		name: "Gingerbread",
		calories: 356,
		fat: 16.0,
		carbs: 49,
		protein: 3.9,
		sodium: 327,
		calcium: "7%",
		iron: "16%",
	},
	{
		id: 6,
		name: "Jelly bean",
		calories: 375,
		fat: 0.0,
		carbs: 94,
		protein: 0.0,
		sodium: 50,
		calcium: "0%",
		iron: "0%",
	},
	{
		id: 7,
		name: "Lollipop",
		calories: 392,
		fat: 0.2,
		carbs: 98,
		protein: 0,
		sodium: 38,
		calcium: "0%",
		iron: "2%",
	},
	{
		id: 8,
		name: "Honeycomb",
		calories: 408,
		fat: 3.2,
		carbs: 87,
		protein: 6.5,
		sodium: 562,
		calcium: "0%",
		iron: "45%",
	},
	{
		id: 9,
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		sodium: 326,
		calcium: "2%",
		iron: "22%",
	},
	{
		id: 10,
		name: "KitKat",
		calories: 518,
		fat: 26.0,
		carbs: 65,
		protein: 7,
		sodium: 54,
		calcium: "12%",
		iron: "6%",
	},
	{
		id: 11,
		name: "Frozen Yogurt-1",
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0,
		sodium: 87,
		calcium: "14%",
		iron: "1%",
	},
	{
		id: 12,
		name: "Ice cream sandwich-1",
		calories: 237,
		fat: 9.0,
		carbs: 37,
		protein: 4.3,
		sodium: 129,
		calcium: "8%",
		iron: "1%",
	},
	{
		id: 13,
		name: "Eclair-1",
		calories: 262,
		fat: 16.0,
		carbs: 23,
		protein: 6.0,
		sodium: 337,
		calcium: "6%",
		iron: "7%",
	},
	{
		id: 14,
		name: "Cupcake-1",
		calories: 305,
		fat: 3.7,
		carbs: 67,
		protein: 4.3,
		sodium: 413,
		calcium: "3%",
		iron: "8%",
	},
	{
		id: 15,
		name: "Gingerbread-1",
		calories: 356,
		fat: 16.0,
		carbs: 49,
		protein: 3.9,
		sodium: 327,
		calcium: "7%",
		iron: "16%",
	},
	{
		id: 16,
		name: "Jelly bean-1",
		calories: 375,
		fat: 0.0,
		carbs: 94,
		protein: 0.0,
		sodium: 50,
		calcium: "0%",
		iron: "0%",
	},
	{
		id: 17,
		name: "Lollipop-1",
		calories: 392,
		fat: 0.2,
		carbs: 98,
		protein: 0,
		sodium: 38,
		calcium: "0%",
		iron: "2%",
	},
	{
		id: 18,
		name: "Honeycomb-1",
		calories: 408,
		fat: 3.2,
		carbs: 87,
		protein: 6.5,
		sodium: 562,
		calcium: "0%",
		iron: "45%",
	},
	{
		id: 19,
		name: "Donut-1",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		sodium: 326,
		calcium: "2%",
		iron: "22%",
	},
	{
		id: 20,
		name: "KitKat-1",
		calories: 518,
		fat: 26.0,
		carbs: 65,
		protein: 7,
		sodium: 54,
		calcium: "12%",
		iron: "6%",
	},
	{
		id: 21,
		name: "Frozen Yogurt-2",
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0,
		sodium: 87,
		calcium: "14%",
		iron: "1%",
	},
	{
		id: 22,
		name: "Ice cream sandwich-2",
		calories: 237,
		fat: 9.0,
		carbs: 37,
		protein: 4.3,
		sodium: 129,
		calcium: "8%",
		iron: "1%",
	},
	{
		id: 23,
		name: "Eclair-2",
		calories: 262,
		fat: 16.0,
		carbs: 23,
		protein: 6.0,
		sodium: 337,
		calcium: "6%",
		iron: "7%",
	},
	{
		id: 24,
		name: "Cupcake-2",
		calories: 305,
		fat: 3.7,
		carbs: 67,
		protein: 4.3,
		sodium: 413,
		calcium: "3%",
		iron: "8%",
	},
	{
		id: 25,
		name: "Gingerbread-2",
		calories: 356,
		fat: 16.0,
		carbs: 49,
		protein: 3.9,
		sodium: 327,
		calcium: "7%",
		iron: "16%",
	},
	{
		id: 26,
		name: "Jelly bean-2",
		calories: 375,
		fat: 0.0,
		carbs: 94,
		protein: 0.0,
		sodium: 50,
		calcium: "0%",
		iron: "0%",
	},
	{
		id: 27,
		name: "Lollipop-2",
		calories: 392,
		fat: 0.2,
		carbs: 98,
		protein: 0,
		sodium: 38,
		calcium: "0%",
		iron: "2%",
	},
	{
		id: 28,
		name: "Honeycomb-2",
		calories: 408,
		fat: 3.2,
		carbs: 87,
		protein: 6.5,
		sodium: 562,
		calcium: "0%",
		iron: "45%",
	},
	{
		id: 29,
		name: "Donut-2",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		sodium: 326,
		calcium: "2%",
		iron: "22%",
	},
	{
		id: 30,
		name: "KitKat-2",
		calories: 518,
		fat: 26.0,
		carbs: 65,
		protein: 7,
		sodium: 54,
		calcium: "12%",
		iron: "6%",
	},
	{
		id: 31,
		name: "Frozen Yogurt-3",
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0,
		sodium: 87,
		calcium: "14%",
		iron: "1%",
	},
	{
		id: 32,
		name: "Ice cream sandwich-3",
		calories: 237,
		fat: 9.0,
		carbs: 37,
		protein: 4.3,
		sodium: 129,
		calcium: "8%",
		iron: "1%",
	},
	{
		id: 33,
		name: "Eclair-3",
		calories: 262,
		fat: 16.0,
		carbs: 23,
		protein: 6.0,
		sodium: 337,
		calcium: "6%",
		iron: "7%",
	},
	{
		id: 34,
		name: "Cupcake-3",
		calories: 305,
		fat: 3.7,
		carbs: 67,
		protein: 4.3,
		sodium: 413,
		calcium: "3%",
		iron: "8%",
	},
	{
		id: 35,
		name: "Gingerbread-3",
		calories: 356,
		fat: 16.0,
		carbs: 49,
		protein: 3.9,
		sodium: 327,
		calcium: "7%",
		iron: "16%",
	},
	{
		id: 36,
		name: "Jelly bean-3",
		calories: 375,
		fat: 0.0,
		carbs: 94,
		protein: 0.0,
		sodium: 50,
		calcium: "0%",
		iron: "0%",
	},
	{
		id: 37,
		name: "Lollipop-3",
		calories: 392,
		fat: 0.2,
		carbs: 98,
		protein: 0,
		sodium: 38,
		calcium: "0%",
		iron: "2%",
	},
	{
		id: 38,
		name: "Honeycomb-3",
		calories: 408,
		fat: 3.2,
		carbs: 87,
		protein: 6.5,
		sodium: 562,
		calcium: "0%",
		iron: "45%",
	},
	{
		id: 39,
		name: "Donut-3",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		sodium: 326,
		calcium: "2%",
		iron: "22%",
	},
	{
		id: 40,
		name: "KitKat-3",
		calories: 518,
		fat: 26.0,
		carbs: 65,
		protein: 7,
		sodium: 54,
		calcium: "12%",
		iron: "6%",
	},
];
const pagesNumber = computed(() =>
	Math.ceil(originalRows.length / pagination.value.rowsPerPage)
);
function fetchFromServer(skipCount, maxResultCount, filter) {
	const data = filter
		? originalRows.filter((row) => row.name.includes(filter))
		: originalRows.slice();

	return data.slice(skipCount, skipCount + maxResultCount);
}

// emulate 'SELECT count(*) FROM ...WHERE...'
function getRowsNumberCount(filter) {
	if (!filter) {
		return originalRows.length;
	}
	let count = 0;
	originalRows.forEach((treat) => {
		if (treat.name.includes(filter)) {
			++count;
		}
	});
	return count;
}

function onRequest(props) {
	const { page, rowsPerPage, sortBy, descending } = props.pagination;
	const filter = props.filter;

	loading.value = true;
	// emulate server
	setTimeout(() => {
		// update rowsCount with appropriate value
		pagination.value.rowsNumber = getRowsNumberCount(filter);

		// get all rows if "All" (0) is selected
		const fetchCount =
			rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

		// calculate starting row of data
		const startRow = (page - 1) * rowsPerPage;

		// fetch data from "server"

		const returnedData = fetchFromServer(startRow, fetchCount, filter);

		// clear out existing data and add new
		rows.value.splice(0, rows.value.length, ...returnedData);

		// don't forget to update local pagination object
		pagination.value.page = page;
		pagination.value.rowsPerPage = rowsPerPage;
		pagination.value.sortBy = sortBy;
		pagination.value.descending = descending;

		// ...and turn of loading indicator
		loading.value = false;
	}, 1500);
}

function clickPage(value) {
	rows.value = fetchFromServer(
		(value - 1) * pagination.value.rowsPerPage,
		pagination.value.rowsPerPage
	);
}
const newPagination = (newPagination) => {
	const { page, rowsPerPage, sortBy, descending, rowsNumber } = newPagination;
	const startRow = (page - 1) * rowsPerPage;
	rows.value = fetchFromServer(startRow, rowsPerPage);
};

const option = ref();

onMounted(() => {
	// get initial data from server (1st page)
	// tableRef.value.requestServerInteraction();
	rows.value = fetchFromServer(0, pagination.value.rowsPerPage);
});
</script>

<style lang="scss" scoped>
.sticky-virtscroll-table {
	// height or max-height is important
	// height: 410px;
	// :deep(.q-table__top) {
	// 	padding: 0;
	// }

	:deep(thead tr th) {
		position: sticky;
		z-index: 1;
	}
	/* this will be the loading indicator */
	:deep(thead tr:last-child th)
    /* height of all previous header originalrows */ {
		top: 48px;
	}
	:deep(thead tr:first-child th) {
		top: 0;
	}
}
</style>
