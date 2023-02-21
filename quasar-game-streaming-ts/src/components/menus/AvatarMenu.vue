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
							{{ userProfileStore.myProfile.userName }}
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
					<q-item-section avatar>
						<q-avatar :icon="menuItem.icon" />
					</q-item-section>

					<q-item-section
						:class="[
							{ 'q-py-sm': menuItem.type == MenuItemType.Wallet },
						]"
					>
						<q-item-label lines="1">{{
							menuItem.label
						}}</q-item-label>
						<q-item-label
							lines="1"
							class="row"
							v-if="menuItem.type == MenuItemType.Wallet"
						>
							<div class="col flex flex-center">
								<q-btn
									class="no-pointer-events"
									color="positive"
									icon="img:https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
									:label="
										$filters.virtualCurrencyBalance(
											$i18n.locale,
											20000
										)
									"
									dense
									flat
									no-wrap
								/>
							</div>
							<q-separator
								vertical
								class="col-shrink"
								size="0.5px"
							/>
							<div class="col flex flex-center">
								<q-btn
									class="no-pointer-events"
									color="positive"
									icon="img:https://cdn3.xsolla.com/img/misc/images/8522341cba4fa6f3fe686411b0590b65.png"
									:label="
										$filters.virtualCurrencyBalance(
											$i18n.locale,
											2000000000
										)
									"
									dense
									flat
									no-wrap
								/>
							</div>
						</q-item-label>
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
import { ref, h, computed, cloneVNode } from "vue";
import { QToggle, QItemLabel } from "quasar";
import { useOidcStore } from "stores/modules/oidc-store";
import { useQuasar } from "quasar";
import { useUserProfileStore } from "stores/user-profile-store";
import { useChatRoomStore } from "stores/components/chat-room-store";
import { apiClient } from "boot/openapi-client";
const $q = useQuasar();
const darkMode = ref(false);

const userProfileStore = useUserProfileStore();

const logout = async () => {
	const { signOutOidcSilent } = useOidcStore();
	const chatRoomStore = useChatRoomStore();
	try {
		$q.loading.show();
		await apiClient.chat
			.leaveChatRoom(
				chatRoomStore.chatHubSignalR.connection.connectionId ?? "",
				chatRoomStore.chatRoom.id
			)
			.then(async () => {
				await signOutOidcSilent()
					.then(() => {
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
			})
			.finally(() => {
				$q.loading.hide();
			});
	} catch (error) {
		console.log(error);
	}
};

const qToggle = h(QToggle, {
	color: "positive",
});

const onDarkmod = ref(false);
const qToggleDarkmod = () =>
	cloneVNode(qToggle, {
		modelValue: onDarkmod.value,
		"onUpdate:model-value": (value: boolean) => {
			onDarkmod.value = value;
			$q.dark.toggle();
		},
	});

enum MenuItemType {
	Wallet,
}

const menuItems = ref([
	{
		id: 1,
		type: MenuItemType.Wallet,
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
		sideComponent: qToggleDarkmod,
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
