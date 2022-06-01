import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.provide("appName", app);
  app.config.globalProperties.$filters = {
    viewCount(locale, number = 0) {
      return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short",
      }).format(number);
    },
  };
});
