import { boot } from "quasar/wrappers";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

export default boot(({ app }) => {
  app.use(FloatingVue);
});
