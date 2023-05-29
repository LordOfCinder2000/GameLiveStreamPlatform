<template>
	<router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { authClient } from "boot/openapi-client";
// import { useAppConfigurationStore } from "stores/app-configuration-store";

onBeforeMount(async () => {
	try {
		await authClient.authCookie.removeIdentityCookie();
	} catch (error) {}
});

// // const { clearStaleState } = useOidcStore();
// // // clearStaleState();
// const logoutChannel = new BroadcastChannel("logout");
// logoutChannel.onmessage = (_) => {
// 	//@ts-ignore
// 	window.location.reload(true);
// 	logoutChannel.close();
// };
// const loginChannel = new BroadcastChannel("login");
// loginChannel.onmessage = (_) => {
// 	// authClient.profile.get().then(() => {

// 	// })
// 	//@ts-ignore
// 	window.location.reload(true);
// 	loginChannel.close();
// };
</script>
