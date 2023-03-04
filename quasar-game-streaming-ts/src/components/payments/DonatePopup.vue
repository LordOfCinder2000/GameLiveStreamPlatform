<template>
	<q-menu
		class="z-max"
		:offset="[0, 5]"
		transition-show="jump-down"
		transition-hide="jump-up"
	>
		<Suspense>
			<DonateContent />
			<template #fallback>
				<q-card>
					<q-toolbar>
						<q-toolbar-title class="flex flex-center">
							<q-skeleton width="50%" type="text" />
						</q-toolbar-title>
					</q-toolbar>
					<q-separator />
					<q-skeleton
						type="rect"
						width="450px"
						height="300px"
					></q-skeleton>
					<q-separator />
					<q-card-actions align="between">
						<div class="row">
							<q-skeleton type="QChip" />
							<q-skeleton type="QChip" />
						</div>
						<div>
							<q-skeleton type="QBtn" />
						</div>
					</q-card-actions>
				</q-card>
			</template>
		</Suspense>
	</q-menu>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const DonateContent = defineAsyncComponent(
	() => import("components/payments/DonateContent.vue")
);
</script>

<style scoped></style>
