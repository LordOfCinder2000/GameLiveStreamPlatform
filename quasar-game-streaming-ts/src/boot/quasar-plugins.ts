import { boot } from "quasar/wrappers";
import { LoadingBar, getCssVar, AddressbarColor } from "quasar";

export default boot(({ app }) => {
	AddressbarColor.set(getCssVar("positive") as string);

	const ignorePath = ["ts", "send-message-to-chat-room", "lookup"];

	LoadingBar.setDefaults({
		color: "positive",
		size: "0.3rem",
		position: "top",
		hijackFilter(url: string) {
			return showLoadingBar(url, ignorePath);
		},
	});
});

function showLoadingBar(url: string, paths: Array<string>) {
	const parsedUrl = new URL(url);
	paths.forEach((element) => {
		if (parsedUrl.pathname.includes(element)) {
			return false;
		}
	});
	return true;
}
