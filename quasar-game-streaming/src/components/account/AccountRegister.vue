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
			v-model="registerState.emailAddress"
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
			v-model="registerState.userName"
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
			v-model="registerState.password"
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
import { ref, reactive, onMounted, computed, watchEffect, watch } from "vue";
import {
	AccountService,
	RegisterDto,
	authClient,
	SendEmailDto,
} from "boot/openapi-client";
import { useAccountRegisterStore } from "stores/components/account-register-store";
import useVuelidate from "@vuelidate/core";
import {
	required,
	email,
	maxLength,
	minLength,
	alphaNum,
	helpers,
} from "@vuelidate/validators";
import { useQuasar } from "quasar";
const $q = useQuasar();

////===============================================================/////
// const multipleErrors = ref(true);
////===============================================================/////

const emit = defineEmits(["confirmEmail"]);
const { registerState, $externalResults, $vuelidate, multipleErrors } =
	useAccountRegisterStore();
// const registerState = reactive<RegisterDto>({
// 	emailAddress: "",
// 	userName: "",
// 	password: "",
// 	appName: "GameStreaming",
// });

// const emailAddress = ref("vuvanquyet17102@gmail.com");
// const userName = ref("admin");
// const password = ref("1q2w3E*");
const isPwd = ref(true);

const regexVuelidate = (regex, message) => {
	return helpers.withMessage(message, helpers.regex(regex));
};

const atLeastOneDigit = helpers.withMessage(
	"Passwords must have at least one digit ('0'-'9')",
	helpers.regex(/\d/)
);

const atLeastOneUppercase = helpers.withMessage(
	"Passwords must have at least one uppercase ('A'-'Z')",
	helpers.regex(/[A-Z]/)
);

const atLeastOneNonAlphanumericCharacter = helpers.withMessage(
	"Passwords must have at least one non alphanumeric character",
	helpers.regex(/\W/)
);

const nonWhitespaces = helpers.withMessage(
	"Value must not contain white-spaces",
	helpers.regex(/^\S*$/)
);

// const rules = {
// 	emailAddress: {
// 		nonWhitespaces,
// 		required,
// 		email,
// 		maxLength: maxLength(50),
// 	},
// 	userName: { nonWhitespaces, required, maxLength: maxLength(50), alphaNum },
// 	password: {
// 		nonWhitespaces,
// 		required,
// 		maxLength: maxLength(50),
// 		minLength: minLength(6),
// 		atLeastOneDigit,
// 		atLeastOneUppercase,
// 		atLeastOneNonAlphanumericCharacter,
// 	},
// };

// const $externalResults = ref({});
// const $vuelidate = useVuelidate(rules, registerState, {
// 	$autoDirty: true,
// 	$lazy: true,
// 	$externalResults,
// });

watch(
	() => registerState.userName,
	async (userName) => {
		if (userName && !$vuelidate.value.userName.$invalid) {
			await authClient.userLookup
				.userLookupFindByUserNameRegister(userName)
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
	() => registerState.emailAddress,
	async (emailAddress) => {
		if (emailAddress && !$vuelidate.value.emailAddress.$invalid) {
			await authClient.userLookup
				.userLookupFindByUserEmailRegister(emailAddress)
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

onMounted(() => {
	// $vuelidate.value.$validate();
});

const onSubmit = async () => {
	if (!(await $vuelidate.value.$validate())) {
		return;
	}

	//@ts-ignore
	// authClient.request.config.HEADERS["Require-Auth"] = "true";
	// await authClient.abpApplicationConfiguration.abpApplicationConfigurationGet();
	await authClient.account
		.accountValidateRegisterData(registerState)
		.then(async () => {
			await authClient.email.emailSendEmailConfirmCode({
				targetEmailAddress: registerState.emailAddress,
				subject: "Confirm email address",
				body: "",
			});
			emit("confirmEmail");
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
						message: err?.body?.error?.message,
					});
					break;
			}
		});
};
</script>

<style></style>
