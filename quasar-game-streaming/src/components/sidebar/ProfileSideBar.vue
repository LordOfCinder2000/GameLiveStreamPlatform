<template>
	<q-tabs vertical class="text-teal">
		<q-tab name="mails" icon="mail" label="Mails" />
		<q-tab name="alarms" icon="alarm" label="Alarms" />
		<q-tab name="movies" icon="movie" label="Movies" />
	</q-tabs>
</template>

<script setup>
import { ref } from "vue";

const lists = ref([
	{
		id: 1,
		icon: "manage_accounts",
		name: "Hồ sơ",
	},
	{
		id: 2,
		icon: "account_balance_wallet",
		name: "Ví",
	},
	{
		id: 3,
		icon: "star_outline",
		name: "Đăng ký",
	},
]);
</script>

<style lang="scss" scoped>
.profile-sidebar-wrapper {
	.sidebar-item {
		margin-bottom: 0.5rem;
	}
	.q-item__section--avatar {
		min-width: 2rem;
		padding-right: 0.5rem;
	}
}
</style>
<!-- <q-item class="sidebar-item" v-for="list in lists" :key="list.id" clickable>
			<q-item-section avatar>
				<q-icon :name="list.icon" />
			</q-item-section>
			<q-item-section>
				<q-item-label class="non-selectable">
					{{ list.name }}
				</q-item-label>
			</q-item-section>
		</q-item> -->
