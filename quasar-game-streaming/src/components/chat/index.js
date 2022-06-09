import ChatEmoji from "components/chat/ChatEmoji.vue";
import ChatMessage from "components/chat/ChatMessage.vue";
import ChatRoom from "components/chat/ChatRoom.vue";
import ChatUserInfo from "components/chat/ChatUserInfo.vue";
const install = (Vue) => {
  Vue.component("ChatMessage", ChatMessage);
  Vue.component("ChatEmoji", ChatEmoji);
  Vue.component("ChatRoom", ChatRoom);
  Vue.component("ChatUserInfo", ChatUserInfo);
};

export default {
  install,
};

export { ChatMessage, ChatEmoji, ChatUserInfo, ChatRoom };
