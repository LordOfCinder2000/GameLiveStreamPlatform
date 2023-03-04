<template>
	<q-dialog
		ref="dialogRef"
		@hide="onDialogHide"
		class="z-max"
		full-height
		persistent
	>
		<q-card
			class="column no-wrap"
			:style="{ 'min-width': width, 'max-width': '80wh' }"
		>
			<q-toolbar>
				<div><q-icon /></div>
				<q-toolbar-title class="text-center">
					Top-up packages</q-toolbar-title
				>
				<q-btn flat dense icon="close" v-close-popup />
			</q-toolbar>
			<q-separator />

			<q-scroll-area class="col-grow">
				<q-card-section>
					<q-infinite-scroll
						:offset="10"
						@load="onLoadData"
						:debounce="500"
					>
						<q-item-label header class="text-center q-pt-none">
							Use Elixir to cast spells on streamers & help them
							earn cash.
						</q-item-label>
						<div class="overflow-auto q-pa-xs">
							<div class="row q-col-gutter-lg">
								<div
									class="col-4"
									v-for="vcPackage in vcPackages"
									:key="vcPackage.id"
								>
									<Suspense>
										<TopupCard
											@buy="buyPackage"
											:package="vcPackage"
										/>
										<template #fallback>
											<q-responsive :ratio="1">
												<q-card
													class="column no-wrap items-center q-pa-sm"
												>
													<q-skeleton
														class="col-grow"
														width="100%"
													/>
													<q-skeleton
														type="text"
														class="text-h6"
														width="50%"
													/>

													<q-skeleton
														type="QBtn"
														width="100%"
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
				</q-card-section>
				<q-inner-loading
					v-if="vcPackages.length === 0"
					color="positive"
					:showing="true"
				/>
			</q-scroll-area>
			<q-separator />
			<q-card-section>
				<div class="row items-center">
					<span class="text-bold on-left">Available balance:</span>
					<q-chip
						class="no-margin"
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
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onBeforeMount, onUnmounted } from "vue";
import { useTopupStore } from "stores/topup-store";
import { useWalletStore } from "stores/wallet-store";
import { useItemStore } from "stores/item-store";
import { usePaymentStore } from "stores/payment-store";
import { ItemSellableDto } from "boot/openapi-client";
import { useDialogPluginComponent, useQuasar } from "quasar";
const TopupCard = defineAsyncComponent(
	() => import("components/payments/TopupCard.vue")
);

const emit = defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const width = ref("800px");

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const { openPayoutDialog } = useTopupStore();
const { getCoin } = useWalletStore();
const { getListVirtualCurrencyPackage } = useItemStore();
const { getXsollaUrl } = usePaymentStore();

onBeforeMount(async () => {
	await getVirtualCurrencyPackages(0, 9);
});

const vcPackages = ref<ItemSellableDto[]>([]);
const getVirtualCurrencyPackages = async (skip: number, take: number) => {
	return await getListVirtualCurrencyPackage(
		"Content.Quantity ASC",
		skip,
		take
	)
		.then((data) => {
			if (data.items) vcPackages.value.push(...data.items);
			return data;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

const onLoadData = async (index: number, done: (stop: boolean) => void) => {
	console.log(index);
	await getVirtualCurrencyPackages(6 * index + 9, 6)
		.then((data) => {
			if (vcPackages.value.length === data.totalCount) {
				done(true);
			}
		})
		.catch(() => {
			done(true);
		})
		.finally(() => {
			done(false);
		});
	//// ================== Test
	// let record = 8;
	// setTimeout(() => {
	// 	for (let i = 0; i < record; i++) {
	// 		vcPackages.value?.push({
	// 			id: 409019,
	// 			sku: "doge",
	// 			type: "virtual_good",
	// 			name: "Doge dancing",
	// 			description: "Meme gif doge dancing",
	// 			imageUrl:
	// 				"https://static.trovo.live/imgupload/shop/20200422_nvdp19uutbk1.png",
	// 			virtualPrice: {
	// 				description: null,
	// 				imageUrl:
	// 					"https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png",
	// 				sku: "virtual_currency_1",
	// 				name: "Catoken",
	// 				amount: 1000,
	// 			},
	// 		});
	// 		done(true);
	// 	}
	// }, 500);
};

const buyPackage = (vcPackage: ItemSellableDto) => {
	openPayoutDialog({
		width: width.value,
		payoutPackages: [vcPackage],
	}).onCancel(() => {
		dialogRef.value?.hide();
	});
};
onUnmounted(() => {
	console.log("error");
});
</script>

<style scoped></style>
