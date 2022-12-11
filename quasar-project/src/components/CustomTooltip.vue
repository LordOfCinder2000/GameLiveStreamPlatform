<template>
  <q-tooltip class="c-tooltip c-tooltip-arrow-top">
    <div class="c-tooltip-text bg-grey-10 text-body1 relative-position">
      <slot />
    </div>
    <div class="c-tooltip-arrow bg-grey-10 absolute"></div>
  </q-tooltip>
</template>

<script>
export default {};
</script>

<style lang="scss">
$box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.5);

.c-tooltip {
  box-shadow: $box-shadow;
  border-radius: 10px;
  overflow: visible;
  background: transparent;
  padding: 0;

  &-text {
    z-index: 10;
    border-radius: 10px;
    padding: 20px;
  }

  &-arrow {
    z-index: 5;
    box-shadow: $box-shadow;
    width: 30px;
    height: 30px;
    transform: translateX(-50%) rotate(-45deg) skew(-20deg, -20deg);

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
