<template>
	<router-view />
</template>

<script>
import { defineComponent } from "vue";
import { authClient } from "boot/openapi-client";
export default defineComponent({
	name: "App",

	setup() {
		authClient.abpApplicationConfiguration.abpApplicationConfigurationGet();
		// const { clearStaleState } = useOidcStore();
		// // clearStaleState();
		const logoutChannel = new BroadcastChannel("logout");
		logoutChannel.onmessage = (_) => {
			window.location.reload(true);
			logoutChannel.close();
		};
		const loginChannel = new BroadcastChannel("login");
		loginChannel.onmessage = (_) => {
			window.location.reload(true);
			loginChannel.close();
		};
	},
});
</script>
