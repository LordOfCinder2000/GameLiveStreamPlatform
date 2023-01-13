<template>
	<router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { authClient } from "boot/openapi-client";
// import { useAppConfigurationStore } from "stores/app-configuration-store";

onBeforeMount(async () => {
	// await authClient.authCookie.removeIdentityCookie().catch((error) => {
	// 	console.log(error);
	// });
});
</script>
