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
					class="chip-live-view on-right bg-positive"
					size="0.8rem"
					dense
					square
					text-color="white"
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
					class="text-bold chip-live"
				>
					TRỰC TIẾP
				</q-chip>
			</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
	viewers: Object,
});
const viewers = computed(() => {
	return props.viewers;
});
</script>

<style lang="scss">
.q-item {
	padding: 16px;
	transition: color 0.3s, background-color 0.3s;
	.q-chip--dense {
		padding: 0 0.4em;
		margin-left: 12px;
	}
	.q-item__label + .q-item__label {
		margin-top: 4px;
	}
	.q-item__section--side:first-child {
		padding-right: 16px;
	}
}
.chip-live {
	margin: 4px !important;
	padding: 0.5em 0.9em !important;
	&-view {
		&::before {
			display: block;
			width: 0.25rem;
			height: 0.25rem;
			margin-right: 0.25rem;
			background: red;
			border-radius: 50%;
			content: "";
		}
	}
}
</style>
