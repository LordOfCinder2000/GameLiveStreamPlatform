<template>
	<q-page
		:style-fn="myTweak"
		:class="[verticalDirection ? 'row ' : 'column q-pb-none', {}]"
		class="no-scroll"
	>
		<q-tabs
			breakpoint="0"
			outside-arrows
			v-model="tab"
			:vertical="verticalDirection"
			no-caps
			inline-label
			align="left"
			stretch
			:class="[verticalDirection ? 'col-2' : 'col-auto']"
			indicator-color="positive"
			active-color="positive"
			active-bg-color="list-active"
		>
			<div v-if="verticalDirection">
				<q-item-label lines="1" class="text-weight-medium" header>
					{{ tabTitle }}
				</q-item-label>
				<q-separator class="q-mb-xs" />
			</div>
			<q-route-tab
				:class="[
					verticalDirection ? 'tab-class-vertical' : 'tab-class',
				]"
				style="justify-content: flex-start"
				:content-class="verticalDirection ? 'q-ml-md' : ''"
				v-for="listTab in listTabs"
				:key="listTab.id"
				:name="listTab.name"
				:icon="listTab.icon"
				:label="listTab.label"
				:to="listTab.name"
				exact
				replace
			/>
		</q-tabs>
		<q-separator :vertical="verticalDirection" />
		<q-tab-panels
			v-model="tab"
			animated
			class="col fit"
			transition-duration="500"
			infinite
			:vertical="verticalDirection"
		>
			<q-tab-panel
				v-for="listTab in listTabs"
				:key="listTab.id"
				:name="listTab.name"
				style="padding-left: 10rem; padding-right: 10rem"
			>
				<component :is="listTab.componentName"></component>
			</q-tab-panel>
		</q-tab-panels>
	</q-page>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { useQuasar } from "quasar";
// import { ListTabs } from "pages/models";
export interface ListTabs {
	id: string | number;
	icon: string;
	name: string;
	componentName: object;
	label: string;
}
interface Props {
	listTabs: ListTabs[];
	tabTitle: string;
}
const props = defineProps<Props>();

const tab = ref(props.listTabs[0].name);

const myTweak = (offset: any) => {
	return {
		maxHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
		minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
		height: offset ? `calc(100vh - ${offset}px)` : "100vh",
	};
};

// Thay đổi size màn hình
const verticalDirection = ref(true);
const $q = useQuasar();
watchEffect(() => {
	if ($q.screen.lt.md) {
		verticalDirection.value = false;
	} else {
		verticalDirection.value = true;
	}
});
</script>

<style lang="scss">
.tab-class {
	.q-tab__indicator {
		width: 100% !important;
	}
	&-vertical {
		.q-tab__indicator {
			width: 4px !important;
		}
	}
}
</style>
