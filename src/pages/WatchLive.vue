<template>
	<q-page class="no-scroll row">
		<div class="live-wrapper col">
			<q-scroll-area
				:thumb-style="{ width: '3px' }"
				:content-style="{ width: '100%' }"
				:content-active-style="{ width: '100%' }"
				class="fit"
			>
				<q-layout>
					<div class="bg-positive video-container">
						<q-responsive class="video-container" :ratio="16 / 9">
							<!-- <video
								controls
								src="https://www.w3schools.com/tags/movie.ogg"
							></video> -->
							<VideoArtPlayer
								:option="video.option"
								:style="style"
								:hasLayer="true"
								:roomMode="true"
								:viewers="video.viewers"
								@get-instance="getInstance"
							/>
						</q-responsive>
					</div>

					<div class="live-info-wrapper q-pa-none">
						<LiveInfo ref="liveInfo" />
					</div>

					<q-page-scroller
						position="bottom-right"
						:scroll-offset="300"
						:offset="[18, 18]"
					>
						<q-btn fab icon="keyboard_arrow_up" color="positive" />
					</q-page-scroller>
				</q-layout>
			</q-scroll-area>
		</div>
		<q-separator v-if="!collapseChat" vertical />
		<div id="chat-room-wrapper" class="relative-position col-auto">
			<ChatRoom ref="chat" :width="380" />
		</div>
		<q-resize-observer @resize="onResize" />
	</q-page>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, watchEffect, onUnmounted } from "vue";
// import ChatRoom from "components/chat/ChatRoom.vue";
// import LiveInfo from "components/live-info/LiveInfo.vue";
// import VideoArtPlayer from "components/video-player/VideoArtPlayer.vue";
import { useQuasar, debounce } from "quasar";
import Hls from "hls.js";

const ChatRoom = defineAsyncComponent(
	() => import("components/chat/ChatRoom.vue")
);
const LiveInfo = defineAsyncComponent(
	() => import("components/live-info/LiveInfo.vue")
);
const VideoArtPlayer = defineAsyncComponent(
	() => import("components/video-player/VideoArtPlayer.vue")
);

const emit = defineEmits(["layoutToggle"]);
const chat = ref<InstanceType<typeof ChatRoom> | null>(null);
const liveInfo = ref<InstanceType<typeof LiveInfo> | null>(null);

const collapseChat = ref(false);
const $q = useQuasar();
watchEffect(() => {
	if (chat.value && liveInfo.value) {
		collapseChat.value = chat.value.collapseChat;
		liveInfo.value.collapseChat = chat.value.collapseChat;
	}
});
const video = ref({
	viewers: 99999,
	option: {
		poster: "https://artplayer.org/assets/sample/poster.jpg",
		title: "My title",
		isLive: false,

		qualityCustom: [
			{
				default: true,
				name: "auto",
				value: "auto",
				html: "Auto",
				label: "Auto",
				url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
			},

			{
				name: "1080",
				value: "1080",
				html: "FHD 1080",
				label: "FHD 1080",
				url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
			},
			{
				name: "720",
				value: "720",
				html: "HD 720",
				label: "HD 720",
				url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
			},
			{
				name: "480",
				value: "480",
				html: "SD 480",
				label: "SD 480",
				url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
			},
			{
				name: "360",
				value: "360",
				html: "SD 360",
				label: "SD 360",
				url: "http://localhost:5080/LiveApp/streams/260109087413472613097364.mp4",
			},
		],

		customType: {
			m3u8: function (video: any, url: any) {
				if (Hls.isSupported()) {
					const hls = new Hls();
					hls.loadSource(url);
					hls.attachMedia(video);
				} else {
					const canPlay = video.canPlayType(
						"application/vnd.apple.mpegurl"
					);
					if (canPlay === "probably" || canPlay === "maybe") {
						video.src = url;
					} else {
						console.log("Does not support playback of m3u8");
					}
				}
			},
		},
	},
});
const style = ref({
	width: "100%",
	height: "100%",
});

const getInstance = (art: any) => {
	art.proxy(art.controls.fullscreenWeb, "click", () => {
		emit("layoutToggle", !art.fullscreenWeb);
	});
};
onUnmounted(() => {
	emit("layoutToggle", true);
});
const onResize = debounce(() => {
	if ($q.screen.lt.md && chat.value) {
		chat.value.collapseChat = true;
	}
}, 300);
</script>

<style lang="scss" scoped>
.live-wrapper {
	// width: calc(100% - 380px);
	.video-container {
		max-height: calc(100vh - 190px);
		min-height: 0;
		video {
			object-fit: cover;
			background: no-repeat center center;
		}
	}
	.q-scrollarea__content {
		width: 100%;
	}
}
</style>
