import Carousel3dSlide from "components/carousel-3d/Carousel3dSlide.vue";
import Carousel3dContent from "components/carousel-3d/Carousel3dContent.vue";

const install = (Vue) => {
  Vue.component("Carousel3dContent", Carousel3dContent);
  Vue.component("Carousel3dSlide", Carousel3dSlide);
};

export default {
  install,
};

export { Carousel3dContent, Carousel3dSlide };
