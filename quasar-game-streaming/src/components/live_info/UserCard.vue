<template>
  <div v-if="show">
    <q-item clickable class="rounded-borders">
      <q-item-section avatar>
        <q-avatar>
          <img :src="user.avatar" alt="" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label :lines="1">
          {{ user.name }}
          <q-badge align="middle" color="red"> LIVE </q-badge>
        </q-item-label>
        <q-item-label caption :lines="1">
          {{
            // $formatNumber(user.followers, {
            //   notation: "compact",
            //   compactDisplay: "short",
            // })
            $filters.viewCount($i18n.locale, user.followers)
          }}
          followers
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn
          dense
          unelevated
          color="positive"
          no-caps
          no-wrap
          class="q-px-sm text-weight-regular"
        >
          <q-icon size="xs" name="favorite_border" />
          <div class="row q-ml-sm items-center justify-center">
            <span>Follow</span>
          </div>
        </q-btn>
      </q-item-section>
    </q-item>
  </div>
  <div v-else>
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton width="50%" square />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton width="20%" square />
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-skeleton height="2rem" type="QBtn" square />
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  user: {
    type: Object,
  },
});

const show = ref(false);

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

const onClick = async (event) => {
  await waitFor(1000);
  show.value = true;
};

onMounted(() => {
  onClick();
});
</script>

<style></style>
