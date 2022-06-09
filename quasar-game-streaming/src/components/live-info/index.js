import InfoCard from "components/live-info/InfoCard.vue";
import InfoCardAbout from "components/live-info/InfoCardAbout.vue";
import InfoCardLink from "components/live-info/InfoCardLink.vue";
import UserCard from "components/live-info/UserCard.vue";
import LiveInfo from "components/live-info/LiveInfo.vue";
const install = (Vue) => {
  Vue.component("InfoCardAbout", InfoCardAbout);
  Vue.component("InfoCard", InfoCard);
  Vue.component("InfoCardLink", InfoCardLink);
  Vue.component("UserCard", UserCard);
  Vue.component("LiveInfo", LiveInfo);
};

export default {
  install,
};

export { InfoCardAbout, InfoCard, UserCard, InfoCardLink, LiveInfo };
