<template>
  <q-page>
    <div class="locale-changer absolute-center column fit">
      <select v-model="$i18n.locale" class="col-sink">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
      <UserCard class="col" :user="{ followers: 10000 }" />
    </div>
  </q-page>
</template>

<script>
import { inject, defineAsyncComponent, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "IndexPage",
  components: {
    UserCard: defineAsyncComponent(() =>
      import("components/live_info/UserCard.vue")
    ),
  },

  setup() {
    const appName = inject("appName");
    console.log(appName);

    return {
      langs: ref(["ja", "en"]),
    };
  },
});
</script>

<style lang="scss" scoped></style>
