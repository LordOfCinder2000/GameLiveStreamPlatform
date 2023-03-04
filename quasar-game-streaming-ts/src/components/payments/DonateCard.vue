<template>
	<div :ratio="9 / 16" class="donate-card relative-position">
		<q-card
			:flat="!hover"
			class="q-pa-xs cursor-pointer column items-center full-width no-wrap"
			@mouseenter="hover = true"
			@mouseleave="hover = false"
		>
			<q-img
				class="col-auto"
				:ratio="1"
				spinner-color="positive"
				spinner-size="md"
				:img-class="hover ? '' : 'q-pa-sm'"
				fit="scale-down"
				:src="giftImg"
			/>
			<div class="col-shrink q-mt-xs" style="max-width: 100%">
				<div class="ellipsis text-center text-bold">
					{{ gift.name }}
				</div>
				<div class="row flex-center">
					<q-icon
						size="xs"
						class="q-mr-xs"
						:name="`img:${getCoinImgUrlOrDefault(
							gift.virtualPrice
						)}`"
					/>
					<span class="text-positive">
						{{
							$filters.virtualCurrencyBalance(
								$i18n.locale,
								gift.virtualPrice?.amount
							)
						}}
					</span>
				</div>
			</div>

			<q-card-actions
				v-if="hover"
				class="no-padding overflow-hidden no-wrap"
				vertical
				align="stretch"
			>
				<div class="q-px-sm">
					<q-input
						mask="###"
						maxlength="3"
						dense
						borderless
						input-class="text-center"
						v-model.number="quantity"
					>
						<template v-slot:before>
							<q-btn
								padding="none"
								dense
								unelevated
								size="sm"
								color="positive"
								:disable="!validQuantity"
								icon="remove"
								@click="quantity--"
							/>
						</template>
						<template v-slot:after>
							<q-btn
								padding="none"
								dense
								unelevated
								size="sm"
								color="positive"
								:disable="quantity === maxQuantity"
								icon="add"
								@click="quantity++"
							/>
						</template>
					</q-input>
				</div>
				<q-btn
					full-width
					dense
					color="positive"
					unelevated
					no-caps
					label="Donate"
					:disable="!validQuantity"
					@click="donate"
				/>
			</q-card-actions>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { ItemSellableDto } from "boot/openapi-client";
import { useItemStore } from "stores/item-store";

export interface Props {
	gift: ItemSellableDto;
}
const props = defineProps<Props>();

const emit = defineEmits<{
	(
		e: "donate",
		donateGift: { gift: ItemSellableDto; quantity: number }
	): void;
}>();

const { getCoinImgUrlOrDefault } = useItemStore();

const hover = ref(false);
const maxQuantity = 999;
const quantity = ref(0);
const validQuantity = computed(
	() => quantity.value !== 0 && quantity.value.toString() !== ""
);
const giftImg = computed(
	() =>
		(hover.value
			? props.gift.mediaList?.find((x) => (x.type = "Image"))?.url
			: props.gift.imageUrl) ?? ""
);

watchEffect(() => {
	if (!hover.value) quantity.value = 0;
});

const donate = async () => {
	emit("donate", { gift: props.gift, quantity: quantity.value });
	quantity.value = 0;
};
</script>

<style lang="scss" scoped>
.donate-card {
	:deep(.q-field__before),
	:deep(.q-field__after) {
		padding: 0;
	}
	&:hover {
		:deep(.q-card) {
			z-index: 1;
			top: -1rem;
			position: absolute;
		}
		:deep(.q-img) {
			margin-top: -20px;
		}
	}
}
</style>
