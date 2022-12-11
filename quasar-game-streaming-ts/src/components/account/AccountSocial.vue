<template>
	<div class="column q-pa-md">
		<div class="text-subtitle2">Login via third-party apps:</div>
		<q-btn
			color="positive"
			class="row q-mt-md"
			v-for="button in buttons"
			:key="button.id"
			align="left"
			no-caps
			outline
			@click="loginExternal(button.name)"
		>
			<q-icon :color="button.color" left :name="button.icon" />
			<div>{{ button.name }}</div>
		</q-btn>
	</div>

	<!-- <q-list>
		<q-tabs dense align="center" narrow-indicator no-caps>
			<q-tab label="Log in via third-party apps"> </q-tab>
		</q-tabs>
		<q-item-label class="" header>List Header</q-item-label>
		<q-item>
			<q-item-section>Icon as avatar</q-item-section>
			<q-item-section avatar>
				<q-icon color="primary" name="bluetooth" />
			</q-item-section>
		</q-item>
		<q-item>
			<q-item-section>Icon as avatar</q-item-section>
			<q-item-section avatar>
				<q-icon color="primary" name="bluetooth" />
			</q-item-section>
		</q-item>
		<q-item>
			<q-item-section>Icon as avatar</q-item-section>
			<q-item-section avatar>
				<q-icon color="primary" name="bluetooth" />
			</q-item-section>
		</q-item>
	</q-list> -->
</template>

<script setup>
import { ref } from "vue";
import { useOidcStore } from "stores/modules/oidc-store";
import { OidcUtils } from "modules/oidc-store";
import { useQuasar } from "quasar";
const $q = useQuasar();
const { authenticateOidcPopup } = useOidcStore();

const loginExternal = async (name) => {
	await authenticateOidcPopup({
		options: { acr_values: name.toLowerCase() },
	})
		.then(async (succ) => {
			$q.notify({
				color: "positive",
				message: "Login successful, Hello " + succ.profile.unique_name,
			});
			// window.location.reload(true);
			const loginChannel = new BroadcastChannel("login");
			loginChannel.postMessage("reload");
		})
		.catch((err) => {
			var message = "Authentication failed for external " + name;
			const errorEmail = $q.localStorage.getItem("externalLoginFail");
			if (errorEmail) {
				$q.localStorage.remove("externalLoginFail");
				message += ": " + errorEmail;
			}
			$q.notify({
				color: "negative",
				message: message,
			});
		});
};
const buttons = ref([
	{
		id: 1,
		name: "Google",
		icon: "img:https://img.icons8.com/color/48/000000/google-logo.png",
		label: "Login with Google",
		color: "green",
	},
	{
		id: 2,
		name: "Facebook",
		icon: "mdi-facebook",
		label: "Login with Facebook",
		color: "blue",
	},
	{
		id: 3,
		name: "Twitch",
		icon: "mdi-twitch",
		label: "Login with Twitch",
		color: "purple",
	},
]);
</script>

<style></style>
