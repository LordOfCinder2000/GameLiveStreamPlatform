import { boot } from "quasar/wrappers";
import { LoadingBar, getCssVar, AddressbarColor } from "quasar";

export default boot(({ app }) => {
	AddressbarColor.set(getCssVar("positive") as string);

	LoadingBar.setDefaults({
		color: "positive",
		size: "0.3rem",
		position: "top",
		hijackFilter(url: string) {
			const parsedUrl = new URL(url);
			return !parsedUrl.pathname.includes("ts");
		},
	});
});
