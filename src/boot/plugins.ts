import { boot } from "quasar/wrappers";
// import { Mentions } from "ant-design-vue";
import FloatingVue from "floating-vue";
// import Drawer from "ant-design-vue/lib/drawer"; // for js
import "floating-vue/dist/style.css";
// import "ant-design-vue/dist/antd.css";
export default boot(({ app }) => {
	app.use(FloatingVue);
	// app.use(Mentions);
});
