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

onBeforeMount(async () => {
	try {
		await authClient.authCookie.removeIdentityCookie();
	} catch (error) {
		console.log(error);
	}
	// authService.userManager
	// 	.signinPopupCallback()
	// 	.then(function (user) {
	// 		console.log("login callback !");
	// 		// window.location.href = "/";
	// 		// window.location.host.reload();
	// 		success.value = true;
	// 		loginChannel.postMessage(null);
	// 	})
	// 	.catch(function (err) {
	// 		console.log(err);
	// 		success.value = false;
	// 	});
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("temporarily_unavailable") == "email") {
	// const { setOidcError } = useOidcStore();
	// setOidcError(
	// 	OidcUtils.ErrorPayload("authenticateOidcPopup", "fuck")
	// );
	const $q = useQuasar();
	$q.localStorage.set("externalLoginFail", "Email not confirm yet!");
}

///////////////////////////////////////////////////////

const { oidcSignInPopupCallback } = useOidcStore();

oidcSignInPopupCallback()
	.then((redirectPath: any) => {
		router.push(redirectPath);
	})
	.catch((err) => {
		console.error(err);

		if (window.opener) {
			router.push({ name: "error-401" }); // Handle errors any way you want
		}
	});
</script>
