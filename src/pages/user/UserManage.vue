<template>
	<ModulePage :listTabs="listTabs" :tabTitle="'Studio manager'" />
</template>

<script setup lang="ts">
import { shallowRef, defineAsyncComponent } from "vue";
import ModulePage, { ListTabs } from "pages/ModulePage.vue";
// import { ListTabs } from "pages/models";
const UserProfile = defineAsyncComponent(
	() => import("pages/user/UserProfile.vue")
);
const UserSubscribe = defineAsyncComponent(
	() => import("pages/user/UserSubscribe.vue")
);
const UserWallet = defineAsyncComponent(
	() => import("pages/user/UserWallet.vue")
);

const listTabs = shallowRef<ListTabs[]>([
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
</script>

<style lang="scss"></style>
