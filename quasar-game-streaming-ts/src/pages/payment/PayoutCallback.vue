<template>
	<q-page>
		<div class="fixed-center text-center">
			<transition-group
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
			>
				<p key="person">
					<q-icon name="person" size="8em" color="grey-5" />
				</p>
				<!-- Wrapping only one DOM element, defined by QBtn -->
				<p key="text1" class="text-faded">
					We're preparing your session.
				</p>
				<p key="text2" class="text-faded">
					<strong
						>Please wait while we set up your information...</strong
					>
				</p>
			</transition-group>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useOidcStore } from "stores/modules/oidc-store";
import { RouteLocation, RouteLocationRaw, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { authClient } from "boot/openapi-client";
const router = useRouter();
const { oidcSignInPopupCallback } = useOidcStore();

oidcSignInPopupCallback()
	.then((redirectPath: any) => {})
	.catch((err) => {
		console.error(err);

		if (window.opener) {
			router.push({ name: "error-401" }); // Handle errors any way you want
		}
	});
</script>
