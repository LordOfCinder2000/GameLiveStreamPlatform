<template>
	<q-dialog
		ref="dialogRef"
		@hide="closeDialog"
		class="z-max"
		full-height
		persistent
	>
		<q-card class="column no-wrap" :style="{ 'min-width': width }">
			<q-toolbar>
				<div><q-icon /></div>
				<q-toolbar-title class="text-center">
					Checkout
				</q-toolbar-title>
				<q-btn flat dense icon="close" v-close-popup="2" />
			</q-toolbar>
			<q-separator />
			<div
				v-if="!paymentStore.getXsollaUrl"
				class="col-grow column no-wrap"
			>
				<div>
					<div class="q-pa-md">
						<q-card-section class="bg-list-active">
							<q-item-label class="text-h6" lines="1">
								<span>Purchase summary</span>
							</q-item-label>

							<div
								class="row q-mb-sm"
								v-for="payoutPackage in payoutPackageWithQuantities"
								:key="payoutPackage.value.id"
							>
								<div class="row items-center">
									<q-icon
										class="q-pa-sm"
										size="sm"
										:name="`img:${getCoinImgUrlOrDefault(
											payoutPackage.value.content
										)}`"
									/>
									<span class="text-h6 text-positive"
										>{{
											`${$filters.virtualCurrencyBalance(
												$i18n.locale,
												payoutPackage.value.content
													?.quantity
											)} ${
												payoutPackage.value.content
													?.name
											}`
										}}
									</span>
								</div>

								<q-space />
								<div class="column justify-center">
									<span>Quantity</span>
									<q-select
										color="positive"
										no-error-icon
										outlined
										options-dense
										dense
										hide-bottom-space
										v-model.number="
											payoutPackage.value.quantity
										"
										:options="quantityOptions"
										popup-content-class="z-max"
										input-class="text-center"
										:disable="showPaymentMethod"
									/>
								</div>
							</div>

							<q-separator />
							<div class="text-subtitle2 row q-mt-md">
								<span>Total excluding VAT</span>
								<q-space />
								<span class="text-h6">{{
									$filters.fiatFormat(
										$i18n.locale,
										currency,
										totalAmount
									)
								}}</span>
							</div>
						</q-card-section>
					</div>
				</div>
				<div class="col-grow column no-wrap">
					<div v-if="!showPaymentMethod">
						<div class="row justify-evenly">
							<q-btn
								v-for="(paymentMethod, index) in paymentMethods"
								:key="
									paymentMethod.paymentMethod ??
									`key-${index}`
								"
								color="positive"
								no-caps
								:label="`Pay with ${paymentMethod.name}`"
								@click="openPaymentMethod(paymentMethod)"
							/>
						</div>

						<div
							class="row justify-evenly"
							v-if="paymentMethods.length === 0"
						>
							<q-skeleton
								type="QBtn"
								v-for="paymentMethod in 3"
								:key="paymentMethod"
							/>
						</div>
					</div>

					<!-- <XsollaIframe
						v-else-if="paymentStore.getXsollaUrl"
						:url="paymentStore.getXsollaUrl"
						@completePayment="complete"
					/> -->
				</div>
			</div>
			<div v-else class="col-grow column no-wrap">
				<XsollaIframe
					:url="paymentStore.getXsollaUrl"
					@completePayment="complete"
				/>
			</div>

			<q-separator />
			<q-card-section>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit.
			</q-card-section>
			<q-inner-loading color="positive" :showing="loading" />
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import {
	ref,
	defineAsyncComponent,
	onBeforeMount,
	onBeforeUnmount,
	computed,
	toRefs,
} from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { usePaymentStore } from "stores/payment-store";
import { useItemStore } from "stores/item-store";
import { useWalletStore } from "stores/wallet-store";
import {
	CreatePaymentItemDto,
	ItemSellableDto,
	PaymentMethodDto,
} from "boot/openapi-client";
export interface Props {
	width: string;
	payoutPackages: ItemSellableDto[];
}

const XsollaIframe = defineAsyncComponent(
	() => import("components/payments/XsollaIframe.vue")
);
const props = defineProps<Props>();
const emit = defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const paymentStore = usePaymentStore();
const { getCoinImgUrlOrDefault } = useItemStore();
const { getWallet } = useWalletStore();

onBeforeMount(async () => {
	try {
		paymentMethods.value = await paymentStore.getListPaymentMethod();
	} catch (error) {
		console.log(error);
	}
});

const paymentMethods = ref<PaymentMethodDto[]>([]);
const quantityOptions = ref([1, 2, 3, 4, 5]);
const showPaymentMethod = ref(false);
const loading = ref(false);
const completePayment = ref(false);

const currency = computed(
	() => props.payoutPackages[0].price?.currency ?? "USD"
);

const payoutPackageWithQuantities = props.payoutPackages.map((p) => {
	return ref({ ...p, quantity: 1 });
});
const totalAmount = computed(() =>
	payoutPackageWithQuantities.reduce((sum, payoutPackage) => {
		const priceAmount = payoutPackage.value.price
			? Number(payoutPackage.value.price.amount)
			: 0;
		return sum + priceAmount * payoutPackage.value.quantity;
	}, 0)
);

const createLocalPayment = async (paymentMethod: string) => {
	return await paymentStore
		.createPayment({
			paymentMethod: paymentMethod,
			paymentItems: payoutPackageWithQuantities.map(
				(payoutPackage) =>
					<CreatePaymentItemDto>{
						itemSku: payoutPackage.value.sku,
						quantity: payoutPackage.value.quantity,
					}
			),
		})
		.then((payment) => {
			if (!payment.id) {
				$q.notify({
					type: "negative",
					message: `Payment id ${payment.id} not found!`,
				});
			}
			return payment.id;
		})
		.catch((error: ApiError) => {
			if (error.body.error)
				$q.notify({
					type: "negative",
					message:
						error.body.error.message ?? "Error create payment!",
				});
			console.log(error);
		});
};

const handlerXsolla = async (paymentMethod: string) => {
	try {
		const paymentId = await createLocalPayment(paymentMethod);
		if (paymentId)
			await paymentStore
				.createXsollaAccessToken(paymentId, {
					ui: {
						size: "Medium",
						theme: $q.dark.isActive ? "Dark" : "Default",
					},
				})
				.then((data) => {
					if (!data.checkoutUrl) {
						$q.notify({
							type: "negative",
							message: `Error create ${paymentMethod} payment token!`,
						});
						return;
					}
					showPaymentMethod.value = true;
				})
				.catch((error: ApiError) => {
					if (error.body.error)
						$q.notify({
							type: "negative",
							message:
								error.body.error.message ??
								`Error create ${paymentMethod} payment token!`,
						});
					console.log(error);
				});
	} catch (error) {
		console.log(error);
	}
};

const openPaymentMethod = async (value: PaymentMethodDto) => {
	loading.value = true;
	switch (value.paymentMethod?.toLocaleLowerCase()) {
		case "xsolla":
			await handlerXsolla(value.paymentMethod as string);
			break;

		default:
			$q.notify({
				type: "negative",
				message: `Payment method ${value.name} not found!`,
			});
			break;
	}
	loading.value = false;
};

const closeDialog = () => {
	if (showPaymentMethod.value && !completePayment.value) {
		$q.notify({
			type: "negative",
			message: "Cancel payment method!",
		});
	}
	onDialogHide();
};

const complete = async () => {
	let message = "Buy package successful!";
	const items = paymentStore?.currentPayment?.paymentItems;
	if (items && items.length > 0) {
		message = `Buy ${items[0].name} successful!`;
	}
	$q.notify({
		type: "positive",
		message: message,
	});

	completePayment.value = true;
	// paymentStore.$reset();

	await getWallet().catch((error) => {
		console.log(error);
	});
};

onBeforeUnmount(() => {
	paymentStore.$reset();
});
</script>

<style lang="scss" scoped>
:deep(.q-field__control) {
	padding-right: 0;
}
:deep(.q-field__append) {
	padding-left: 0;
}
</style>
