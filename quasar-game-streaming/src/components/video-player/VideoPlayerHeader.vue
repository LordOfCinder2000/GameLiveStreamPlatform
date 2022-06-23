<template>
	<q-item>
		<q-item-section avatar>
			<q-avatar
				size="4rem"
				color="positive"
				text-color="white"
				class="cursor-pointer"
			>
				<q-img src="https://cdn.quasar.dev/img/avatar.png" />
			</q-avatar>
		</q-item-section>
		<q-item-section>
			<q-item-label class="text-h6 cursor-pointer" lines="1">
				Gatayvaichuoi
			</q-item-label>
			<q-item-label lines="1" class="text-subtitle1">
				Title Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				Hic voluptates quasi est ab totam quam tempore
			</q-item-label>
			<q-item-label lines="1" class="text-positive text-subtitle2">
				<span class="cursor-pointer">League of Legend</span>

				<q-chip
					class="chip-live on-right bg-positive"
					size="0.8rem"
					dense
					square
				>
					{{ viewers }} viewers
				</q-chip>
			</q-item-label>
		</q-item-section>
		<q-item-section side top>
			<q-item-label caption>
				<q-chip
					size="0.7rem"
					color="red"
					square
					text-color="white"
					class="text-bold"
				>
					TRỰC TIẾP
				</q-chip>
			</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
	viewers: Number,
});
</script>

<style lang="scss">
.chip-live {
	.q-chip__content::before {
		display: block;
		width: 0.25rem;
		height: 0.25rem;
		margin-right: 0.25rem;
		background: red;
		border-radius: 50%;
		content: "";
	}
}
</style>
