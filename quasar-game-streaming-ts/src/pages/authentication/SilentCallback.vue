<template><q-page></q-page></template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import { useOidcStore } from "stores/modules/oidc-store";

onBeforeMount(async () => {
	const { oidcSignInSilentCallback } = useOidcStore();

	await oidcSignInSilentCallback().catch((err) => {
		console.log("silent login error: ", err);
	});
});
</script>

<style></style>
