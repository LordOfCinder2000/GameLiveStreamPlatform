<template>
  <div class="links fit row">
    <q-item
      clickable
      class="col col-xs-4 col-md-6"
      v-for="link in links"
      :key="link.id"
    >
      <q-item-section avatar>
        <q-icon color="positive" :name="link.icon" size="xl" />
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">
          {{ link.url }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon name="link" size="ls" />
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { ref } from "vue";

const links = ref([
  { id: 1, icon: "mdi-facebook", url: "Link Lorem, ipsum dolor." },
  { id: 1, icon: "mdi-instagram", url: "Link Lorem, ipsum dolor." },
  { id: 1, icon: "mdi-youtube", url: "Link Lorem, ipsum dolor." },
  { id: 1, icon: "mdi-twitter", url: "Link Lorem, ipsum dolor." },
]);
</script>

<style></style>
