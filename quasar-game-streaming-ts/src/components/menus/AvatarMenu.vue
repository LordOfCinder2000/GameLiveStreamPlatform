<template>
	<q-menu
		class="z-max no-scroll"
		:offset="[0, 5]"
		transition-show="jump-down"
		transition-hide="jump-up"
		max-height="80vh"
	>
		<q-card
			class="avatar-menu column no-wrap"
			style="max-height: inherit; width: 300px"
		>
			<div>
				<q-item
					:class="[
						$q.dark.isActive
							? 'avatar-header--dark'
							: 'avatar-header--white',
						,
					]"
				>
					<q-item-section avatar>
						<q-avatar size="60px">
							<img
								src="https://cdn.quasar.dev/img/boy-avatar.png"
							/>
						</q-avatar>
					</q-item-section>

					<q-item-section class="justify-around">
						<q-item-label class="text-h6">
							{{ myProfile.userName }}
						</q-item-label>

						<q-item-label> 1 Follower </q-item-label>
					</q-item-section>
				</q-item>
				<q-separator />
			</div>

			<q-list class="scroll" dense>
				<q-item
					v-for="menuItem in menuItems"
					:key="menuItem.id"
					clickable
					v-ripple
					@click.prevent="menuItem.click"
				>
					<q-item-section avatar top>
						<q-avatar :icon="menuItem.icon" />
					</q-item-section>

					<q-item-section>
						<q-item-label lines="1">{{
							menuItem.label
						}}</q-item-label>
					</q-item-section>

					<q-item-section side>
						<component :is="menuItem.sideComponent"></component>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card>
	</q-menu>
</template>

<script lang="ts" setup>
import { ref, h, computed } from "vue";
import { QToggle } from "quasar";
import { authClient } from "boot/openapi-client";
import { useOidcStore } from "stores/modules/oidc-store";
import { useQuasar } from "quasar";
import { useUserProfileStore } from "stores/user-profile-store";
const $q = useQuasar();
const darkMode = ref(false);

const { myProfile } = useUserProfileStore();

const logout = async () => {
	const { signOutOidcSilent } = useOidcStore();

	await authClient.login
		.logout()
		.then(async () => {
			debugger;
			await signOutOidcSilent()
				.then((succ: any) => {
					$q.notify({
						color: "positive",
						message: "Logout successful",
					});
					const logoutChannel = new BroadcastChannel("logout");
					logoutChannel.postMessage("reload");
				})
				.catch(() => {
					$q.notify({
						color: "negative",
						message: "Logout fail",
					});
				});
		})
		.catch((error) => {
			console.log(error);
		});
};

const vnode = () =>
	h(
		QToggle, // type
		{
			"model-value": darkMode,
		}
	);

const menuItems = ref([
	{
		id: 1,
		icon: "account_balance_wallet",
		label: "My wallet",
	},
	{
		id: 2,
		icon: "settings",
		label: "Settings",
	},
	{
		id: 3,
		icon: "language",
		label: "Language",
	},
	{
		id: 4,
		icon: "dark_mode",
		label: "Dark mode",
		sideComponent: vnode,
	},
	{
		id: 5,
		icon: "logout",
		label: "Logout",
		click: logout,
	},
]);
</script>

<style lang="scss" scoped>
.avatar-menu {
	.q-list--dense > .q-item {
		padding-left: 5px;
		padding-right: 5px;
	}
	.q-list {
		.q-item {
			.q-item__section--avatar {
				min-width: auto;
			}
			.q-item__section--side {
				padding-right: 0;
			}
		}
	}
	.avatar-header {
		&--white {
			background: linear-gradient(90deg, $positive, $white);
		}
		&--dark {
			background: linear-gradient(90deg, $positive, $dark-page);
		}
	}
}
</style>
