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
								:option="option"
								:style="style"
								:hasLayer="true"
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
		<div class="relative-position col-auto">
			<ChatRoom ref="chat" width="380px" />
		</div>
		<q-resize-observer @resize="onResize" />
	</q-page>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import ChatRoom from "components/chat/ChatRoom.vue";
import LiveInfo from "components/live-info/LiveInfo.vue";
import VideoArtPlayer from "components/video-player/VideoArtPlayer.vue";
import { useQuasar, debounce } from "quasar";
export default defineComponent({
	name: "WatchLive",
	components: { ChatRoom, LiveInfo, VideoArtPlayer },
	setup() {
		const chat = ref(null);
		const liveInfo = ref(null);

		const collapseChat = ref(false);
		const $q = useQuasar();
		watchEffect(() => {
			if (chat.value && liveInfo.value) {
				collapseChat.value = chat.value.collapseChat;
				liveInfo.value.collapseChat = chat.value.collapseChat;
			}
		});
		const option = ref({
			url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
			poster: "https://artplayer.org/assets/sample/poster.jpg",
			title: "My title",

			thumbnails: {
				url: "https://artplayer.org/assets/sample/thumbnails.png",
				number: 60,
				column: 10,
			},

			quality: [
				{
					default: true,
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
		});
		const style = ref({
			width: "100%",
			height: "100%",
		});

		return {
			chat,
			liveInfo,
			collapseChat,
			onResize: debounce(() => {
				if ($q.screen.lt.md) {
					chat.value.collapseChat = true;
				}
			}, 300),
			option,
			style,
		};
	},
});
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
