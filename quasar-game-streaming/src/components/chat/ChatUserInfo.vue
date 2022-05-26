<template>
  <q-card class="user-info relative-position" style="max-width: 350px">
    <q-card-section class="no-padding">
      <q-banner class="user-info-banner no-border q-pr-lg">
        <template v-slot:avatar>
          <q-avatar size="4rem"> <img :src="avatar" alt="" /></q-avatar>
        </template>
        <div class=" ">
          <div class="ellipsis user-name text-h6 text-weight-bolder ellis">
            {{ name }}
          </div>
          <div
            class="user-id text-subtitle2 text-weight-bolder"
            style="margin-top: -5px"
          >
            ID: 696969696
          </div>
          <div class="user-follow row text-subtitle2">
            <div class="user-following">10 following</div>
            <q-separator vertical class="q-mx-sm" />
            <div class="user-followers">23.2M follower</div>
          </div>
        </div>
      </q-banner>
    </q-card-section>
    <q-separator class="bg-positive" />

    <q-card-actions align="around">
      <q-btn
        dense
        unelevated
        color="positive"
        icon="favorite"
        label="Follow"
        no-caps
      >
      </q-btn>
      <q-btn
        dense
        outline
        color="positive"
        icon="alternate_email"
        label="Mention"
        no-caps
      >
      </q-btn>
    </q-card-actions>
    <q-btn
      style="top: 0.1rem; right: 0.1rem"
      class="absolute-top-right"
      flat
      dense
      icon="close"
      @click="$emit('close')"
    />
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from "vue";

export default defineComponent({
  name: "ChatUserInfo",
  components: {},
  props: {
    name: String,
    avatar: String,
  },
  setup(props, ctx) {
    return {};
  },
});
</script>

<style lang="scss">
.user-info {
  border-top: 3px solid $positive;
  &-banner {
    // background-image: url("https://img.nimo.tv/t/1639520760395/202111261637952763880_1639520760395_avatar.png/w120_l0/img.png");
    // background-size: cover;
    // background-repeat: no-repeat;
  }
  .self-start {
    align-self: center;
  }
}
</style>
