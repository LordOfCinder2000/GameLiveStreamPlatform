<template>
	<q-page padding>
		<TopupPopup />
	</q-page>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
const DonateCard = defineAsyncComponent(
	() => import("components/payments/DonatePopup.vue")
);

const TopupPopup = defineAsyncComponent(
	() => import("components/payments/TopupPopup.vue")
);
</script>

<style scoped></style>
