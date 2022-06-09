<template>
  <div v-if="show">
    <q-card>
      <q-banner class="bg-positive q-py-sm">
        <q-item-label class="text-h6 text-white text-weight-bold ellipsis">
          {{ title }}
        </q-item-label>
      </q-banner>
      <q-card-section class="q-pa-md overflow-hidden">
        <q-responsive :ratio="2" class="">
          <q-scroll-area
            class="fit"
            :thumb-style="{ width: '3px', height: '3px' }"
          >
            <div class="row fit overflow-auto">
              <slot name="content"> </slot>
            </div>
          </q-scroll-area>
        </q-responsive>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <q-card>
      <q-skeleton square class="q-pa-md bg-positive"> </q-skeleton>

      <q-card-section class="no-padding">
        <q-responsive :ratio="2">
          <q-skeleton square> </q-skeleton>
        </q-responsive>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
  },
});

const show = ref(false);

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const onClick = async (event) => {
  await waitFor(3000);
  show.value = true;
};

onMounted(() => {
  onClick();
});
</script>

<style></style>
