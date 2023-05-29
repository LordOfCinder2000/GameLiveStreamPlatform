<template>
	<q-card v-if="show" flat square class="cursor-pointer transparent">
		<div :class="{ 'card-hover': loaded }">
			<q-img
				loading="eager"
				draggable
				class="card-hover__thumbnail"
				:ratio="2 / 3"
				src="https://api.lorem.space/image/game?w=200&h=300"
				no-spinner
				@load="imgLoading"
				placeholder-src="~assets/images/place-holder.png"
			>
				<template v-slot:error>
					<div
						class="absolute-full flex flex-center bg-negative text-white"
					>
						Cannot load image
					</div>
				</template>
			</q-img>
		</div>

		<q-card-section class="no-wrap no-padding">
			<div class="text-hover text-h6 ellipsis">Changing Planet</div>

			<div class="text-subtitle2 text-weight-light ellipsis text-hover">
				{{ $filters.viewCount($i18n.locale, 23630) }} người xem
			</div>
			<div>
				<q-chip
					class="no-margin"
					square
					size="0.8rem"
					dense
					clickable
					label=""
				>
					<span class="ellipsis">Game PC</span>
				</q-chip>
			</div>
		</q-card-section>
	</q-card>
	<div v-else>
		<q-card flat class="home-games transparent">
			<div class="home-games-skeleton flex">
				<div class="fit relative-position">
					<q-responsive :ratio="2 / 3">
						<q-skeleton></q-skeleton>
					</q-responsive>
				</div>
			</div>

			<q-card-section class="q-mt-sm no-wrap no-padding">
				<q-skeleton square width="90%" />
				<q-skeleton square class="q-mt-sm" width="60%" height="1rem" />
				<q-skeleton
					width="35%"
					height="1.2rem"
					type="QChip"
					class="rounded-borders q-mt-xs"
				/>
			</q-card-section>
		</q-card>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const loaded = ref(false);

const show = ref(false);

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const onClick = async (event) => {
	await waitFor(1000);
	show.value = true;
};

const imgLoading = () => {
	loaded.value = true;
};

onMounted(() => {
	onClick();
});
</script>

<style lang="scss" scoped></style>
