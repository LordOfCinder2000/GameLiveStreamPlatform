<template>
	<div class="root">
		<div :style="style" ref="artRef"></div>
		<!-- <BottomSheet
			ref="bs"
			:treeData="settingMobile"
			@selected="selectSettingMobile"
			v-if="$q.screen.lt.sm"
		/> -->

		<VideoPlayerHeader :viewers="2332" class="art-layer-header" />

		<!-- Test render vnode -->
		<q-btn
			ref="testBtn"
			class="test-btn"
			color="primary"
			label="OK"
			@click="insert"
		/>

		<div
			class="test-container"
			style="width: 200px; height: 50px; background-color: red"
			ref="testContainer"
		></div>
	</div>
</template>
<script setup>
import {
	ref,
	onMounted,
	nextTick,
	onBeforeUnmount,
	computed,
	defineAsyncComponent,
	getCurrentInstance,
	watchEffect,
	toRefs,
} from "vue";

import Artplayer from "artplayer";
import { useQuasar, getCssVar } from "quasar";
import * as globalFunction from "boot/utils";
// import VideoPlayerHeader from "components/video-player/VideoPlayerHeader.vue";

//#region Khởi tạo biến
const BottomSheet = defineAsyncComponent(() =>
	import("components/video-player/BottomSheet.vue")
);
const VideoPlayerHeader = defineAsyncComponent(() =>
	import("components/video-player/VideoPlayerHeader.vue")
);

const { appContext } = getCurrentInstance();
const $q = useQuasar();
const utils = Artplayer.utils;

const artRef = ref(null);
const instance = ref(null);
const emit = defineEmits(["get-instance"]);
const props = defineProps({
	option: {
		type: Object,
		required: true,
	},
	hasLayer: {
		type: Boolean,
		default: true,
	},
	headerOption: {
		type: Object,
	},
	style: Object,
});

// const option = extend(true,{}, props.option);
const option = computed(() => {
	return props.option;
});
//#endregion

//#region Cài đặt khi ở mobile
const defaultMobileSetting = ref({
	playbackRate: 1,
	aspectRatio: "default",
	flip: "normal",
	quality: (() => {
		return props.option.quality.find((val) => val.default === true).name;
	})(),
});
const settingMobile = ref({
	title: "Setting",
	name: "root",
	// target: ".art-control-setting",
	root: true,
	children: [
		{
			title: "Quality",
			name: "quality",
			label: "Quality",
			iconBack: "arrow_back",
			icon: "hd",
			children: props.option.quality,
		},
		{
			title: "Play speed",
			name: "playbackRate",
			label: "Play speed",
			icon: "slow_motion_video",
			iconBack: "arrow_back",
			children: [
				{
					name: "0.5",
					label: "0.5",
					value: 0.5,
				},
				{
					name: "0.75",
					label: "0.75",
					value: 0.75,
				},
				{
					name: "1",
					label: "Normal",
					value: 1,
				},
				{
					name: "1.25",
					label: "1.25",
					value: 1.25,
				},
				{
					name: "1.5",
					label: "1.5",
					value: 1.5,
				},
				{
					name: "2",
					label: "2",
					value: 2,
				},
			],
		},
		{
			title: "Aspect ratio",
			name: "aspectRatio",
			label: "Aspect ratio",
			icon: "aspect_ratio",
			iconBack: "arrow_back",
			children: [
				{
					name: "default",
					label: "Default",
					value: "default",
				},
				{
					name: "4:3",
					label: "4:3",
					value: "4:3",
				},
				{
					name: "16:9",
					label: "16:9",
					value: "16:9",
				},
			],
		},
		{
			title: "Video flip",
			name: "flip",
			label: "Video flip",
			icon: "flip",
			iconBack: "arrow_back",
			children: [
				{
					name: "normal",
					label: "Normal",
					value: "normal",
				},
				{
					name: "horizontal",
					label: "Horizontal",
					value: "horizontal",
				},
				{
					name: "vertical",
					label: "Vertical",
					value: "vertical",
				},
			],
		},
	],
});
const selectSettingMobile = (value) => {
	if (!value.option.root) {
		defaultMobileSetting.value[value.option.name] = value.selected.name;
		if (value.option.name === "quality") {
			instance.value.switchQuality(
				value.selected.url,
				value.selected.html
			);
			return;
		}
		instance.value[value.option.name] = value.selected.value;
	}
};
globalFunction.addDefaultForDeep(
	settingMobile.value,
	"children",
	"name",
	defaultMobileSetting.value
);

let VNodeBottomSheet = null;
watchEffect(
	() => {
		// if (instance.value) {
		// 	VNodeBottomSheet?.destroy();
		// 	VNodeBottomSheet = globalFunction.renderComponent({
		// 		el: instance.value.query(".art-control-setting"),
		// 		component: $q.screen.lt.sm ? BottomSheet : null,
		// 		props: {
		// 			treeData: settingMobile.value,
		// 			onSelected(event) {
		// 				selectSettingMobile(event);
		// 			},
		// 		},
		// 		appContext,
		// 	});
		// }
	},
	{
		flush: "post",
	}
);

const mountBottomSheet = (playerDOM) => {
	const settingControl = playerDOM.query(".art-control-setting");
	VNodeBottomSheet?.destroy();
	VNodeBottomSheet = globalFunction.renderComponent({
		el: settingControl,
		component: BottomSheet,
		props: {
			treeData: settingMobile.value,
			onSelected(event) {
				selectSettingMobile(event);
			},
		},
		appContext,
		condition: toRefs($q.screen.lt).sm,
	});
};
//#endregion

onMounted(() => {
	instance.value = new Artplayer(
		{
			...option.value,
			pip: true,
			muted: true,
			theme: getCssVar("positive"),
			autoSize: true,
			// autoMini: true,
			flip: true,
			playbackRate: true,
			aspectRatio: true,
			setting: true,
			hotkey: true,
			fullscreen: true,
			fullscreenWeb: true,
			miniProgressBar: true,
			playsInline: true,
			whitelist: ["*"],
			icons: {
				loading:
					'<img src="https://artplayer.org/assets/img/ploading.gif">',
			},
			lock: true,
			fastForward: true,
			autoOrientation: true,
			autoPlayback: true,
			moreVideoAttr: {
				crossOrigin: "anonymous",
			},
			container: artRef.value,
		},
		() => {
			let array = Object.getOwnPropertyNames(Element);
			fixPlayer(instance.value);
			customPlayer(instance.value);
			screenSizeHandle(instance.value);
			hasLayerHandel(instance.value);
			mountBottomSheet(instance.value);
		}
	);

	nextTick(() => {
		emit("get-instance", instance.value);
	});
});

//#region Hiệu chỉnh player
const screenSizeHandle = (playerDOM) => {
	/** Xử lý hiển thị trên các size màn hình */
	const pip = playerDOM.query(".art-control-pip");
	const settingPanel = playerDOM.query(".art-settings");
	const settingControl = playerDOM.query(".art-control-setting");

	const qualitySelector = playerDOM.query(
		".art-control-quality .art-selector-list"
	);
	if ($q.platform.is.mobile) {
		// Xoá Pip, quality, setting panel
		globalFunction.addClassToMany(
			[pip, qualitySelector, settingPanel, qualitySelector.parentNode],
			"hidden"
		);
	}
	globalFunction.addClassToMany(
		[pip, qualitySelector, settingPanel, qualitySelector.parentNode],
		"gt-xs"
	);
};

const getPosFromEvent = (art, event) => {
	const { $progress } = art.template;
	const { left } = $progress.getBoundingClientRect();
	const eventLeft = event.pageX;
	const width = utils.clamp(eventLeft - left, 0, $progress.clientWidth);
	const second = (width / $progress.clientWidth) * art.duration;
	const time = utils.secondToTime(second);
	const percentage = utils.clamp(width / $progress.clientWidth, 0, 1);
	return { second, time, width, percentage };
};

const setBar = (played, indicator, percentage) => {
	const indicatorSize = indicator.clientWidth;

	utils.setStyle(played, "width", `${percentage * 100}%`);
	utils.setStyle(
		indicator,
		"left",
		`calc(${percentage * 100}% - ${indicatorSize / 2}px)`
	);
};

const fixPlayer = (playerDOM) => {
	// Fix lỗi kéo thanh progress
	let isDragging = false;
	const progress = playerDOM.template.$progress;

	const played = playerDOM.query(".art-progress-played");
	const indicator = playerDOM.query(".art-progress-indicator");

	playerDOM.proxy(progress, "pointerdown", (event) => {
		const { second, percentage } = getPosFromEvent(playerDOM, event);
		setBar(played, indicator, percentage);
		playerDOM.seek = second;
		isDragging = true;
	});

	playerDOM.proxy(document, "mousemove", (event) => {
		if (isDragging) {
			const { second, percentage } = getPosFromEvent(playerDOM, event);
			setBar(played, indicator, percentage);
			playerDOM.seek = second;

			event.stopPropagation();
		}
	});
	playerDOM.proxy(document, "mouseup", (event) => {
		if (isDragging) {
			isDragging = false;
		}
	});

	//Fix Tooltip cho fullscreen
	const fullscreen = instance.value.query(".art-control-fullscreen");
	fullscreen.classList.add("hint--top-left");
};

const customPlayer = (playerDOM) => {
	// Thêm tooltip cho unmute
	const muted = playerDOM.query(".art-icon-volumeClose");
	utils.tooltip(muted, "Unmuted", "top");

	// Thêm hoạt ảnh xoay cho setting
	const setting = playerDOM.query(".art-control-setting");
	const iconSetting = playerDOM.query(".art-icon-setting");
	playerDOM.proxy(setting, "click", () => {
		if (playerDOM.setting.show) {
			iconSetting.classList.add("art-icon-setting--active");
		} else {
			iconSetting.classList.remove("art-icon-setting--active");
		}
	});
	const progressLoading = playerDOM.query(".art-progress-highlight ");

	// Thêm hoạt ảnh cho phẩn progress bả
	if (!playerDOM.loading.show) {
		progressLoading.classList.add("art-progress-highlight--loading");
		setTimeout(() => {
			progressLoading.classList.remove("art-progress-highlight--loading");
		}, 500);
	}
	playerDOM.on("video:seeking", () => {
		if (playerDOM.loading.show) {
			progressLoading.classList.add("art-progress-highlight--loading");
		}
	});
	playerDOM.on("video:seeked", () => {
		if (!playerDOM.loading.show) {
			setTimeout(() => {
				progressLoading.classList.remove(
					"art-progress-highlight--loading"
				);
			}, 500);
		}
	});
};
//#endregion

//#region Phần layer top và bottom
const layerHeader = {
	index: 1,
	name: "headers",
	disable: false,
	style: {
		height: "55px",
		"background-image": "linear-gradient(#000,#0006,#0000)",
		"background-position": "bottom",
		"background-repeat": "repeat-x",
	},

	mounted: function (...args) {
		// console.info("Component mount completion");
	},
};

const viewers = ref(1000);
let vNodeLayerHeader = null;
const hasLayerHandel = (playerDOM) => {
	vNodeLayerHeader?.destroy();
	vNodeLayerHeader = globalFunction.renderComponent({
		el: document.createDocumentFragment(),
		component: VideoPlayerHeader,
		props: {
			viewers: viewers.value,
			class: ["art-layer-header"],
		},
		appContext,
	});
	if (props.hasLayer) {
		playerDOM.layers.add({
			...layerHeader,
			html: vNodeLayerHeader.vNode.el,
		});
		// layerBottomHandel(playerDOM);
	}
};

const layerBottomHandel = (playerDOM) => {
	const controls = playerDOM.query(".art-bottom");
	const control = playerDOM.query(".art-controls");
	const settingPanel = playerDOM.query(".art-settings");
	utils.setStyle(controls, "padding-top", "0");
	utils.setStyle(control, "margin-bottom", `${control.clientHeight}px`);
	utils.setStyle(settingPanel, "bottom", `${controls.clientHeight - 5}px`);
	// const temp = document.createElement("div");
	// temp.classList.add("art-controls");
	// utils.append(bottomInfo, temp);
};
//#endregion

onBeforeUnmount(() => {
	if (instance.value && instance.value.destroy) {
		instance.value.destroy(false);
	}
});

// =================================================================================== TEST=====================================//

const testContainer = ref(null);
const testBtn = ref(null);
const result = ref(null);
const insert = async () => {
	viewers.value += 1;

	// const bottomLayer = instance.value.query(".art-bottom");
	// const videoPlayer = instance.value.query(".art-video-player");
	// const testContainer = document.querySelector(".test-container");
	// // // Mỗi lần ấn là render mới
	// result.value?.destroy();
	// result.value = globalFunction.renderComponent({
	// 	el: testContainer,
	// 	component: await VideoPlayerHeader,
	// 	props: {
	// 		class: ["absolute-bottom", "art-layer-header"],
	// 		style: {},
	// 		treeData: settingMobile.value,
	// 		onSelected(event) {
	// 			selectSettingMobile(event);
	// 		},
	// 	},
	// 	appContext,
	// });
};
</script>

<style lang="scss">
.art-video-player {
	.art-layer-header {
		opacity: 0;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
	}
	&.art-control-show {
		.art-layer-header {
			opacity: 1;
			visibility: visible;
		}
	}
	.art-video {
		cursor: default;
	}

	.art-mask {
		background: rgba(0, 0, 0, 0.5);
		.art-state {
			bottom: unset;
			right: unset;
		}
	}
	.art-layers {
		z-index: 65 !important;
	}
	.art-bottom {
		padding-top: 45px;
	}
	.art-control-thumbnails {
		border-radius: $generic-border-radius;
		border: 2px solid $positive !important;
	}
	.art-control-progress {
		.art-control-progress-inner {
			margin-top: 10px !important;
			border-radius: 9999px;
			.art-progress-loaded,
			.art-progress-played {
				border-radius: inherit;
			}

			.art-progress-tip {
				font-size: 0.8rem !important;
			}
		}
	}
	.art-controls {
		.art-control {
			font-size: 0.7rem !important;
			padding-top: 2px !important;
			.art-selector-value {
				font-weight: bold;
			}
			.art-icon-setting {
				transform: rotate(-90deg);
				transition: transform 0.5s;
				&--active {
					transform: rotate(90deg);
				}
			}

			.art-volume-panel {
				margin-left: 0.5rem;
			}
			&:hover .art-icon svg {
				fill: $positive;
			}
		}
	}

	.art-progress-highlight {
		&--loading {
			z-index: 19 !important;
			background-color: rgba(255, 255, 255, 0.25);
			animation: plyr-progress 1s linear infinite;
			background-image: linear-gradient(
				-45deg,
				rgba(35, 40, 47, 0.6) 25%,
				transparent 25%,
				transparent 50%,
				rgba(35, 40, 47, 0.6) 50%,
				rgba(35, 40, 47, 0.6) 75%,
				transparent 75%,
				transparent
			);

			background-repeat: repeat-x;
			background-size: 25px 25px;
			color: transparent !important;
		}
	}
	@keyframes plyr-progress {
		to {
			background-position: 25px 0;
		}
	}

	.art-volume-slider-handle,
	.art-volume-slider-handle:before {
		background-color: $positive !important;
	}

	.art-control-quality {
		// margin-right: 1rem;
		.art-selector-value {
			padding: 0.3rem;
			border: 2px solid #fff;
		}

		&:hover .art-selector-value {
			border-color: $positive;
			color: $positive;
		}
	}
	.art-current {
		color: $positive !important;
	}
	.art-selector-item {
		&:hover {
			color: $positive !important;
		}
	}

	.art-icon-state {
		&:hover svg {
			fill: $positive !important;
		}
	}

	.art-settings {
		font-size: 0.85rem !important;
		.art-setting-item-right-tooltip {
			@extend .art-settings;
		}
	}
	[class*="hint--"]:after {
		text-shadow: unset !important;
	}
}

.body--light {
	.hint--top-left:before,
	.hint--top-right:before,
	.hint--top:before {
		border-top-color: white;
	}
	[class*="hint--"]:after {
		color: black;
		background: white;
		font-size: 0.8rem !important;
		line-height: 0.8rem !important;
	}
}
</style>
