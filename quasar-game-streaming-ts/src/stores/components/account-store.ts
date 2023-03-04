import { defineStore } from "pinia";
import { objectPicker } from "boot/utils";
import { ref, reactive, computed, toRefs } from "vue";
import { useQuasar } from "quasar";
import AccountDialog, {
	Props as AccountDialogProp,
} from "components/account/AccountDialog.vue";
import {
	nonWhitespaces,
	atLeastOneDigit,
	atLeastOneUppercase,
	atLeastOneLowercase,
	atLeastOneNonAlphanumericCharacter,
	useVuelidate,
	required,
	email,
	maxLength,
	minLength,
	alphaNum,
	sameAs,
	helpers,
} from "boot/vuevalidate";

export const useAccountStore = defineStore(
	"account-store",
	() => {
		const $q = useQuasar();

		//#region Component
		function openLoginDialog(props?: AccountDialogProp) {
			return $q.dialog({
				component: AccountDialog,
				componentProps: props,
			});
		}
		//#region

		const multipleErrors = ref(true);
		const accountState = reactive({
			emailAddress: "",
			userName: "",
			password: "",
			appName: "GameStreaming",
		});
		const accountForgotState = reactive({
			emailAddress: "vuvanquyet17102@gmail.com",
			password: "",
			confirmPassword: "",
			userId: "",
		});

		const password = computed(() => accountForgotState.password);
		const $externalResults = ref({});
		const $externalResultsForgot = ref({});
		const rules = {
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
				atLeastOneNonAlphanumericCharacter,
			},
			confirmPassword: {
				nonWhitespaces,
				required,
				maxLength: maxLength(50),
				minLength: minLength(6),
				atLeastOneDigit,
				atLeastOneUppercase,
				atLeastOneLowercase,
				atLeastOneNonAlphanumericCharacter,
				sameAsPassword: helpers.withMessage(
					"Confirm password not same as to password",
					sameAs(password)
				),
			},
		};
		const $vuelidate = computed(() =>
			useVuelidate(
				objectPicker(
					rules,
					"emailAddress",
					"password",
					"userName",
					"appName"
				),
				accountState,
				{
					$autoDirty: true,
					$lazy: true,
					$externalResults,
				}
			)
		);

		const $vuelidateForgot = computed(() =>
			useVuelidate(
				objectPicker(
					rules,
					"emailAddress",
					"password",
					"confirmPassword"
				),
				accountForgotState,
				{
					$autoDirty: true,
					$lazy: true,
					$externalResults: $externalResultsForgot,
				}
			)
		);

		return {
			accountState,
			accountForgotState,
			$externalResults,
			$vuelidate,
			multipleErrors,
			$vuelidateForgot,
			$externalResultsForgot,
			openLoginDialog,
		};
	}
	// { persist: true }
);

// export const useAccountStore = defineStore("account-store", {
// 	state: () => ({
// 		accountState: {
// 			emailAddress: "",
// 			userName: "",
// 			password: "",
// 			confirmPassword: "",
// 			appName: "GameStreaming",
// 		},
// 		multipleErrors: true,
// 		$externalResults: {},
// 		rules: {
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
// 				atLeastOneLowercase,
// 				atLeastOneNonAlphanumericCharacter,
// 			},
// 		},
// 	}),
// 	getters: {
// 		$vuelidate: (state) => {
// 			return useVuelidate(state.rules, state.accountState, {
// 				$autoDirty: true,
// 				$lazy: true,
// 				$externalResults: state.$externalResults,
// 			});
// 		},
// 	},
// 	actions: {},
// 	persist: true,
// });
