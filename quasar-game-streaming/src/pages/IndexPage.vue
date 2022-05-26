<template>
  <q-page class="bg-">
    <q-layout>
      <q-drawer
        v-model="chatDrawer"
        side="right"
        show-if-above
        @click.capture="chatDrawerClick"
        :width="400"
        bordered
        persistent
        no-swipe-open
        no-swipe-close
        no-swipe-backdrop
        :breakpoint="0"
        class="bg-grey-3 relative-position"
        style="z-index: -1"
      >
        <div class="absolute-top-left z-max" style="left: -10px">
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_right"
            @click="chatDrawer = !chatDrawer"
          />
        </div>
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section> Inbox </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section> Star </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Send </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Drafts </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <p v-for="n in 15" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
          praesentium molestias a adipisci, dolore vitae odit, quidem
          consequatur optio voluptates asperiores pariatur eos numquam rerum
          delectus commodi perferendis voluptate?
        </p>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import VideoCard from "components/VideoCard.vue";

export default defineComponent({
  name: "IndexPage",
  components: {},

  setup() {
    const miniState = ref(false);
    return {
      chatDrawer: ref(true),
      miniState,
      chatDrawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
      // hideChatDrawer(){
      //   this.chatDrawer
      // }
    };
  },
});
</script>

<style lang="scss" scoped></style>
