<template>
	<q-responsive :ratio="1">
		<q-card
			class="topup-card cursor-pointer column justify-center q-gutter-y-sm q-hoverable"
			@mouseenter="hover = true"
			@mouseleave="hover = false"
		>
			<span class="q-focus-helper no-margin"></span>
			<q-img
				fit="scale-down"
				class="col"
				:ratio="1"
				src="https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
			/>
			<span class="text-bold">
				{{ $filters.virtualCurrencyBalance($i18n.locale, 9999) }}
				Catoken
			</span>

			<q-card-actions vertical align="center">
				<q-btn dense color="positive" no-caps>
					{{ $filters.fiatFormat($i18n.locale, "USD", 0.99) }}
				</q-btn>
			</q-card-actions>
		</q-card>
	</q-responsive>
</template>

<script setup lang="ts">
import { ref } from "vue";
const hover = ref(false);
</script>

<style lang="scss" scoped>
.topup-card {
	// background-color: $over-dark;
}
</style>
