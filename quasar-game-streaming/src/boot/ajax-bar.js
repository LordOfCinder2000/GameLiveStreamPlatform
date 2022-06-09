import { boot } from "quasar/wrappers";
import { LoadingBar } from "quasar";
import { getCssVar } from "quasar";

export default boot(({ app }) => {
	LoadingBar.setDefaults({
		color: "positive",
		size: "0.3rem",
		position: "top",
	});
	LoadingBar.start();
	LoadingBar.stop();
});
