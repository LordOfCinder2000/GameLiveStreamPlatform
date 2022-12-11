import { boot } from "quasar/wrappers";
import { authClient } from "./openapi-client";

export default boot(({}) => {
	const logoutChannel = new BroadcastChannel("logout");
	logoutChannel.onmessage = (_) => {
		//@ts-ignore
		window.location.reload(true);
		logoutChannel.close();
	};
	const loginChannel = new BroadcastChannel("login");
	loginChannel.onmessage = (_) => {
		// authClient.profile.get().then(() => {
		// })
		//@ts-ignore
		window.location.reload(true);
		loginChannel.close();
	};
});
