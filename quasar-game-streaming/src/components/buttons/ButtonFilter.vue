<template>
  <q-btn-dropdown
    dense
    no-icon-animation
    :ripple="false"
    outline
    no-caps
    :menu-offset="[5, 5]"
    icon="sort"
    dropdown-icon="expand_more"
    align="left"
    color="positive"
  >
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <div class="text-center ellipsis" style="max-width: 300px">
          Filter something
        </div>
      </div>
    </template>
    <q-list>
      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label>Photos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label>Videos</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="onItemClick">
        <q-item-section>
          <q-item-label>Articles</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped></style>
