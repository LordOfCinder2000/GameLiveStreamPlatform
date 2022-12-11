<template>
	<q-tooltip
		ref="tooltip"
		class="c-tooltip rounded-borders"
		:class="[
			`c-tooltip-arrow-${arrowClass}`,
			{ 'c-tooltip-popover': popover },
		]"
		:model-value="showing"
		@update:model-value="onUpdate"
		@mouseenter="onHover"
		@mouseleave="onLeave"
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
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import { useQuasar, debounce } from "quasar";
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

		const showing = ref(false);
		const isHovered = ref(false);

		const onUpdate = debounce((v) => {
			if (!isHovered.value) showing.value = v;
		}, 150);

		const onLeave = debounce((v) => {
			isHovered.value = false;
			showing.value = false;
		}, 150);

		const tooltip = ref(null);
		const parentHover = ref(false);
		onMounted(() => {
			tooltip.value.$el.parentElement.addEventListener(
				"mouseenter",
				() => {
					parentHover.value = true;
				}
			);
			tooltip.value.$el.parentElement.addEventListener(
				"mouseleave",
				() => {
					parentHover.value = false;
				}
			);
		});

		watch(isHovered, (value) => {
			if (!value && parentHover.value) {
				showing.value = true;
			}
		});

		return {
			arrowClass,
			tooltip,
			showing,
			onHover() {
				isHovered.value = showing.value;
			},
			onUpdate,
			onLeave,
		};
	},
});
</script>

<style lang="scss" scoped>
$box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);
.q-tooltip--style {
	color: inherit;
}
.c-tooltip {
	box-shadow: $box-shadow;
	overflow: visible;
	background: transparent;
	padding: 0;
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
