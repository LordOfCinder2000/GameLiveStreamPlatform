<template>
	<q-card style="width: 600px">
		<q-toolbar>
			<div><q-icon /></div>
			<q-toolbar-title class="text-center text-subtitle2">
				Chat room settings
			</q-toolbar-title>
			<q-btn flat dense icon="close" v-close-popup />
		</q-toolbar>
		<q-separator />
		<q-item-label header class="text-center">
			Use Elixir to cast spells on streamers & help them earn cash.
		</q-item-label>
		<q-card-section class="overflow-auto">
			<div class="row q-col-gutter-lg">
				<div class="col-3" v-for="topup in 6" :key="topup">
					<TopupCard />
				</div>
			</div>
		</q-card-section>

		<q-separator />
		<q-card-actions align="left">
			<div class="row">
				<span>Available balance:</span>
				<q-chip
					dense
					text-color="positive"
					icon="img:https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
				>
					<span class="text-bold">{{
						$filters.virtualCurrencyBalance($i18n.locale, 9999)
					}}</span>
				</q-chip>
			</div>
		</q-card-actions>
	</q-card>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const TopupCard = defineAsyncComponent(() => import("./TopupCard.vue"));
</script>

<style scoped></style>
