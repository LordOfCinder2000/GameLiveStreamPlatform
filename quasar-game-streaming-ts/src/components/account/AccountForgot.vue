<template>
	<div>
		<q-form
			autocorrect="on"
			autocapitalize="on"
			autocomplete="on"
			spellcheck="true"
			@submit="onSubmit"
			class="q-gutter-md"
		>
			<q-input
				v-model="accountForgotState.emailAddress"
				debounce="500"
				maxlength="50"
				autofocus
				filled
				no-error-icon
				hide-bottom-space
				color="positive"
				label="Email *"
				hint="Email address"
				:error="$vuelidateForgot.emailAddress.$invalid"
				@blur="$vuelidateForgot.emailAddress.$touch"
			>
				<template v-slot:error>
					<div v-if="multipleErrors">
						<div
							v-for="error in $vuelidateForgot.emailAddress
								.$errors"
							:key="error.$uid"
						>
							&bull;&nbsp;{{ error.$message }}
						</div>
					</div>
					<div v-else>
						&bull;&nbsp;{{
							$vuelidateForgot.emailAddress.$errors[0].$message
						}}
					</div>
				</template>
			</q-input>

			<q-input
				v-model="accountForgotState.password"
				maxlength="50"
				filled
				no-error-icon
				hide-bottom-space
				color="positive"
				:type="isPwd ? 'password' : 'text'"
				label="Password *"
				hint="Password"
				:error="$vuelidateForgot.password.$invalid"
				@blur="$vuelidateForgot.password.$touch"
			>
				<template v-slot:append>
					<q-icon
						class="cursor-pointer"
						@click="isPwd = !isPwd"
						:name="isPwd ? 'visibility_off' : 'visibility'"
					/>
				</template>
				<template v-slot:error>
					<div v-if="multipleErrors">
						<div
							v-for="error in $vuelidateForgot.password.$errors"
							:key="error.$uid"
						>
							&bull;&nbsp;{{ error.$message }}
						</div>
					</div>
					<div v-else>
						&bull;&nbsp;{{
							$vuelidateForgot.password.$errors[0].$message
						}}
					</div>
				</template>
			</q-input>

			<!-- Confirm password -->
			<q-input
				v-model="accountForgotState.confirmPassword"
				maxlength="50"
				filled
				no-error-icon
				hide-bottom-space
				color="positive"
				:type="isConfirmPwd ? 'password' : 'text'"
				label="Confirm password *"
				hint="Confirm password"
				:error="$vuelidateForgot.confirmPassword.$invalid"
				@blur="$vuelidateForgot.confirmPassword.$touch"
			>
				<template v-slot:append>
					<q-icon
						class="cursor-pointer"
						@click="isConfirmPwd = !isConfirmPwd"
						:name="isConfirmPwd ? 'visibility_off' : 'visibility'"
					/>
				</template>
				<template v-slot:error>
					<div v-if="multipleErrors">
						<div
							v-for="error in $vuelidateForgot.confirmPassword
								.$errors"
							:key="error.$uid"
						>
							&bull;&nbsp;{{ error.$message }}
						</div>
					</div>
					<div v-else>
						&bull;&nbsp;{{
							$vuelidateForgot.password.$errors[0].$message
						}}
					</div>
				</template>
			</q-input>

			<div class="q-mt-lg">
				<q-btn
					class="full-width"
					label="Send me code"
					type="submit"
					color="positive"
					:disable="$vuelidateForgot.$invalid"
				/>
			</div>
		</q-form>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAccountStore } from "stores/components/account-store";
import { apiClient } from "boot/openapi-client";
import { storeToRefs } from "pinia";
import { useReCaptchaStore } from "stores/components/recaptcha-store";
import { useQuasar } from "quasar";
const $q = useQuasar();
const {
	accountForgotState,
	$externalResultsForgot,
	$vuelidateForgot,
	multipleErrors,
} = useAccountStore();

// const { $externalResultsForgot } = storeToRefs(useAccountStore());
const emit = defineEmits(["confirmEmail", "confirmReCaptcha"]);
const username = ref("");
const password = ref("");
const isPwd = ref(true);
const isConfirmPwd = ref(true);
watch(
	() => accountForgotState.emailAddress,
	async (emailAddress) => {
		accountForgotState.userId = "";
		Object.assign($externalResultsForgot, {
			emailAddress: "",
		});
		if (
			emailAddress &&
			!$vuelidateForgot.value.emailAddress.email.$invalid
		) {
			await apiClient.userLookup
				.findByEmail(emailAddress)
				.then((succ) => {
					accountForgotState.userId = succ;
				})
				.catch((err) => {
					if (err.status !== 500) console.log(err);
					Object.assign($externalResultsForgot, {
						emailAddress: err?.body?.error?.message || "",
					});
				});
		}
	},
	{
		immediate: true,
	}
);
const onSubmit = async () => {
	if (!(await $vuelidateForgot.value.$validate())) {
		return;
	}

	const { recaptchaValid } = useReCaptchaStore();
	if (!recaptchaValid) {
		emit("confirmReCaptcha");
		return;
	}

	await apiClient.email
		.sendEmailResetPasswordCode({
			targetEmailAddress: accountForgotState.emailAddress,
			subject: "Reset password",
		})
		.then(() => {
			$q.notify({
				type: "positive",
				message: "Code send success to your email",
			});
		})
		.catch((error) => {
			console.log(error);
			if (error.status !== 500)
				$q.notify({
					type: "negative",
					message: "Code send fail",
				});
		});

	emit("confirmEmail", "AccountForgot");
};

defineExpose({
	onSubmit,
});
</script>

<style></style>
