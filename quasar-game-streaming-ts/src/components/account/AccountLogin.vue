<template>
	<q-form
		autocorrect="on"
		autocapitalize="on"
		autocomplete="on"
		spellcheck="true"
		@submit="loginOidc"
		class="q-gutter-md"
	>
		<q-input
			v-model="username"
			autofocus
			filled
			hide-bottom-space
			color="positive"
			label="Username *"
			hint="Username or email address"
			lazy-rules
			:rules="inputRules"
			:error-message="usernameError"
			no-error-icon
			maxlength="50"
			:error="!isValid"
			@update:model-value="
				() => {
					isValid = true;
					usernameError = '';
				}
			"
		/>
		<q-input
			v-model="password"
			filled
			hide-bottom-space
			color="positive"
			:type="isPwd ? 'password' : 'text'"
			label="Password *"
			hint="Password"
			lazy-rules
			:rules="inputRules"
			maxlength="50"
			no-error-icon
			:error-message="passwordError"
			:error="!isValid"
			@update:model-value="
				() => {
					isValid = true;
					passwordError = '';
				}
			"
		>
			<template v-slot:append>
				<q-icon
					class="cursor-pointer"
					@click="isPwd = !isPwd"
					:name="isPwd ? 'visibility_off' : 'visibility'"
				/>
			</template>
		</q-input>

		<div class="text-right text-positive">
			<span class="cursor-pointer" @click="emit('forgotPassword')">
				Forgot password?
			</span>
		</div>

		<div class="q-mt-lg">
			<q-btn
				class="full-width"
				label="Login"
				type="submit"
				color="positive"
			/>
		</div>
	</q-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOidcStore } from "stores/modules/oidc-store";
import { useQuasar } from "quasar";
const $q = useQuasar();
const inputRules = [
	(val: string) => (val && val.length > 0) || "Please type something",
	(val: string) =>
		(val && val.length <= 50) || "Please use max 50 characters",
];

// const emit = defineEmits(["forgotPassword", "login"]);
const emit = defineEmits<{
	(e: "forgotPassword"): void;
	(e: "login", fn: () => Promise<any>): Promise<any>;
}>();
const username = ref("");
const password = ref("");
const isPwd = ref(true);
const usernameError = ref("");
const passwordError = ref("");
const isValid = ref(true);

const { authenticateOidcPassword } = useOidcStore();
// const authService = new AuthService();

const loginOidc = async () => {
	return await emit("login", async () => {
		return await authenticateOidcPassword({
			username: username.value,
			password: password.value,
		})
			.then((succ: any) => {
				$q.notify({
					type: "positive",
					message:
						"Login successful, Hello " + succ.profile.unique_name,
				});
				//@ts-ignore
				// window.location.reload(true);
				const loginChannel = new BroadcastChannel("login");
				loginChannel.postMessage("reload");
			})
			.catch((err) => {
				if (err.status !== 500) {
					usernameError.value = err.message;
					passwordError.value = err.message;
					isValid.value = false;
					// nameRef.value.validate();
					// ageRef.value.validate();
				}
				$q.notify({
					type: "negative",
					message: "Authentication mismatch.",
				});

				throw err;
			});
	});
};
</script>

<style></style>
