<template>
	<q-menu
		class="z-max no-scroll"
		:offset="[0, 5]"
		transition-show="jump-down"
		transition-hide="jump-up"
	>
		<q-card style="max-height: inherit">
			<q-toolbar>
				<div><q-icon /></div>

				<q-toolbar-title class="text-center text-subtitle2">
					Chat room settings
				</q-toolbar-title>
				<q-btn flat dense icon="close" v-close-popup />
			</q-toolbar>
			<q-separator />
			<q-tabs
				v-model="tab"
				class="text-grey"
				active-color="positive"
				indicator-color="positive"
				narrow-indicator
				dense
				align="left"
				:breakpoint="0"
			>
				<q-tab no-caps label="Tab one" name="one" />
				<q-tab no-caps label="Tab two" name="two" />
				<q-tab no-caps label="Tab two" name="three" />
			</q-tabs>

			<q-separator />
			<q-tab-panels
				v-model="tab"
				animated
				style="width: 450px; height: 300px"
			>
				<q-tab-panel name="one" class="no-padding">
					<div>
						<q-item-label header>
							Use Elixir to cast spells on streamers & help them
							earn cash.
						</q-item-label>
						<q-separator />
					</div>

					<q-infinite-scroll
						@load="onLoadData"
						:offset="10"
						:debounce="500"
						class="q-mb-md"
					>
						<div class="row q-pa-xs">
							<div
								class="col-3"
								v-for="gift in gifts"
								:key="gift.id"
							>
								<DonateCard />
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
					<div>
						<q-separator />
						<q-item-label header>
							Use Elixir to cast spells on streamers & help them
							earn cash.
						</q-item-label>
					</div>
				</q-tab-panel>
			</q-tab-panels>
			<q-separator />
			<q-card-actions align="between">
				<div>
					<q-chip
						dense
						text-color="positive"
						icon="img:https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
					>
						<span class="text-bold">{{
							$filters.virtualCurrencyBalance($i18n.locale, 9999)
						}}</span>
					</q-chip>
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
				<div>
					<q-btn dense color="positive" label="Top-up" />
				</div>
			</q-card-actions>
		</q-card>
	</q-menu>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
import { uid } from "quasar";
const DonateCard = defineAsyncComponent(
	() => import("components/payments/DonateCard.vue")
);

const tab = ref("one");

const gifts = ref<{ id: string }[]>([]);
// for (let i = 0; i < 0; i++) {
// 	gifts.value?.push({
// 		id: uid(),
// 	});
// }
const onLoadData = async (index: number, done: (stop: boolean) => void) => {
	console.log(index);

	//// ================== Test
	let record = 8;
	setTimeout(() => {
		for (let i = 0; i < record; i++) {
			gifts.value?.push({
				id: uid(),
			});
		}
		done(false);
	}, 500);
};
</script>

<style scoped></style>
