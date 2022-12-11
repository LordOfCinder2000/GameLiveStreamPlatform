import { defineStore } from "pinia";
import { RegisterDto } from "boot/openapi-client";
import { ref, reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import {
	required,
	email,
	maxLength,
	minLength,
	alphaNum,
	helpers,
} from "@vuelidate/validators";
// export const useAccountRegisterStore = defineStore(
// 	"account-register-store",
// 	() => {
// 		const registerState = reactive<RegisterDto>({
// 			emailAddress: "",
// 			userName: "",
// 			password: "",
// 			appName: "GameStreaming",
// 		});
// 		const $externalResults = ref({});
// 		const rules = {
// 			emailAddress: {
// 				nonWhitespaces,
// 				required,
// 				email,
// 				maxLength: maxLength(50),
// 			},
// 			userName: {
// 				nonWhitespaces,
// 				required,
// 				maxLength: maxLength(50),
// 				alphaNum,
// 			},
// 			password: {
// 				nonWhitespaces,
// 				required,
// 				maxLength: maxLength(50),
// 				minLength: minLength(6),
// 				atLeastOneDigit,
// 				atLeastOneUppercase,
// 				atLeastOneNonAlphanumericCharacter,
// 			},
// 		};
// 		const $vuelidate = useVuelidate(rules, registerState, {
// 			$autoDirty: true,
// 			$lazy: true,
// 			$externalResults,
// 		});

// 		return { registerState, $externalResults, $vuelidate, rules };
// 	}
// );

export const useAccountRegisterStore = defineStore("account-register-store", {
	state: () => ({
		registerState: <RegisterDto>{
			emailAddress: "",
			userName: "",
			password: "",
			appName: "GameStreaming",
		},
		multipleErrors: true,
		$externalResults: {},
		rules: {
			emailAddress: {
				nonWhitespaces,
				required,
				email,
				maxLength: maxLength(50),
			},
			userName: {
				nonWhitespaces,
				required,
				maxLength: maxLength(50),
				alphaNum,
			},
			password: {
				nonWhitespaces,
				required,
				maxLength: maxLength(50),
				minLength: minLength(6),
				atLeastOneDigit,
				atLeastOneUppercase,
				atLeastOneLowercase,
				atLeastOneNonAlphanumericCharacter,
			},
		},
	}),
	getters: {
		$vuelidate: (state) => {
			return useVuelidate(state.rules, state.registerState, {
				$autoDirty: true,
				$lazy: true,
				$externalResults: state.$externalResults,
			});
		},
	},
	actions: {},
});

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

const atLeastOneLowercase = helpers.withMessage(
	"Passwords must have at least one lowercase ('a'-'z')",
	helpers.regex(/[a-z]/)
);

const atLeastOneNonAlphanumericCharacter = helpers.withMessage(
	"Passwords must have at least one non alphanumeric character",
	helpers.regex(/\W/)
);

const nonWhitespaces = helpers.withMessage(
	"Value must not contain white-spaces",
	helpers.regex(/^\S*$/)
);
