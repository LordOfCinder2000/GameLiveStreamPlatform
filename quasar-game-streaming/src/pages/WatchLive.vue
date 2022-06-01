<template>
  <q-page class="no-scroll row">
    <div class="live-wrapper col">
      <q-scroll-area
        :thumb-style="{ width: '3px' }"
        :content-style="{ width: '100%' }"
        :content-active-style="{ width: '100%' }"
        class="fit"
      >
        <q-layout class="">
          <div class="bg-blue video-container">
            <q-responsive class="video-container" :ratio="16 / 9">
              <video
                controls
                src="https://www.w3schools.com/tags/movie.ogg"
              ></video>
            </q-responsive>
          </div>

          <div class="live-info-wrapper q-pa-none">
            <LiveInfo ref="liveInfo" />
          </div>

          <q-page-scroller
            position="bottom-right"
            :scroll-offset="300"
            :offset="[18, 18]"
          >
            <q-btn fab icon="keyboard_arrow_up" color="positive" />
          </q-page-scroller>
        </q-layout>
      </q-scroll-area>
    </div>
    <q-separator v-if="!collapseChat" vertical />
    <div class="relative-position col-auto">
      <ChatRoom ref="chat" width="380px" />
    </div>
    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import ChatRoom from "components/chat/ChatRoom.vue";
import LiveInfo from "components/live_info/LiveInfo.vue";
import { useQuasar, debounce } from "quasar";
export default defineComponent({
  name: "WatchLive",
  components: { ChatRoom, LiveInfo },

  setup() {
    const chat = ref(null);
    const liveInfo = ref(null);

    const collapseChat = ref(false);
    const $q = useQuasar();
    watchEffect(() => {
      if (chat.value && liveInfo.value) {
        collapseChat.value = chat.value.collapseChat;
        liveInfo.value.collapseChat = chat.value.collapseChat;
      }
    });
    return {
      chat,
      liveInfo,
      collapseChat,
      onResize: debounce(() => {
        if ($q.screen.lt.md) {
          chat.value.collapseChat = true;
        }
      }, 300),
    };
  },
});
</script>

<style lang="scss" scoped>
.live-wrapper {
  // width: calc(100% - 380px);
  .video-container {
    max-height: calc(100vh - 190px);
    min-height: 0;
  }
  .q-scrollarea__content {
    width: 100%;
  }
}
</style>
