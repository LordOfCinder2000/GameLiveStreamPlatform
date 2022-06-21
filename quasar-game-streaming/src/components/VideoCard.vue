<template>
	<div v-if="show">
		<q-card class="my-card cursor-pointer">
			<div class="relative-position overflow-hidden">
				<!-- <q-video
          :ratio="16 / 9"
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
          ref="video"
        >
        </q-video> -->
				<q-img
					:ratio="16 / 9"
					loading="lazy"
					draggable
					src="https://api.lorem.space/image/game?w=1600&h=900"
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
				<q-icon
					size="50px"
					class="play-icon absolute-center"
					name="play_circle_outline"
					color="positive"
				/>
			</div>

			<!-- placeholder-src="~assets/images/place-holder.png" -->

			<q-item class="col-auto q-pa-sm">
				<q-item-section avatar>
					<q-avatar size="xl">
						<q-img
							src="https://img.nimo.tv/t/1639520760395/202111261637952763880_1639520760395_avatar.png/w120_l0/img.webp"
						/>
					</q-avatar>
				</q-item-section>

				<q-item-section class="overflow-hidden">
					<q-item-label class="text-h6 ellipsis text-hover"
						>Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Autem itaque culpa molestiae ex veniam suscipit
						quo sapiente fuga. Et enim porro eveniet, quibusdam
						impedit ratione nam aliquam officia deleniti
						esse.</q-item-label
					>
					<q-item-label
						class="text-subtitle2 text-weight-light ellipsis text-hover"
						>Lorem ipsum dolor sit amet consectetur adipisicing
						elit. Eaque, autem dolor? Quam ipsa perspiciatis
						repudiandae possimus velit quod ipsam dolorum eius
						debitis aliquid vitae quidem, voluptate aliquam placeat.
						Modi, similique!</q-item-label
					>
					<q-item-label :lines="1" class="q-gutter-xs chip-videos">
						<q-chip square size="0.65rem" dense clickable label="">
							<span class="ellipsis">Liên Minh Huyền Thoại</span>
						</q-chip>
						<q-chip square size="0.65rem" dense clickable label="">
							<span class="ellipsis">CSGO</span></q-chip
						>
						<q-chip square size="0.65rem" dense clickable label="">
							<span class="ellipsis">Dark Souls</span></q-chip
						>
					</q-item-label>
				</q-item-section>
			</q-item>
		</q-card>
	</div>
	<div v-else>
		<q-responsive :ratio="16 / 12.5">
			<q-card class="cursor-pointer column">
				<q-skeleton class="col" square />

				<q-item class="q-pa-sm">
					<q-item-section avatar>
						<q-skeleton type="QAvatar" />
					</q-item-section>
					<q-item-section>
						<!-- <q-skeleton square width="90%" class="text-h6" type="text" /> -->
						<q-skeleton square height="1rem" width="90%" />
						<q-skeleton
							square
							class="text-subtitle2"
							type="text"
							width="70%"
						/>
						<q-skeleton
							square
							type="QChip"
							height="0.8rem"
							width="40%"
						/>
					</q-item-section>
				</q-item>
			</q-card>
		</q-responsive>
	</div>
</template>

<script>
import { ref, defineComponent, onMounted, watch } from "vue";

export default defineComponent({
	props: {},
	setup() {
		const video = ref(null);
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
			video,
			show,

			loaded,
			imgLoading() {
				console.log("loading");
				loaded.value = true;
			},
		};
	},
});
</script>

<style lang="scss" scoped>
.chip-videos {
	.q-chip {
		max-width: 100px;
	}
}

.my-card:hover .play-icon {
	opacity: 1;
	-webkit-transform: scale(1.3);
	transform: scale(1.3);
}

.play-icon {
	opacity: 0;
	position: absolute;
	z-index: 2;
	// top: 50%;
	// left: 50%;
	// // width: 50px;
	// // height: 50px;
	margin: -25px 0 0 -25px;
	// background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAD2klEQVR42tyaS0hUURjHZyYJSq0sx0Yhs+lhJamZQYsWGRQELVR6KPSgoI3QsjbVJmpRQ+5qZlMLxdFa1CzaWJmthFDogZnagx6LIAupcSXp9D/xHfg43am595770A9+cOfo/c73n/OYc75zgplMJqDJVoEGUA8qQQUoBvkgCKbAN/ABjIEh0A8+66g8aFNIOTgOWsBmiz5GQA/oAB8tRyKEWKAG3AEzGX02Qz5rrMRktkVKwFVwjLqLarPgBRgG4+ArSNPfCun9DWALqAYho++WWucsva+9RQ6CSYNvchqkwAFQZMJfEb2TIh+qTVKdOfnL5Z8WghsGFaVBDKy02D05EfKVNqgnTjHYElIAeg2cd4NSDQJUhM8eg/p6KRZLQhaDAYPmbnRAgEqjQTceoJhMCRFN2ac4GgZRF0RIolQnt0fZulk2J+qYGATLXRQhEXUOGYyZnIQcVl58A8IeiJCEKQZuLf8TUqb0TfFc4aEI3s3UuMr+JaRLUd7oAxGSZiW2rmxC6sAs+8cOH4mQdLL4Zinmv4SklB+7iA+FRJQfzZQqZLWyAIyZrEDM70GXxMSUheYaUS4XbUfYAm4atJtcRNeBAbAj4Ly1U4wBivkEXzSOGDWXCXayfpsE5Q63Ch8GY7JFxM5uE1PcaWejBlrBKLgAFjnUKl3sWWwLokLIblb4CzzUUJEQcJEEtWbZu9ixB2CGfW4I0R5b2kvwU2OFYiucpPFTr9HvD9rASasNUdNIe+VQVxCTwFNwE5Rq8vmaPVcKIWtZwaiDs42o6yRtgc9pGD881j9jJMwKvrswfRaAS7Svb7Lhh8e6TAhZwgrSAfcsCu5SbmurxXEirTAU8N52UbLutN1+y2epQg+EfAGnwHWT7y1lz1NCyAQrWOGiALHMuEyz5i3KiZkxHuukEPKOFWx0ScQ9UAXOU07YivFY34doOpRW5bCAZ5TobgZvbfriy6qxEA00adXKLKbLRBa+jX7dn2jwJ8ZHDfv8XAh5zArywB7N4+AaWA/iFsZBNtsLFrDP/bqX8dzug3UuLOPH+caKL4v32VwPjZCP/RrGgZGVkn9pt/nGqkLZ6l6x0CIToA3kebHV1ZV8KAHFfkg+CLbNgXRQRy7pIL8n6JpyTdDNq5RpgBLEcz6JLYn76FhhUIklMR8OevrMHvTI80O/Hb3l6z4MTTp4GNqt+zCUd7OEh8fTCR3H015fGDjk5BWOGDjq8BUOkX8+49QVDk6tg5dqat24VJPtmlOrsvU0mzFM2r3mZFeIKkrsx7dT95EXzwpkyoZdPBPdbpCSc590VP5bgAEAvBj+kV8YyWQAAAAASUVORK5CYII=)
	//   no-repeat;
	-webkit-transform: scale(2);
	transform: scale(2);
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	-webkit-transition: all 0.25s ease-out;
	transition: all 0.25s ease-out;
}
</style>
