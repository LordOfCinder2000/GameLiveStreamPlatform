<template>
	<q-page>
		<div class="fixed-center text-center">
			<transition-group
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
			>
				<!-- Wrapping only one DOM element, defined by QBtn -->
				<p key="text1" class="text-faded">
					We're preparing logout session.
				</p>
				<p key="text2" class="text-faded">
					<strong
						>Please wait while we signout your account...</strong
					>
				</p>
			</transition-group>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { useOidcStore } from "stores/modules/oidc-store";
// var authService = new AuthService();

// authService.userManager
// 	.signoutCallback()
// 	.then(function () {
// 		window.location.href = window.parent.location.href;
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	});
///////////////////////////////////////////////////////
const { signOutOidcCallback } = useOidcStore();
signOutOidcCallback()
	.then(function () {
		// window.location.href = window.parent.location.href;
	})
	.catch(function (err) {
		console.log(err);
	});
</script>
