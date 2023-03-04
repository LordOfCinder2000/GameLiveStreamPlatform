<template>
	<q-responsive :ratio="1">
		<q-card
			class="topup-card cursor-pointer column items-center q-hoverable q-pa-sm no-wrap"
		>
			<span class="q-focus-helper no-margin"></span>
			<q-img
				fit="scale-down"
				class="col"
				:ratio="1"
				:src="package.imageUrl as string"
			/>
			<span class="text-bold">
				{{
					`${$filters.virtualCurrencyBalance(
						$i18n.locale,
						package.content?.quantity ?? 0
					)} ${package.content?.name}`
				}}
			</span>

			<q-card-actions vertical align="center" class="full-width">
				<q-btn
					class="full-width"
					color="positive"
					no-caps
					@click="emit('buy', package)"
				>
					{{
						$filters.fiatFormat(
							$i18n.locale,
							package.price?.currency ?? "USD",
							Number(package.price?.amount)
						)
					}}
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-responsive>
</template>

<script setup lang="ts">
import { ItemSellableDto } from "boot/openapi-client";

export interface Props {
	package: ItemSellableDto;
}
const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "buy", data: ItemSellableDto): void;
}>();
</script>

<style lang="scss" scoped></style>
