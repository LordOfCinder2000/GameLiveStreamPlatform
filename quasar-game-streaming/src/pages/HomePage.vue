<template>
	<q-page padding>
		<div class="carousel-wrapper fit">
			<Carousel3dContent
				:width="530"
				:perspective="1"
				:border="0"
				:height="300"
				:inverseScaling="50"
				:controlsVisible="true"
				class="no-margin"
			>
				<Carousel3dSlide
					v-for="(slide, i) in slides.slice(0, 5)"
					:index="i"
					:key="'slide' + i"
				>
					<template
						v-slot="{ index, isCurrent, leftIndex, rightIndex }"
					>
						<video
							class="video-container fit"
							muted
							:poster="slide.thumb"
							:data-index="index"
							:class="{
								current: isCurrent,
								onLeft: leftIndex >= 0,
								onRight: rightIndex >= 0,
							}"
							controls
							:src="slide.sources[0]"
						></video>
					</template>
				</Carousel3dSlide>
			</Carousel3dContent>
		</div>

		<div class="home-wrapper">
			<div class="home-wrapper-games q-mt-md">
				<div class="home-games-title row items-baseline no-wrap">
					<div class="text-h6 ellipsis">
						Danh mục
						<span
							class="text-positive cursor-pointer link-hover q-pb-xs"
						>
							Games
						</span>
					</div>
					<q-space />
					<div class="ellipsis text-hover">
						<div>
							Xem thêm
							<q-icon
								class="text-bold"
								name="arrow_forward_ios"
							/>
						</div>
					</div>
				</div>
				<div class="home-games-content q-mt-sm">
					<div class="no-wrap row q-col-gutter-x-sm items-center">
						<GameCard
							v-for="n in gameColumns"
							:key="n"
							class="col-xs-4 col-sm-2 col-md-1"
						/>
					</div>
				</div>
			</div>
			<q-separator class="q-my-lg" />
			<div class="home-wrapper-pc">
				<div class="home-pc-title row items-baseline no-wrap">
					<div class="text-h6 ellipsis">
						Trực tiếp
						<span
							class="text-positive cursor-pointer link-hover q-pb-xs"
						>
							PC
						</span>
					</div>
					<q-space />
					<div class="ellipsis text-hover">
						<div>
							Xem thêm
							<q-icon
								class="text-bold"
								name="arrow_forward_ios"
							/>
						</div>
					</div>
				</div>
				<div class="home-pc-content q-mt-sm">
					<div class="no-wrap row q-col-gutter-x-sm items-center">
						<VideoCard
							v-for="n in videoColumns"
							:key="n"
							class="col-xs-6 col-sm-4 col-md-3"
						/>
					</div>
				</div>
			</div>

			<!-- <div class="home-wrapper-games">
				<div class="home-games-title row items-center">
					<div class="text-h6">
						Danh mục
						<span
							class="text-positive cursor-pointer link-hover q-pb-xs"
						>
							Games
						</span>
					</div>
					<q-space />
					<div>
						<q-btn
							size="md"
							dense
							outline
							color="positive"
							class="rotate-180"
							icon="arrow_forward_ios"
							@click="$refs.carousel.previous()"
						/>

						<q-btn
							class="on-right"
							size="md"
							dense
							outline
							color="positive"
							icon="arrow_forward_ios"
							@click="$refs.carousel.next()"
						/>
					</div>
				</div>
				<div class="home-games-content">
					<q-carousel
						swipeable
						animated
						v-model="slide"
						keep-alive
						transition-prev="slide-right"
						transition-next="slide-left"
						ref="carousel"
						height="100%"
					>
						<q-carousel-slide
							:name="n"
							class="column no-wrap overflow-hidden q-px-none q-pb-none"
							v-for="n in 6"
							:key="'slide' + n"
						>
							<div class="q-px-sm">
								<div
									class="row no-wrap q-gutter-x-md items-center"
								>
									<div
										v-for="k in 12"
										:key="k"
										class="col-xs-4 col-sm-3 col-md-2"
									>
										<GameCard />
									</div>
								</div>
							</div>
						</q-carousel-slide>
					</q-carousel>
				</div>
			</div> -->
		</div>
	</q-page>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent, watchEffect, toRef } from "vue";
import { Carousel3dContent, Carousel3dSlide } from "components/carousel-3d";
import { useQuasar } from "quasar";
import { getColumnByScreen } from "boot/mixins";
const GameCard = defineAsyncComponent(() =>
	import("components/home/HomeGameCardT.vue")
);
const VideoCard = defineAsyncComponent(() =>
	import("components/VideoCard.vue")
);
const slides = ref([]);
const mediaJSON = ref({
	categories: [
		{
			name: "Movies",
			videos: [
				{
					description:
						"Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
					],
					subtitle: "By Blender Foundation",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
					title: "Big Buck Bunny",
				},
				{
					description: "The first Blender Open Movie from 2006",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
					],
					subtitle: "By Blender Foundation",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
					title: "Elephant Dream",
				},
				{
					description:
						"HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
					],
					subtitle: "By Google",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
					title: "For Bigger Blazes",
				},
				{
					description:
						"Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
					],
					subtitle: "By Google",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
					title: "For Bigger Escape",
				},
				{
					description:
						"Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
					],
					subtitle: "By Google",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
					title: "For Bigger Fun",
				},
				{
					description:
						"Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
					],
					subtitle: "By Google",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
					title: "For Bigger Joyrides",
				},
				{
					description:
						"Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
					],
					subtitle: "By Google",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
					title: "For Bigger Meltdowns",
				},
				{
					description:
						"Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
					],
					subtitle: "By Blender Foundation",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
					title: "Sintel",
				},
				{
					description:
						"Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
					],
					subtitle: "By Garage419",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
					title: "Subaru Outback On Street And Dirt",
				},
				{
					description:
						"Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
					],
					subtitle: "By Blender Foundation",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
					title: "Tears of Steel",
				},
				{
					description:
						"The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
					],
					subtitle: "By Garage419",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
					title: "Volkswagen GTI Review",
				},
				{
					description:
						"The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
					],
					subtitle: "By Garage419",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WeAreGoingOnBullrun.jpg",
					title: "We Are Going On Bullrun",
				},
				{
					description:
						"The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
					sources: [
						"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
					],
					subtitle: "By Garage419",
					thumb: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
					title: "What care can you get for a grand?",
				},
			],
		},
	],
});
slides.value = mediaJSON.value.categories[0].videos;

const slide = ref(1);

const $q = useQuasar();
const gameColumns = getColumnByScreen({
	md: 8,
	sm: 6,
	xs: 3,
});
const videoColumns = getColumnByScreen({
	md: 4,
	sm: 3,
	xs: 2,
});
</script>

<style lang="scss" scoped>
@media (min-width: 1024px) {
	.row > .col-md-1 {
		height: auto;
		width: 12.5%;
	}
}

// .home-wrapper-games {
// 	-ms-overflow-style: none; /* Internet Explorer 10+ */
// 	scrollbar-width: none; /* Firefox */
// }
// .home-wrapper-games::-webkit-scrollbar {
// 	display: none; /* Safari and Chrome */
// }
</style>
