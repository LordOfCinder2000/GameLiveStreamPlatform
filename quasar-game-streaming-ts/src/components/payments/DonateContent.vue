<template>
	<q-card class="column no-wrap">
		<q-toolbar>
			<div><q-icon /></div>
			<q-toolbar-title class="text-center text-subtitle2">
				Give some gift to this channel
			</q-toolbar-title>
			<q-btn flat dense icon="close" v-close-popup />
		</q-toolbar>
		<q-separator />

		<div style="height: 300px; width: 450px" class="column no-wrap">
			<q-tabs
				v-model="tab"
				class="text-grey col-auto"
				active-color="positive"
				indicator-color="positive"
				narrow-indicator
				dense
				align="left"
				:breakpoint="0"
			>
				<q-tab
					v-for="(giftGroup, index) in giftGroups"
					:key="giftGroup.id"
					no-caps
					:label="giftGroup.name ?? `Tab-${index}`"
					:name="giftGroup.name ?? index"
				/>
			</q-tabs>
			<q-separator />
			<q-tab-panels class="col" v-model="tab" animated keep-alive>
				<q-tab-panel
					v-for="(giftGroup, index) in giftGroups"
					:key="giftGroup.id"
					:name="giftGroup.name ?? index"
					class="no-padding"
				>
					<div class="fit relative-position">
						<q-infinite-scroll
							@load="
								(index, done) =>
									onLoadData(
										{ index: index, done: done },
										giftGroup.id
									)
							"
							:offset="10"
							:debounce="500"
							class="q-pb-xl"
						>
							<NoData
								class="absolute-center"
								v-if="giftGroup.gifts.length === 0"
							/>

							<div v-else>
								<div>
									<q-item-label header>
										Use Elixir to cast spells on streamers &
										help them earn cash.
									</q-item-label>
									<q-separator />
								</div>
								<div class="row q-pa-xs">
									<div
										class="col-3"
										v-for="gift in giftGroup.gifts"
										:key="gift.id"
									>
										<Suspense>
											<DonateCard
												:gift="gift"
												@donate="donate"
											/>

											<template #fallback>
												<q-responsive :ratio="9 / 16">
													<q-card
														flat
														class="column no-wrap items-center q-pa-xs"
													>
														<q-skeleton
															width="90%"
															class="col-6 q-mb-sm"
														/>

														<q-skeleton
															type="text"
															width="70%"
														/>

														<q-skeleton
															type="text"
															width="50%"
														/>
													</q-card>
												</q-responsive>
											</template>
										</Suspense>
									</div>
								</div>
							</div>

							<template v-slot:loading>
								<div class="flex flex-center">
									<q-spinner-dots
										class="self-center"
										color="positive"
										size="30px"
									/>
								</div>
							</template>
						</q-infinite-scroll>
					</div>
				</q-tab-panel>
			</q-tab-panels>
		</div>
		<q-separator />

		<q-card-actions class="no-wrap" align="between">
			<div>
				<q-chip
					dense
					text-color="positive"
					:icon="`img:${getCoin.imageUrl}`"
				>
					<span class="text-bold">{{
						$filters.virtualCurrencyBalance(
							$i18n.locale,
							getCoin.quantity
						)
					}}</span>
				</q-chip>
				<q-chip
					dense
					text-color="positive"
					:icon="`img:${getMana.imageUrl}`"
				>
					<span class="text-bold">{{
						$filters.virtualCurrencyBalance(
							$i18n.locale,
							getMana.quantity
						)
					}}</span>
				</q-chip>
			</div>
			<div class="row no-wrap">
				<q-btn
					dense
					color="positive"
					label="Top-up"
					@click="openTopupDialog"
				/>
			</div>
		</q-card-actions>

		<q-inner-loading
			style="z-index: 2"
			color="positive"
			:showing="giftGroups.length === 0 || loading"
		/>
	</q-card>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useWalletStore } from "stores/wallet-store";
import { useItemStore } from "stores/item-store";
import { GiftGroupDto, ItemSellableDto } from "boot/openapi-client";
import { useTopupStore } from "stores/topup-store";
import { useDonateStore } from "stores/donate-store";
import { useChannelStore } from "stores/components/channel-store";
import { useOidcStore } from "stores/modules/oidc-store";
import { useAccountStore } from "stores/components/account-store";
import { useQuasar } from "quasar";

const DonateCard = defineAsyncComponent(
	() => import("components/payments/DonateCard.vue")
);

const $q = useQuasar();
const walletStore = useWalletStore();
const { openTopupDialog } = useTopupStore();
const { getCoin, getMana } = storeToRefs(walletStore);
const { getListGiftGroup, getListGiftByGroupId } = useItemStore();

const loading = ref(false);
const giftGroups = ref<({ gifts: ItemSellableDto[] } & GiftGroupDto)[]>([]);
const tab = ref<any>(0);
onBeforeMount(async () => {
	giftGroups.value = [];
	await getListGiftGroup().then((data) => {
		if (data.items) {
			giftGroups.value = data.items.map((x: GiftGroupDto) => ({
				...x,
				gifts: <ItemSellableDto[]>[],
			}));
			tab.value = giftGroups.value[0].name ?? 0;
		}
	});
});

const onLoadData = async (
	event: { index: number; done: (stop: boolean) => void },
	groupId: any
) => {
	console.log(event.index);
	await getListGiftByGroupId(groupId, (event.index - 1) * 8, 8)
		.then((data) => {
			if (!data.items || data.items?.length == 0) {
				event.done(true);
				return;
			}
			giftGroups.value
				.find((x) => x.id === groupId)
				?.gifts.push(...data.items);
		})
		.catch(() => {
			event.done(true);
		})
		.finally(() => {
			event.done(false);
		});
	//// ================== Test
	// let record = 8;
	// setTimeout(() => {
	// 	for (let i = 0; i < record; i++) {
	// 		gifts.value?.push({
	// 			id: 409019,
	// 			sku: "doge",
	// 			type: "virtual_good",
	// 			name: "Doge dancing",
	// 			description: "Meme gif doge dancing",
	// 			imageUrl:
	// 				"https://cdn3.xsolla.com/img/misc/images/56c7ed26e5f69b8a98374a5be6f656b2.webp",
	// 			virtualPrice: {
	// 				description: null,
	// 				imageUrl:
	// 					"https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png",
	// 				sku: "virtual_currency_1",
	// 				name: "Catoken",
	// 				amount: 1000,
	// 			},
	// 		});
	// 	}
	// 	event.done(false);
	// }, 500);
};

const handlerDonate = async (donateGift: {
	gift: ItemSellableDto;
	quantity: number;
}) => {
	const { oidcIsAuthenticated } = useOidcStore();
	if (!oidcIsAuthenticated) {
		const { openLoginDialog } = useAccountStore();
		openLoginDialog();
		loading.value = false;
		return;
	}
	const { donate } = useDonateStore();
	const { channel } = useChannelStore();

	if (!channel.id) {
		$q.notify({
			type: "negative",
			message: "Not found target channel!",
		});
		return;
	}
	if (donateGift.gift.id && donateGift.gift.sku)
		await donate({
			giftId: donateGift.gift.id,
			giftSku: donateGift.gift.sku,
			recipientChannelId: channel.id,
			quantity: donateGift.quantity,
			detail: `Donate for channel ${channel.ownerUserName}`,
		})
			.then(async () => {
				await walletStore.getWallet();
				$q.notify({
					type: "positive",
					message: `Donate for channel ${channel.ownerUserName} successful!`,
				});
			})
			.catch((error: ApiError) => {
				console.log(error);
				if (error.body.error)
					$q.notify({
						type: "negative",
						message:
							error.body.error.message ??
							`Donate for channel ${channel.ownerUserName} fail!`,
					});
			});
};

const donate = async (donateGift: {
	gift: ItemSellableDto;
	quantity: number;
}) => {
	loading.value = true;
	await handlerDonate(donateGift);
	loading.value = false;
};
</script>

<style scoped></style>
