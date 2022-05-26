<template>
  <q-tooltip
    v-if="popover"
    class="c-tooltip c-tooltip-popover rounded-borders"
    :class="[`c-tooltip-arrow-${arrowClass}`]"
    ref="tooltip"
  >
    <div
      class="q-qt-md c-tooltip-text c-tooltip-text-popover border-radius-inherit bg-secondary text-body1 relative-position"
    >
      <slot />
    </div>
    <div
      class="absolute visibility-visible"
      :class="`visibility-visible-${arrowClass}`"
    ></div>
    <div class="c-tooltip-arrow bg-positive absolute"></div>
  </q-tooltip>
  <q-tooltip
    v-else
    class="c-tooltip rounded-borders"
    :class="[`c-tooltip-arrow-${arrowClass}`]"
    ref="tooltip"
  >
    <div
      class="c-tooltip-text border-radius-inherit bg-secondary relative-position"
    >
      <slot />
    </div>
    <div
      class="absolute visibility-visible"
      :class="`visibility-visible-${arrowClass}`"
    ></div>
    <div class="c-tooltip-arrow bg-secondary absolute"></div>
  </q-tooltip>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";

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
      // tooltip,
      // tooltipModel,
    };
  },
});
</script>

<style lang="scss">
$box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);

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
