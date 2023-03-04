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
					:to="{
						name: 'user-profile',
					}"
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
					@click="menuItem.click"
					:to="menuItem.to"
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
									:icon="`img:${getCoin.imageUrl}`"
									:label="
										$filters.virtualCurrencyBalance(
											$i18n.locale,
											getCoin.quantity
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
									:icon="`img:${getMana.imageUrl}`"
									:label="
										$filters.virtualCurrencyBalance(
											$i18n.locale,
											getMana.quantity
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
import { ref, h, computed, cloneVNode, onBeforeMount } from "vue";
import { QToggle, QItemLabel } from "quasar";
import { useOidcStore } from "stores/modules/oidc-store";
import { useQuasar } from "quasar";
import { useUserProfileStore } from "stores/user-profile-store";
import { useChatRoomStore } from "stores/components/chat-room-store";
import { apiClient } from "boot/openapi-client";
import { storeToRefs } from "pinia";
import { useWalletStore } from "stores/wallet-store";
const $q = useQuasar();
const darkMode = ref(false);

const walletStore = useWalletStore();

const { getCoin, getMana } = storeToRefs(walletStore);
const userProfileStore = useUserProfileStore();

const logout = async () => {
	const { signOutOidcSilent } = useOidcStore();
	const chatRoomStore = useChatRoomStore();
	try {
		$q.loading.show();
		if (
			chatRoomStore.chatHubSignalR?.connection?.connectionId &&
			chatRoomStore.chatRoom?.id
		)
			await apiClient.chat.leaveChatRoom(
				chatRoomStore.chatHubSignalR.connection.connectionId,
				chatRoomStore.chatRoom.id
			);

		await signOutOidcSilent()
			.then(() => {
				$q.notify({
					type: "positive",
					message: "Logout successful",
				});
				const logoutChannel = new BroadcastChannel("logout");
				logoutChannel.postMessage("reload");
			})
			.catch(() => {
				$q.notify({
					type: "negative",
					message: "Logout fail",
				});
			});
		$q.loading.hide();
	} catch (error) {
		console.log(error);
	}
};

const qToggle = h(QToggle, {
	color: "positive",
});

const onDarkMod = ref(false);
const qToggleDarkmod = () =>
	cloneVNode(qToggle, {
		modelValue: onDarkMod.value,
		"onUpdate:model-value": (value: boolean) => {
			onDarkMod.value = value;
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
		click: (event: Event, go: any) => {
			event.preventDefault();
			go();
		},
		to: {
			name: "user-wallet",
		},
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
