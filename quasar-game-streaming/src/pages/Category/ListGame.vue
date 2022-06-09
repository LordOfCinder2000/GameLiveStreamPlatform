<template>
	<q-page padding class="">
		<q-card class="transparent transparent" flat square>
			<div class="category-title">
				<span class="text-h5 text-weight-medium">Tất cả Trò chơi</span>
			</div>
			<div class="category-list-btn-wrapper overflow-auto row">
				<div class="category-list-btn q-mt-none q-gutter-sm">
					<q-btn
						v-for="button in buttons"
						:key="button.id"
						outline
						color="positive"
						:label="button.name"
					/>
				</div>
				<q-space />
				<q-input
					dense
					standout
					outlined
					input-class="text-right"
					color="positive"
					class="q-mt-xs"
				>
					<template v-slot:append>
						<q-icon v-if="text === ''" name="search" />
						<q-icon
							color="positive"
							v-else
							name="clear"
							class="cursor-pointer"
							@click="text = ''"
						/>
					</template>
				</q-input>
			</div>
		</q-card>

		<div class="category-items-wrapper">
			<div class="category-items row q-mt-sm q-col-gutter-md">
				<GameCard
					class="col-2 col-xs-4 col-sm-3 col-md-2"
					v-for="n in 12"
					:key="n"
				/>
			</div>
		</div>
	</q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GameCard from "components/GameCard.vue";

export default defineComponent({
	name: "ListGame",
	components: {
		GameCard,
	},

	setup() {
		const buttons = ref([
			{
				id: 1,
				name: "Toàn bộ",
				router: "",
			},
			{
				id: 2,
				name: "PC Games",
				router: "",
			},
			{
				id: 3,
				name: "Mobile Games",
				router: "",
			},
			{
				id: 4,
				name: "Giải trí",
				router: "",
			},
		]);

		return { buttons, text: ref("") };
	},
});
</script>

<style lang="scss"></style>
