<template>
  <q-page class="bg-white row">
    <div class="live-wrapper col">
      <q-scroll-area :thumb-style="{ width: '5px' }" class="fit">
        <div class="bg-blue video-container">
          <q-responsive class="video-container" :ratio="16 / 9">
            <video
              controls
              src="https://www.w3schools.com/tags/movie.ogg"
            ></video>
          </q-responsive>
          <!-- <q-video
            :ratio="16 / 9"
            src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
            ref="video"
          >
          </q-video> -->
        </div>
        <div class="q-pa-none">
          <div v-for="n in 100" :key="n">
            {{ n }}:Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Facere eius enim facilis impedit non. Eius ullam soluta, et facilis
            obcaecati iusto quam magni vitae enim maiores necessitatibus
            voluptas omnis esse! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Minus quae hic quibusdam, quidem culpa voluptates
            itaque voluptatem tenetur vero porro! Quam eius sint sed eveniet
            quibusdam fuga ipsa temporibus rem!
          </div>
        </div>
      </q-scroll-area>
    </div>
    <div class="relative-position col-auto">
      <ChatRoom width="400px" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ChatRoom from "components/chat/ChatRoom.vue";

export default defineComponent({
  name: "WatchLive",
  components: { ChatRoom },

  setup() {
    const collapseChat = ref(false);
    return {
      collapseChat,
      collapseChatTrigger: () => {
        collapseChat.value = !collapseChat.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.live-wrapper {
  //   width: calc(100%);
  .video-container {
    max-height: calc(100vh - 150px);
    min-height: 0;
  }
}
</style>
