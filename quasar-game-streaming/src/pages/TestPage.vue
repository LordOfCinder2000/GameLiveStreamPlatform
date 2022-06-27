<template>
	<q-page padding>
		<VideoArtPlayer
			v-for="(video, index) in videos"
			:key="index"
			@get-instance="getInstance"
			:style="style"
			:option="video.option"
			:hasLayer="true"
			:viewers="video.viewers"
		/>
	</q-page>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { getCssVar, extend } from "quasar";
import VideoPlayerHeader from "components/video-player/VideoPlayerHeader.vue";
import VideoArtPlayer from "components/video-player/VideoArtPlayer.vue";
import ComponentSVG from "components/svg/ComponentSVG.vue";
import artplayerPluginDanmuku from "artplayer-plugin-danmuku";
import { appendFunction } from "boot/utils";

const img = "https://artplayer.org/assets/sample/layer.png";
const art = ref(null);

const videos = ref([
	{
		viewers: 99999,
		option: {
			poster: "https://artplayer.org/assets/sample/poster.jpg",
			title: "My title",

			// thumbnails: {
			// 	url: "https://artplayer.org/assets/sample/thumbnails.png",
			// 	number: 60,
			// 	column: 10,
			// },

			qualityCustom: [
				{
					default: true,
					name: "auto",
					value: "auto",
					html: "Auto",
					label: "Auto",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
				},

				{
					name: "1080",
					value: "1080",
					html: "FHD 1080",
					label: "FHD 1080",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
				},
				{
					name: "720",
					value: "720",
					html: "HD 720",
					label: "HD 720",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
				},
				{
					name: "480",
					value: "480",
					html: "SD 480",
					label: "SD 480",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
				},
				{
					name: "360",
					value: "360",
					html: "SD 360",
					label: "SD 360",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
				},
			],
		},
	},
]);
const option = ref({
	url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
	poster: "https://artplayer.org/assets/sample/poster.jpg",
	title: "My title",

	thumbnails: {
		url: "https://artplayer.org/assets/sample/thumbnails.png",
		number: 60,
		column: 10,
	},

	qualityCustom: [
		{
			default: true,
			name: "auto",
			html: "Auto",
			label: "Auto",
			url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		},
		{
			name: "1080",
			html: "FHD 1080",
			label: "FHD 1080",
			url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
		},
		{
			name: "720",
			html: "HD 720",
			label: "HD 720",
			url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
		},
		{
			name: "480",
			html: "SD 480",
			label: "SD 480",
			url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		},
		{
			name: "360",
			html: "SD 360",
			label: "SD 360",
			url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
		},
	],
	settings: [
		{
			html: "Select Quality",
			width: 150,
			tooltip: "Auto",
			selector: [
				{
					default: true,
					name: "auto",
					html: "Auto",
					label: "Auto",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
				},
				{
					name: "1080",
					html: "FHD 1080",
					label: "FHD 1080",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
				},
				{
					name: "720",
					html: "HD 720",
					label: "HD 720",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
				},
				{
					name: "480",
					html: "SD 480",
					label: "SD 480",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
				},
				{
					name: "360",
					html: "SD 360",
					label: "SD 360",
					url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
				},
			],
			onSelect: (item, $dom, event) => {
				console.info(item, $dom, event);
				art.value.switchQuality(item.url, item.html);
				// Change the tooltip
				return item.html;
			},
		},
	],

	plugins: [
		// artplayerPluginDanmuku({
		// 	danmuku: [
		// 		{
		// 			text: "666", // Danmu text
		// 			time: 5, // Video time
		// 			color: "#fff", // Danmu color
		// 			border: false, // Danmu border
		// 			mode: 0, // Danmu mode: 0-scroll or 1-static
		// 		},
		// 	],
		// 	// speed: 5,
		// 	// opacity: 1,
		// 	// fontSize: 25,
		// 	// color: "#FFFFFF",
		// 	// mode: 1,
		// 	// margin: [10, "25%"],
		// 	// antiOverlap: true,
		// 	// useWorker: false,
		// 	// synchronousPlayback: false,
		// 	// filter: (danmu) => danmu.text.length < 50,
		// 	// lockTime: 5,
		// 	// maxLength: 100,
		// 	// minWidth: 200,
		// 	// maxWidth: 400,
		// 	// theme: "dark",
		// 	// beforeEmit: (danmu) => !!danmu.text.trim(),
		// 	// mount: document.querySelector(".art-danmuku"),
		// }),
	],
});

// const temp = videos.value;
const temp = extend(true, {}, videos.value);
for (let index = 0; index < 0; index++) {
	videos.value.push(temp[0]);
}

const style = ref({ width: "", height: "200px", margin: "60px auto 0" });
const getInstance = (instance) => {
	art.value = instance;
};
watch(videos, (e) => {
	console.log(e);
});
const onClick = () => {
	videos.value[0].viewers += 1;
	console.log(videos.value[0].viewers);
};

onMounted(() => {
	nextTick(() => {
		console.log(art.value);
		// art.value.setting.option[0].onSelect = function (item, $dom, event, e) {
		// 	console.log(item, $dom, event, e);
		// };
		// 	console.info(art.value.setting.option[0].onSelect);
		// var someFunction = art.value.setting.option[0].onSelect;

		// art.value.plugins.artplayerPluginDanmuku.emit({
		// 	text: "666", // Danmu text
		// 	time: 5, // Video time
		// 	color: "#fff", // Danmu color
		// 	size: 25, // Danmu size
		// 	border: false, // Danmu border
		// 	mode: 0, // Danmu mode: 0-scroll or 1-static
		// });
	});
});
</script>

<style lang="scss"></style>

<!-- <template>
	<div class="flex flex-center">
		<VideoPlayer ref="videoPlayer" :options="options">
			<video controls crossorigin playsinline>
				<source
					size="720"
					:src="testVideo.sources[0]"
					type="video/mp4"
				/>
				<source
					size="1080"
					:src="testVideo.sources[0]"
					type="video/mp4"
				/>
				<track
					default
					kind="captions"
					label="English captions"
					:src="testVideo.sources[0]"
					srclang="en"
				/>
			</video>
		</VideoPlayer>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VideoPlayer from "components/video-player/VideoPlayer.vue";
const testVideo = {
	description: "The first Blender Open Movie from 2006",
	sources: [
		"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
	],
	subtitle: "By Blender Foundation",
	thumb: "https://wallpaperaccess.com/full/655085.jpg",
	title: "Elephant Dream",
};
const videoPlayer = ref(null);
const options = ref({
	disableContextMenu: false,
	tooltips: { controls: true, seek: true },
	displayDuration: true,
	duration: 50,
	displayDuration: true,
	ads: {
		enabled: true,
		publisherId: "",
		tagUrl: "https://www.youtube.com/watch?v=UhQqRJO7-_s",
	},
	previewThumbnails: {
		enabled: true,
		src: "https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
	},
});
onMounted(() => {
	// videoPlayer.value.player.seeking = true;
	console.log(videoPlayer.value.player);
});
</script>

<style lang="scss">
.test {
	color: $positive;
}
body {
	--plyr-color-main: #{$positive};
}
</style> -->
