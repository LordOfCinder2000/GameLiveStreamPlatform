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
					Trung tâm cá nhân
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
			<!-- <q-tab
				class="tab-class"
				style="justify-content: flex-start"
				content-class=" q-ml-md"
				v-for="listTab in listTabs"
				:key="listTab.id"
				:name="listTab.name"
				:icon="listTab.icon"
				:label="listTab.label"
			/> -->
		</q-tabs>
		<q-separator :vertical="verticalDirection" />
		<!-- <router-view v-slot="{ Component }">
			<transition
				appear
				enter-active-class="animated fadeInDown"
				leave-active-class="animated fadeIntUp"
				mode="out-in"
			>
				<component :is="Component"></component>
			</transition>
		</router-view> -->
		<q-tab-panels
			transition-prev="jump-up"
			transition-next="jump-down"
			v-model="tab"
			animated
			class="col fit"
			transition-duration="100"
		>
			<q-tab-panel
				v-for="listTab in listTabs"
				:key="listTab.id"
				:name="listTab.name"
				style="padding-left: 10rem; padding-right: 10rem"
			>
				<component :is="listTab.componentName"></component>
			</q-tab-panel>

			<!-- <q-tab-panel
				v-for="listTab in listTabs"
				:key="listTab.id"
				:name="listTab.name"
			>
				<component :is="listTab.componentName"></component>
			</q-tab-panel> -->
		</q-tab-panels>
	</q-page>
</template>

<script setup>
import {
	shallowRef,
	ref,
	defineAsyncComponent,
	onUpdated,
	watchEffect,
} from "vue";
import ProfileSideBar from "components/sidebar/ProfileSideBar.vue";
import { useQuasar } from "quasar";
const UserProfile = defineAsyncComponent(() =>
	import("pages/user/UserProfile.vue")
);
const UserSubscribe = defineAsyncComponent(() =>
	import("pages/user/UserSubscribe.vue")
);
const UserWallet = defineAsyncComponent(() =>
	import("pages/user/UserWallet.vue")
);
const myTweak = (offset) => {
	return {
		maxHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
		minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
		height: offset ? `calc(100vh - ${offset}px)` : "100vh",
	};
};

const listTabs = shallowRef([
	{
		id: 1,
		icon: "manage_accounts",
		name: "profile",
		componentName: UserProfile,
		label: "Hồ sơ",
	},
	{
		id: 2,
		icon: "account_balance_wallet",
		name: "wallet",
		componentName: UserWallet,
		label: "Ví",
	},
	{
		id: 3,
		icon: "star",
		name: "subscribe",
		componentName: UserSubscribe,
		label: "Đăng ký",
	},
]);
const tab = ref(listTabs.value[0].name);

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
