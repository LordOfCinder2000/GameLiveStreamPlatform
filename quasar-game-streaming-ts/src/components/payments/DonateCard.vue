<template>
	<div class="donate-card relative-position fit">
		<q-card
			:flat="!hover"
			class="q-pa-xs cursor-pointer column justify-center"
			@mouseenter="hover = true"
			@mouseleave="hover = false"
		>
			<q-img
				:img-class="hover ? '' : 'q-pa-sm'"
				fit="scale-down"
				src="https://img.trovo.live/imgupload/shop/20221110_hbiuzd96zgl.png?imageView2/2/w/100/h/100/format/webp&max_age=31536000"
			/>
			<div class="col q-pt-xs">
				<div class="full-width">
					<div class="ellipsis text-center text-bold">Si</div>
				</div>
				<div>
					<div class="row flex-center">
						<q-icon
							size="xs"
							class="q-mr-xs"
							name="img:https://cdn3.xsolla.com/img/misc/images/247bd125c7cdc91ff8206a8a0697896e.png"
						/>
						<span class="text-positive">
							{{
								$filters.virtualCurrencyBalance(
									$i18n.locale,
									9999
								)
							}}
						</span>
					</div>
				</div>
			</div>

			<q-card-actions
				v-if="hover"
				class="no-padding overflow-hidden"
				vertical
				align="stretch"
			>
				<div class="q-px-sm">
					<q-input
						tetx
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
				/>
			</q-card-actions>
		</q-card>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const maxQuantity = 999;
const quantity = ref(0);
const validQuantity = computed(
	() => quantity.value !== 0 && quantity.value.toString() !== ""
);

const hover = ref(false);
</script>

<style lang="scss" scoped>
.donate-card {
	:deep(.q-field__before),
	:deep(.q-field__after) {
		padding: 0;
	}
	&:hover {
		:deep(.q-card) {
			z-index: 2;
			top: -1rem;
			position: absolute;
		}
		:deep(.q-img) {
			margin-top: -20px;
		}
	}
}
</style>
