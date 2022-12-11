<template>
	<div :style="style" ref="artRef"></div>
</template>
<script setup>
import {
	ref,
	onMounted,
	nextTick,
	onBeforeUnmount,
	onUnmounted,
	computed,
	defineAsyncComponent,
	getCurrentInstance,
	watchEffect,
	toRefs,
	toRef,
	toRaw,
} from "vue";

import Artplayer from "artplayer";
import { useQuasar, getCssVar, format, QIcon, QChip } from "quasar";
import * as globalFunction from "boot/utils";
import { Storage } from "boot/class";
import VideoPlayerHeader from "components/video-player/VideoPlayerHeader.vue";
import ComponentSVG from "components/svg/ComponentSVG.vue";

//#region Khởi tạo biến
const BottomSheet = defineAsyncComponent(() =>
	import("components/video-player/BottomSheet.vue")
);

const { appContext } = getCurrentInstance();
const $q = useQuasar();
const { capitalize } = format;
const utils = Artplayer.utils;

const artRef = ref(null);
const instance = ref(null);
const emit = defineEmits(["get-instance", ""]);
const props = defineProps({
	option: {
		type: Object,
		required: true,
	},
	hasLayer: {
		type: Boolean,
		default: true,
	},
	roomMode: {
		type: Boolean,
		default: false,
	},
	viewers: {
		type: Number,
		default: 0,
	},
	style: Object,
});

// const option = extend(true,{}, props.option);
const option = computed(() => {
	return props.option;
});
//#endregion

//#region Cài đặt khi ở mobile
const defaultSetting = ref({
	playbackRate: 1,
	aspectRatio: "default",
	flip: "normal",
	quality: (() => {
		return option.value.qualityCustom?.find((val) => val.default === true)
			?.name;
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
			children: option.value.qualityCustom,
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
		let storageObj = {
			html: value.selected.label,
			value: value.selected.value,
		};
		defaultSetting.value[value.option.name] = value.selected.name;
		if (value.option.name === "quality") {
			storageObj.html = value.selected.html;
			storageObj.url = value.selected.url;
			instance.value.switchQuality(
				value.selected.url,
				value.selected.html
			);
		} else {
			instance.value[value.option.name] = value.selected.value;
		}
		instance.value.storage.set(value.option.name, storageObj);
	}
};

globalFunction.addDefaultForDeep(
	settingMobile.value,
	"children",
	"name",
	defaultSetting.value
);

let VNodeBottomSheet = null;
// watchEffect(
// () => {
// 	if (instance.value) {
// 		console.log(instance.value.fullscreenWeb);
// 		// VNodeBottomSheet?.destroy();
// 		// VNodeBottomSheet = globalFunction.renderComponent({
// 		// 	el: instance.value.query(".art-control-setting"),
// 		// 	component: $q.screen.lt.sm ? BottomSheet : null,
// 		// 	props: {
// 		// 		treeData: settingMobile.value,
// 		// 		onSelected(event) {
// 		// 			selectSettingMobile(event);
// 		// 		},
// 		// 	},
// 		// 	appContext,
// 		// });
// 	}
// },
// {
// 	flush: "post",
// }
// );

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

//#region Local storage
const setStorageQuality = (playerDOM) => {
	if (
		playerDOM.storage.get("quality") &&
		playerDOM.storage.get("quality").url
	) {
		playerDOM
			.switchQuality(
				playerDOM.storage.get("quality").url,
				playerDOM.storage.get("quality").html
			)
			.then(() => {
				setStorageValue(playerDOM);
			});
	} else {
		setStorageValue(playerDOM);
	}
};

let appendOne = true;
const setStorageValue = (playerDOM) => {
	Object.keys(defaultSetting.value).forEach((key, index) => {
		// GET
		if (playerDOM.storage.get(key)) {
			if (key !== "quality") {
				playerDOM[key] = playerDOM.storage.get(key).value;
			}
			playerDOM.notice.show = "";
			playerDOM.setting.option[index].$tooltip.innerHTML = capitalize(
				playerDOM.storage.get(key)?.html.toString()
					? playerDOM.storage.get(key).html?.toString()
					: ""
			);
			// Sync mobile and web setting
			defaultSetting.value[key] = playerDOM.storage.get(key).value;
		}

		if (appendOne) {
			// if (key !== "quality") {
			// 	instance.value.setting.option[index].onSelect = (
			// 		item,
			// 		$dom,
			// 		event
			// 	) => {
			// 		const instance = Artplayer.instances.find((ins) =>
			// 			globalFunction.includeFromEvent(
			// 				event,
			// 				ins.template.$player
			// 			)
			// 		);
			// 		instance[key] = item.value;
			// 		return item.html;
			// 	};
			// }
			instance.value.setting.option[index].onSelect =
				globalFunction.appendFunction(
					playerDOM.setting.option[index].onSelect,
					(selector) => {
						let storageObj = {
							html: selector.html,
							value: selector.value,
						};
						if (selector.url) {
							storageObj.url = selector.url;
						}
						playerDOM.storage.set(key, storageObj);
					}
				);
		}
	});
	appendOne = false;
};
//#endregion

onMounted(() => {
	instance.value = new Artplayer(
		{
			...option.value,
			url: option.value.qualityCustom?.find((q) => q.default === true)
				.url,
			pip: true,
			muted: true,
			// autoplay: true,
			theme: getCssVar("positive"),
			// autoSize: true,
			// autoMini: true,
			flip: true,
			playbackRate: true,
			aspectRatio: true,
			setting: true,
			hotkey: true,
			fullscreen: true,
			fullscreenWeb: props.roomMode,
			miniProgressBar: true,
			playsInline: true,
			whitelist: ["*"],
			icons: {
				loading:
					'<img src="https://artplayer.org/assets/img/ploading.gif">',
				state: "",
			},
			lock: true,
			fastForward: true,
			autoOrientation: true,
			autoPlayback: !option.value.isLive,
			moreVideoAttr: {
				crossOrigin: "anonymous",
			},
			settings: [
				{
					html: "Select Quality",
					width: 200,
					tooltip: "Auto",
					selector: option.value.qualityCustom,
					onSelect(item, $dom, event) {
						// const instance = Artplayer.instances.find((ins) =>
						// 	globalFunction.includeFromEvent(
						// 		event,
						// 		ins.template.$player
						// 	)
						// );
						instance.value
							.switchQuality(item.url, item.html)
							.then(() => {
								setStorageValue(instance.value);
							});
						return item.html;
					},
				},
			],
			controls: [
				{
					name: "quality",
					disable: option.value.qualityCustom.length === 0,
					position: "right",
					index: 10,
					html: (() => {
						const qualityDefault =
							option.value.qualityCustom.find(
								(item) => item.default
							) || option.value.qualityCustom[0];
						return qualityDefault ? qualityDefault.html : "";
					})(),
					selector: option.value.qualityCustom,
					onSelect(item) {
						console.log(instance.value);
						instance.value
							.switchQuality(item.url, item.html)
							.then(() => {
								setStorageValue(instance.value);
							});
						let storageObj = {
							html: item.html,
							value: item.value,
							url: item.url,
						};
						instance.value.storage.set("quality", storageObj);
					},
				},
			],
			container: artRef.value,
		},
		() => {
			let array = Object.getOwnPropertyNames(Element);
			fixPlayer(instance.value);
			customPlayer(instance.value);
			screenSizeHandle(instance.value);
			hasLayerHandel(instance.value);
			mountBottomSheet(instance.value);
			showBtnPauseState(instance.value);
			setStorageQuality(instance.value);
		}
	);

	nextTick(() => {
		emit("get-instance", instance.value);
		console.log("artplayer: ", instance.value);
		// console.clear();
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
	const fullscreen = playerDOM.query(".art-control-fullscreen");
	fullscreen.classList.add("hint--top-left");

	//Fix hiển thị nút play
	playerDOM.on("video:seeked", () => {
		if (!playerDOM.playing) {
			playerDOM.mask.show = true;
		}
	});

	// Fix quality luôn select instance cuối
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

	if (!option.value.isLive) {
		// Thêm hoạt ảnh cho phẩn progress bả
		if (!playerDOM.loading.show) {
			progressLoading.classList.add("art-progress-highlight--loading");
			setTimeout(() => {
				progressLoading.classList.remove(
					"art-progress-highlight--loading"
				);
			}, 500);
		}
		playerDOM.on("video:seeking", () => {
			if (playerDOM.loading.show) {
				progressLoading.classList.add(
					"art-progress-highlight--loading"
				);
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
	}

	// Remove context
	if (!$q.platform.is.mobile) {
		globalFunction.remove(playerDOM.contextmenu.aspectRatio);
		globalFunction.remove(playerDOM.contextmenu.flip);
		globalFunction.remove(playerDOM.contextmenu.playbackRate);
	}

	// Event fullscreenWeb click

	// playerDOM.proxy(playerDOM.controls.fullscreenWeb, "click", (event) => {

	// 	fullscreenWeb.value = playerDOM.fullscreenWeb;
	// });
};

const fullscreenWeb = ref(false);

// Pause và replay
const iconName = ref("play_circle_outline");
const pauseDisplay = ref(false);
let vNodePause = null;
let vNodeState = null;
const showBtnPauseState = (playerDOM) => {
	// Play

	watchEffect(() => {
		const iconState = playerDOM.query(".art-icon-state");
		vNodeState?.destroy();
		vNodeState = globalFunction.renderComponent({
			el: iconState,
			component: QIcon,
			props: {
				name: iconName.value,
				size: "60px",
				class: ["cursor-pointer", "art-icon", "art-icon-state"],
			},
			appContext,
		});
		// globalFunction.replaceElement(vNodeState.vNode.el, iconState);
	});

	// Pause
	const layerPause = {
		index: 2,
		name: "pausePlayer",
		html: "",
		disable: false,
		click: function () {
			playerDOM.pause();
		},
		mounted: function (pausePlayer) {
			pausePlayer.classList.add("absolute-center");
			vNodePause?.destroy();
			vNodePause = globalFunction.renderComponent({
				el: pausePlayer,
				component: QIcon,
				props: {
					name: "pause_circle_outline",
					size: "60px",
					class: ["art-layer-pause", "cursor-pointer"],
				},
				appContext,
				condition: pauseDisplay,
			});
		},
	};

	playerDOM.layers.add(layerPause);

	playerDOM.on("video:seeked", () => {
		if (!playerDOM.playing) {
			iconName.value = "play_circle_outline";
		}
	});
	playerDOM.on("video:pause", () => {
		pauseDisplay.value = false;
		iconName.value = "play_circle_outline";
	});
	playerDOM.on("video:playing", () => {
		pauseDisplay.value = true;
	});
	playerDOM.on("video:ended", () => {
		iconName.value = "replay";
	});
};
//#endregion

//#region Phần layer top và bottom và state
const layerHeader = {
	index: 1,
	name: "headerPlayer",
	disable: false,
	style: {
		"background-image": "linear-gradient(#000,#0006,#0000)",
		"background-position": "bottom",
		"background-repeat": "repeat-x",
	},
};

const layerLive = {
	index: 1,
	name: "live",
	disable: false,
	html: "",
};

const layerHeaderDisplay = ref(false);
const layerLiveDisplay = ref(true);
let vNodeLayerHeader = null;
let vNodeLayerLive = null;
const hasLayerHandel = (playerDOM) => {
	if (props.hasLayer) {
		// Header Layer
		playerDOM.layers.add({
			...layerHeader,
			html: "",
		});
		const layerHeaders = playerDOM.query(".art-layer-headerPlayer");

		vNodeLayerHeader?.destroy();
		vNodeLayerHeader = globalFunction.renderComponent({
			el: layerHeaders,
			component: VideoPlayerHeader,
			props: {
				viewers: toRef(props, "viewers"),
				class: ["art-layer-header"],
			},
			appContext,
			condition: layerHeaderDisplay,
		});
		// Live layer

		playerDOM.layers.add(layerLive);
		const live = playerDOM.query(".art-layer-live");
		live.classList.add("q-item", "absolute-top-right");
		vNodeLayerLive?.destroy();
		vNodeLayerLive = globalFunction.renderComponent({
			el: live,
			component: QChip,
			props: {
				size: "0.7rem",
				color: "red",
				square: true,
				"text-color": "white",
				class: ["text-bold", "chip-live"],
			},
			slots: { default: () => "TRỰC TIẾP" },
			appContext,
			condition: layerLiveDisplay,
		});
		playerDOM.on("fullscreen", (value) => {
			if (value) {
				layerHeaderDisplay.value = true;
				layerLiveDisplay.value = false;
			} else {
				layerHeaderDisplay.value = false;
				layerLiveDisplay.value = true;
			}
		});
		playerDOM.on("fullscreenWeb", (value) => {
			if (value) {
				layerHeaderDisplay.value = true;
				layerLiveDisplay.value = false;
			} else {
				layerHeaderDisplay.value = false;
				layerLiveDisplay.value = true;
			}
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
	} else {
		instance.value.destroy();
	}
});

onUnmounted(() => {
	// console.info((Artplayer.instances = null));
	// instance.value.destroy();
});

// =================================================================================== TEST=====================================//

const testContainer = ref(null);
const testBtn = ref(null);
const result = ref(null);
const insert = async () => {
	// viewers.value += 1;
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
	font-family: inherit;
	font-size: 1rem;
	.art-layer-pause:hover {
		color: $positive;
	}
	.art-layer-header,
	.art-layer-pause,
	.art-layer-live {
		opacity: 0;
		visibility: hidden;
		transition: all 0.2s ease-in-out;
	}
	&.art-control-show {
		.art-layer-header,
		.art-layer-pause,
		.art-layer-live {
			opacity: 1;
			visibility: visible;
		}
	}
	&.art-loading-show {
		.art-layer-pause {
			display: none;
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
	.art-notice {
		font-size: inherit;
	}
	.art-layers {
		z-index: 65 !important;
		.art-layer-autoPlayback {
			z-index: inherit;
			.art-autoPlayback-jump {
				color: $positive;
			}
			.art-autoPlayback-close svg {
				fill: $positive;
			}
		}
	}
	.art-bottom {
		z-index: 66px;
		padding-top: 45px;
	}
	.art-control-thumbnails {
		border-radius: $generic-border-radius;
		outline: 3px solid $positive;
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
		&:hover {
			color: $positive !important;
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
