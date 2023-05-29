<template>
	<div v-if="show">
		<q-card class="col my-card cursor-pointer">
			<q-img
				:ratio="2 / 3"
				loading="lazy"
				draggable
				src="https://api.lorem.space/image/game?w=200&h=300"
				no-spinner
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

			<q-card-section class="no-wrap q-pa-sm">
				<div class="text-hover text-h6 ellipsis">Changing Planet</div>

				<div
					class="text-subtitle2 text-weight-light ellipsis text-hover"
				>
					236,3 N người xem
				</div>
			</q-card-section>
		</q-card>
	</div>
	<div v-else>
		<q-responsive :ratio="2 / 3.5">
			<q-card class="cursor-pointer column">
				<q-skeleton class="col" square />

				<q-card-section class="no-wrap q-pa-sm">
					<q-skeleton
						square
						width="70%"
						class="text-h6"
						type="text"
					/>
					<q-skeleton
						square
						width="40%"
						class="text-subtitle2"
						type="text"
					/>
				</q-card-section>
			</q-card>
		</q-responsive>
	</div>
</template>

<script>
import { ref, defineComponent, onMounted, watch } from "vue";

export default defineComponent({
	setup() {
		const loaded = ref(false);

		const show = ref(false);

		const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

		const onClick = async (event) => {
			await waitFor(1000);
			show.value = true;
		};

		onMounted(() => {
			onClick();
		});

		return {
			show,

			loaded,
			imgLoading() {
				loaded.value = true;
			},
		};
	},
});
</script>

<style lang="scss">
.my-card {
	transition-duration: 0.3s;
	&:hover {
		box-shadow: 0 1px 8px #0003, 0 3px 4px #00000024,
			0 3px 3px -2px #0000001f;
		transform: scale(1.05);
	}
}
</style>

<!-- <div class="col-2 col-xs-12 col-sm-3 col-md-2 q-hoverable" v-if="true">
    <q-card v-ripple class="q-hoverable cursor-pointer">
      <span class="q-focus-helper"></span>
      <img
        src="https://i.picsum.photos/id/936/200/300.jpg?hmac=2SjFPkZpMzhNZnH6hwt9r9kUFo82iIJ22lkr7wdve8A"
      />

      <q-card-section class="no-wrap">
        <div class="text-h6 ellipsis">Our Changing Planet</div>
        <div class="text-subtitle2 ellipsis">by John Doe</div>
      </q-card-section>
    </q-card>
  </div> -->
