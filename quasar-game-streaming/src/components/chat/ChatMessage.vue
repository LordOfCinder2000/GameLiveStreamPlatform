<template>
  <div
    style="min-height: 2rem"
    @mouseenter="showMention = true"
    @mouseleave="showMention = false"
    class="chat-message-container row items-baseline q-px-sm q-py-xs rounded-borders cursor-pointer q-hoverable relative-position vertical-middle"
  >
    <span class="q-focus-helper"></span>

    <div class="chat-message-avatar col-auto">
      <q-avatar @click="showPopupUserInfo = true" size="2rem">
        <img :src="avatar" />
      </q-avatar>
      <q-popup-proxy
        v-model="showPopupUserInfo"
        no-parent-event
        ref="popupUserInfo"
      >
        <ChatUserInfo
          :name="name"
          :avatar="avatar"
          @close="closePopupUserInfo"
        />
      </q-popup-proxy>
    </div>

    <div class="chat-message-content q-ml-sm col">
      <div class="chat-message-user">
        <div
          class="chat-message-name q-hoverable"
          @click="showPopupUserInfo = true"
        >
          <span class="q-focus-helper"></span>
          <span class="text-subtitle2 text-bold" :style="{ color: randomColor }"
            >{{ name }}
            <span>:</span>
          </span>
        </div>
      </div>

      <span class="chat-message-text q-ml-xs">
        <slot name="default"> Lorem ipsum dolor sit amet, consectetur</slot>
      </span>
    </div>
    <div v-if="showMention" class="chat-mention absolute-top-right">
      <q-card class="my-card">
        <q-btn dense flat>
          <c-tooltip
            :offset="[5, 5]"
            arrow="bottom"
            anchor="top middle"
            self="bottom middle"
          >
            Nhắc đến</c-tooltip
          >
          <!-- <q-tooltip :offset="[1, 1]" anchor="top middle" self="bottom middle">
           
          </q-tooltip> -->
          <q-icon name="alternate_email" />
        </q-btn>
      </q-card>
    </div>
  </div>
</template>

<script>
import {
  defineAsyncComponent,
  defineComponent,
  ref,
  computed,
  onMounted,
} from "vue";
export default defineComponent({
  name: "ChatMessage",
  components: {
    ChatUserInfo: defineAsyncComponent(() =>
      import("components/chat/ChatUserInfo.vue")
    ),
    "c-tooltip": defineAsyncComponent(() =>
      import("components/CustomTooltip.vue")
    ),
  },
  props: {
    name: String,
    avatar: String,
  },
  setup() {
    const randomColor = computed(() => {
      return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    });
    onMounted(() => {
      // console.log(randomColor.value);
    });

    const popupUserInfo = ref(null);
    return {
      popupUserInfo,
      randomColor,
      showMention: ref(false),
      closePopupUserInfo: () => {
        popupUserInfo.value.hide();
      },
      showPopupUserInfo: ref(false),
    };
  },
});
</script>

<style lang="scss" scoped>
.chat-message {
  &-container {
    .chat-mention {
      position: absolute;
      top: -1.5rem;
      right: 0.5rem;
    }
  }
  &-content {
    // overflow-wrap: anywhere;
    overflow-wrap: break-word;
  }
  &-user {
    display: inline-block;
  }
  &-text {
    line-height: 150%;
  }
}
</style>
