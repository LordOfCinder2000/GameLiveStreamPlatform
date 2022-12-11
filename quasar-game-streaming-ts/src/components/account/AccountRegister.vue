<template>
	<q-form
		autocorrect="on"
		autocapitalize="on"
		autocomplete="on"
		spellcheck="true"
		@submit="onSubmit"
		class="q-gutter-md"
	>
		<q-input
			v-model="accountState.emailAddress"
			debounce="500"
			maxlength="50"
			autofocus
			filled
			no-error-icon
			hide-bottom-space
			color="positive"
			label="Email *"
			hint="Email address"
			:error="$vuelidate.emailAddress.$invalid"
			@blur="$vuelidate.emailAddress.$touch"
		>
			<template v-slot:error>
				<div v-if="multipleErrors">
					<div
						v-for="error in $vuelidate.emailAddress.$errors"
						:key="error.$uid"
					>
						&bull;&nbsp;{{ error.$message }}
					</div>
				</div>
				<div v-else>
					&bull;&nbsp;{{
						$vuelidate.emailAddress.$errors[0].$message
					}}
				</div>
			</template>
		</q-input>
		<q-input
			v-model="accountState.userName"
			debounce="500"
			maxlength="50"
			filled
			no-error-icon
			hide-bottom-space
			color="positive"
			label="Username *"
			hint="Username or email address"
			:error="$vuelidate.userName.$invalid"
			@blur="$vuelidate.userName.$touch"
		>
			<template v-slot:error>
				<div v-if="multipleErrors">
					<div
						v-for="error in $vuelidate.userName.$errors"
						:key="error.$uid"
					>
						&bull;&nbsp;{{ error.$message }}
					</div>
				</div>
				<div v-else>
					&bull;&nbsp;{{ $vuelidate.userName.$errors[0].$message }}
				</div>
			</template>
		</q-input>
		<q-input
			v-model="accountState.password"
			maxlength="50"
			filled
			no-error-icon
			hide-bottom-space
			color="positive"
			:type="isPwd ? 'password' : 'text'"
			label="Password *"
			hint="Password"
			:error="$vuelidate.password.$invalid"
			@blur="$vuelidate.password.$touch"
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
						v-for="error in $vuelidate.password.$errors"
						:key="error.$uid"
					>
						&bull;&nbsp;{{ error.$message }}
					</div>
				</div>
				<div v-else>
					&bull;&nbsp;{{ $vuelidate.password.$errors[0].$message }}
				</div>
			</template>
		</q-input>

		<div class="q-mt-lg">
			<q-btn
				class="full-width"
				label="Register"
				type="submit"
				color="positive"
				:disable="$vuelidate.$invalid"
			/>
		</div>
	</q-form>
</template>

<script setup lang="ts">
import {
	ref,
	reactive,
	onMounted,
	onUnmounted,
	computed,
	watchEffect,
	watch,
	toRef,
} from "vue";
import { storeToRefs } from "pinia";
import { apiClient } from "boot/openapi-client";
import { useAccountStore } from "stores/components/account-store";
import { useReCaptchaStore } from "stores/components/recaptcha-store";
import { useQuasar } from "quasar";
const $q = useQuasar();
const emit = defineEmits(["confirmEmail", "confirmReCaptcha"]);
const { accountState, $externalResults, multipleErrors, $vuelidate } =
	useAccountStore();
const isPwd = ref(true);

// const { $vuelidate } = storeToRefs(useAccountStore());
watch(
	() => accountState.userName,
	async (userName) => {
		Object.assign($externalResults, {
			userName: "",
		});
		if (userName && !$vuelidate.value.userName.$invalid) {
			await apiClient.userLookup
				.checkDuplicateUserName(userName)
				.catch((err) => {
					Object.assign($externalResults, {
						userName: err?.body?.error?.message || "",
					});
				});
		}
	},
	{
		immediate: true,
	}
);

watch(
	() => accountState.emailAddress,
	async (emailAddress) => {
		Object.assign($externalResults, {
			emailAddress: "",
		});
		if (emailAddress && !$vuelidate.value.emailAddress.$invalid) {
			await apiClient.userLookup
				.checkDuplicateEmail(emailAddress)
				.catch((err) => {
					Object.assign($externalResults, {
						emailAddress: err?.body?.error?.message || "",
					});
				});
		}
	},
	{
		immediate: true,
	}
);

onUnmounted(() => {
	// $vuelidate.value.$validate();
	// debugger;
});

const onSubmit = async () => {
	// emit("confirmEmail", "AccountConfirm");
	// return;
	if (!(await $vuelidate.value.$validate())) {
		return;
	}

	// Show ReCaptcha
	debugger;
	const { recaptchaValid } = useReCaptchaStore();
	if (!recaptchaValid) {
		emit("confirmReCaptcha");
		return;
	}

	await apiClient.account
		.validateRegisterData(accountState)
		.then(async () => {
			await apiClient.email
				.sendEmailConfirmCode({
					targetEmailAddress: accountState.emailAddress,
					subject: "Confirm email address",
				})
				.then(() => {
					$q.notify({
						color: "positive",
						message: "Code send success to your email",
					});
				})
				.catch(() => {
					$q.notify({
						color: "negative",
						message: "Code send fail",
					});
				});
			emit("confirmEmail", "AccountConfirm");
		})
		.catch((err) => {
			switch (err?.body?.error?.code) {
				case "Volo.Abp.Identity:DuplicateEmail":
					Object.assign($externalResults, {
						emailAddress: err?.body?.error?.message,
					});
					break;
				case "Volo.Abp.Identity:DuplicateUserName":
					Object.assign($externalResults, {
						userName: err?.body?.error?.message,
					});
					break;
				default:
					$q.notify({
						color: "negative",
						message: err?.message,
					});
					break;
			}
		});
};

defineExpose({
	onSubmit,
});
</script>

<style></style>
