import { boot } from "quasar/wrappers";
import { CloseDrawer } from "directives";

export default boot(({ app }) => {
	app.directive("close-drawer", CloseDrawer);
});
