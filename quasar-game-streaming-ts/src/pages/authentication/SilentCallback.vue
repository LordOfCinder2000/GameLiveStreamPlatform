<template><q-page></q-page></template>

<script setup>
import { onMounted } from "vue";
import { useOidcStore } from "stores/modules/oidc-store";

onMounted(() => {
	const { oidcSignInSilentCallback } = useOidcStore();

	oidcSignInSilentCallback()
		.then((suc) => {
			console.log("silent login:", suc);
		})
		.catch((err) => {
			console.log("failed", err);
		});
});
</script>

<style></style>
