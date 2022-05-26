<template>
  <q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
    <Suspense>
      <EmojiPicker
        :class="{ 'emoji-dark--active': $q.dark.isActive }"
        type=""
        @select="$emit('onSelectEmoji', $event)"
      />
      <template #fallback>
        <q-skeleton class="column q-pa-sm" style="width: 280px; height: 320px">
          <q-skeleton class="col" style="height: 30%"> </q-skeleton>
          <q-skeleton class="col-auto q-mt-md" style="height: 70%">
          </q-skeleton>
        </q-skeleton>
      </template>
    </Suspense>
  </q-popup-proxy>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";

import "../../../node_modules/vue3-emoji-picker/dist/style.css";
import { useQuasar } from "quasar";
export default {
  components: {
    EmojiPicker: defineAsyncComponent(() => import("vue3-emoji-picker")),
  },
  setup() {
    const input = ref("");

    function showEmoji(emoji) {
      alert(`emoji ${emoji.i} selected, check console for details`);
      console.log(emoji);
    }

    const $q = useQuasar();

    onMounted(() => {
      if ($q.dark.isActive) {
      }
    });

    return {
      input,
      showEmoji,
    };
  },
};
</script>

<style lang="scss">
.v3-emoji-picker {
  font-family: inherit;
  border-radius: $generic-border-radius;
  .v3-body .v3-body-inner .v3-group .v3-emojis button {
    border-radius: $generic-border-radius;
    &:hover {
      background-color: $dark;
    }
  }
}
.v3-emoji-picker .v3-body .v3-body-inner .v3-group h5 {
  font-weight: 800;
  font-size: 1rem;
}
.emoji-dark--active {
  background-color: $dark;
  color: $white;
  .v3-text,
  .v3-is-open,
  .v3-skin-tones {
    background-color: $dark;
    color: $white;
  }
  .v3-body .v3-body-inner .v3-group h5 {
    background: $dark;
  }
  .v3-header .v3-groups .v3-group {
    filter: invert(100%);
  }
}
</style>
