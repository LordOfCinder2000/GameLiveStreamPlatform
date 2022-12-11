<template>
  <q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
    <Suspense>
      <EmojiPicker type="" @select="$emit('onSelectEmoji', $event)" />
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
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss"></style>
