<template>
	<q-tooltip
		class="c-tooltip rounded-borders"
		:class="[
			`c-tooltip-arrow-${arrowClass}`,
			{ 'c-tooltip-popover': popover },
		]"
	>
		<q-card
			:dark="!$q.dark.isActive"
			flat
			class="c-tooltip-text border-radius-inherit relative-position"
			:class="[{ 'q-qt-md c-tooltip-text-popover text-body1': popover }]"
			:style="{ color: $q.dark.isActive ? 'black' : 'white' }"
		>
			<slot />
		</q-card>
		<!-- <div
      class="absolute visibility-visible"
      :class="`visibility-visible-${arrowClass}`"
    ></div> -->
		<q-card
			:dark="!$q.dark.isActive"
			flat
			square
			class="c-tooltip-arrow absolute"
			:class="{ 'bg-positive': popover }"
		></q-card>
	</q-tooltip>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
	props: {
		arrow: {
			type: String,
			default: "top",
		},
		popover: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, context) {
		const $q = useQuasar();
		const arrowClass = computed(() => {
			let arrowClassCorrected = props.arrow.trim().replace(" ", "-");
			let allClasses = [
				"top",
				"top-right",
				"top-left",
				"bottom",
				"bottom-right",
				"bottom-left",
				"left",
				"left-top",
				"left-bottom",
				"right",
				"right-top",
				"right-bottom",
			];
			if (!allClasses.includes(arrowClassCorrected)) {
				return "top";
			}
			return arrowClassCorrected;
		});

		const tooltip = ref(null);

		const tooltipModel = ref(false);

		const toggle = ref(false);
		onMounted(() => {
			// console.log(tooltip.value.$el);
		});
		return {
			toggle,
			arrowClass,
			// hoverTooltip(e) {
			//   console.log("hover");

			//   toggle.value = true;
			//   tooltipModel.value = true;
			// },
			// leaveTooltip(e) {
			//   toggle.value = true;
			//   setTimeout(() => {
			//     tooltipModel.value = false;
			//     console.log("hide");
			//   }, 1000);
			// },
			// beforeHideTooltip(e) {
			//   console.log("before-hide");
			//   toggle.value = true;
			// },
			tooltip,
			// tooltipModel,
		};
	},
});
</script>

<style lang="scss">
$box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
.q-tooltip--style {
	color: inherit;
}
.c-tooltip {
	box-shadow: $box-shadow;
	overflow: visible;
	background: transparent;
	padding: 0 !important;
	&-popover {
		border-top-color: $positive;
	}
	.visibility-visible {
		z-index: 10;
		transform: none;
		height: 20px;
		width: 100%;
		background-color: transparent;
		&-top,
		&-top-right,
		&-top-left {
			top: -15px;
		}
		&-bottom,
		&-bottom-right,
		&-bottom-left {
			bottom: -15px;
		}
		&-left,
		&-left-top,
		&-left-bottom {
			width: 20px;
			height: 100%;
			top: 0;
			left: -15px;
		}
		&-right,
		&-right-top,
		&-right-bottom {
			width: 20px;
			height: 100%;
			top: 0;
			right: -15px;
		}
	}
	&-text {
		color: inherit;
		z-index: 10;
		padding: 6px;
		&-popover {
			border-top: 3px solid $positive;
		}
	}

	&-arrow {
		z-index: 5;
		box-shadow: $box-shadow;
		width: 20px;
		height: 20px;
		transform: translateX(-50%) rotate(-45deg) skew(-5deg, -5deg);
		// border: 3px solid $positive;

		// top
		[class*="c-tooltip-arrow-top"] & {
			top: 0;
		}

		.c-tooltip-arrow-top & {
			left: 50%;
		}

		.c-tooltip-arrow-top-left & {
			left: 30px;
		}

		.c-tooltip-arrow-top-right & {
			right: 0;
		}

		// bottom
		[class*="c-tooltip-arrow-bottom"] & {
			bottom: 0;
		}

		.c-tooltip-arrow-bottom & {
			left: 50%;
		}

		.c-tooltip-arrow-bottom-left & {
			left: 30px;
		}

		.c-tooltip-arrow-bottom-right & {
			right: 0;
		}

		// left
		[class*="c-tooltip-arrow-left"] & {
			transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
			left: 0;
		}

		.c-tooltip-arrow-left & {
			top: 50%;
		}

		.c-tooltip-arrow-left-top & {
			top: 20px;
		}

		.c-tooltip-arrow-left-bottom & {
			bottom: -10px;
		}

		// left
		[class*="c-tooltip-arrow-right"] & {
			transform: translateY(-50%) rotate(45deg) skew(-20deg, -20deg);
			right: 0;
		}

		.c-tooltip-arrow-right & {
			top: 50%;
		}

		.c-tooltip-arrow-right-top & {
			top: 20px;
		}

		.c-tooltip-arrow-right-bottom & {
			bottom: -10px;
		}
	}
}
</style>
