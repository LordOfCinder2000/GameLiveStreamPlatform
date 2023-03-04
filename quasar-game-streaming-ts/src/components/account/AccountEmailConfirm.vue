<template>
	<div>
		<q-form @submit="onSubmit" class="q-gutter-md">
			<q-input
				v-model="emailModel[mode].state.emailAddress"
				filled
				hide-bottom-space
				color="positive"
				label="Verification send to"
				lazy-rules
				debounce="500"
				maxlength="50"
				autofocus
				no-error-icon
				hint="Email address"
				:error="emailModel[mode].$vuelidate.emailAddress.$invalid"
				@blur="emailModel[mode].$vuelidate.emailAddress.$touch"
			>
				<template v-slot:error>
					<div v-if="multipleErrors">
						<div
							v-for="error in emailModel[mode].$vuelidate
								.emailAddress.$errors"
							:key="error.$uid"
						>
							&bull;&nbsp;{{ error.$message }}
						</div>
					</div>
					<div v-else>
						&bull;&nbsp;{{
							emailModel[mode].$vuelidate.emailAddress.$errors[0]
								.$message
						}}
					</div>
				</template>
			</q-input>

			<q-btn
				dense
				class=""
				:label="'Send again(' + countDown + ')'"
				color="positive"
				no-caps
				@click.prevent="sendCode"
				:disable="
					countDown != 0 ||
					emailModel[mode].$vuelidate.emailAddress.$invalid
				"
			/>
			<p class="text-positive">
				Enter the code {{ codes.length }} digits:
			</p>
			<div>
				<div class="row no-wrap justify-between q-mt-lg">
					<q-input
						maxlength="1"
						mask="#"
						standout="text-white"
						class="text-center text-h5 code-input"
						:input-class="[
							codeError ? 'text-negative' : 'text-positive',
							'text-h5 text-center',
						]"
						input-style="aspect-ratio: 1/1"
						v-for="code in codes"
						:key="code.id"
						v-model="code.codeValue"
						hide-bottom-space
						type="text"
						ref="items"
						@focus="focusInput($refs.items[code.id - 1])"
						@update:model-value="
							modelUpdate(code.codeValue, code.id)
						"
						@beforeinput="
							beforeInput($event, $refs.items[code.id], code.id)
						"
						@click="focusInput($refs.items[code.id - 1])"
						@keyup.left="
							goToDirection($event, $refs.items[code.id - 2])
						"
						@keyup.right="
							goToDirection($event, $refs.items[code.id])
						"
						@keyup.delete="modelUpdate(code.codeValue, code.id)"
					>
					</q-input>
				</div>
				<div class="q-field--error">
					<div
						class="q-field__bottom row items-start q-field__bottom--stale"
					>
						<div v-if="codeError" class="q-field__messages col">
							<div>&bull;&nbsp;{{ codeError }}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="q-mt-lg">
				<q-btn
					class="full-width"
					label="Confirm"
					type="submit"
					color="positive"
					:disable="!codeMerge || codeMerge.length != 6"
				/>
			</div>
		</q-form>
	</div>
</template>

<script setup lang="ts">
import { useAccountStore } from "stores/components/account-store";
import { apiClient } from "boot/openapi-client";
import { useOidcStore } from "stores/modules/oidc-store";
import {
	ref,
	onMounted,
	computed,
	watchEffect,
	watch,
	onBeforeUpdate,
	nextTick,
} from "vue";
import { useQuasar, QInput } from "quasar";
const $q = useQuasar();

const {
	accountState,
	$externalResults,
	$vuelidate,
	accountForgotState,
	$externalResultsForgot,
	$vuelidateForgot,
	multipleErrors,
} = useAccountStore();

const emailModel = ref<any>({
	AccountForgot: {
		state: accountForgotState,
		$externalResults: $externalResultsForgot,
		$vuelidate: $vuelidateForgot,
	},
	AccountConfirm: {
		state: accountState,
		$externalResults: $externalResults,
		$vuelidate: $vuelidate,
	},
});

// const emailModel = ref({
// 	AccountForgot:
// 		 accountForgotState,
// 	AccountConfirm:
// 		 accountState,
// });

const props = defineProps({
	mode: {
		type: String,
		default: "AccountConfirm",
	},
});

// const confirmEmail = watchEffect(() => {
// 	if (props.mode == "AccountForgot") {
// 		accountState.emailAddress = "";
// 	}
// });

watch(
	() => emailModel.value[props.mode].state.emailAddress,
	async (emailAddress) => {
		if (props.mode == "AccountForgot") {
			Object.assign($externalResultsForgot, {
				emailAddress: "",
			});
			if (emailAddress && !$vuelidateForgot.value.emailAddress.$invalid) {
				await apiClient.userLookup
					.findByEmail(emailAddress)
					.then((succ) => {
						console.log(succ);
					})
					.catch((err) => {
						console.log(err);
						if (err.status !== 500)
							Object.assign($externalResultsForgot, {
								emailAddress: err?.body?.error?.message || "",
							});
					});
			}
		} else {
			Object.assign($externalResults, {
				emailAddress: "",
			});
			if (emailAddress && !$vuelidate.value.emailAddress.$invalid) {
				await apiClient.userLookup
					.checkDuplicateEmail(emailAddress)
					.catch((err) => {
						if (err.status !== 500) console.log(err);
						Object.assign($externalResults, {
							emailAddress: err?.body?.error?.message || "",
						});
					});
			}
		}
	},
	{
		immediate: true,
	}
);

const codes = ref([
	{ id: 1, codeValue: "" },
	{ id: 2, codeValue: "" },
	{ id: 3, codeValue: "" },
	{ id: 4, codeValue: "" },
	{ id: 5, codeValue: "" },
	{ id: 6, codeValue: "" },
]);

const codeMerge = computed(() => {
	var temp = "";
	codes.value.forEach((code) => {
		temp += code.codeValue;
	});
	return temp;
});

const countDown = ref(60);
const sendCode = async () => {
	//send code

	await apiClient.email
		.sendEmailConfirmCode({
			targetEmailAddress: emailModel.value[props.mode].state.emailAddress,
			subject: "Confirm email address",
		})
		.then(() => {
			$q.notify({
				type: "positive",
				message: `Send code success to email address: <strong class="text-positive">${
					emailModel.value[props.mode].state.emailAddress
				}</strong>`,
				html: true,
			});
			countDown.value = 60;
		})
		.catch((err) => {
			if (err.status !== 500) console.log(err);
			$q.notify({
				type: "negative",
				message: err?.body?.error?.message || "Send code not success",
			});
		});
};

const codeError = ref("");

onMounted(() => {
	setInterval(() => {
		if (countDown.value == 0) return;
		countDown.value -= 1;
	}, 1000);
	$vuelidate.value.$validate();
});
codes.value.forEach((code, i) => {
	watch(code, (codeNew, codeOld) => {
		if (items.value) {
			if (
				codeNew.codeValue != null &&
				codeNew.codeValue != "" &&
				items.value[i + 1]
			) {
				items.value[i + 1].$el.click();
			}
		}
		console.log(codeNew.codeValue + ":" + codeOld.codeValue);
	});
});

const items = ref<any[] | null>(null);
const focusInput = (ref: any) => {
	ref.select();
};

const modelUpdate = (value: string, index: number) => {
	codeError.value = "";
	if (value === "" && items.value) {
		items.value[index - 2]?.$el.click();
	}
};

const beforeInput = (event: any, ref: any, index: number) => {
	if (event.data) {
		if (1 < event.data.length && event.data.length <= codes.value.length) {
			var arrNumber = String(event.data)
				.split("")
				.map((num) => {
					return Number(num);
				});
			codes.value.forEach((code, i) => {
				code.codeValue = arrNumber[i].toString();
			});
			event.preventDefault();
		}
		if (event.data == event.currentTarget.value && ref) {
			ref.$el.click();
			event.preventDefault();
		}

		if (!Number.parseInt(event.data)) {
			event.preventDefault();
		}
	}
};

const goToDirection = (event: any, ref: any) => {
	ref?.$el.click();
};

const onSubmit = async () => {
	if (props.mode == "AccountForgot") {
		if (!$vuelidateForgot.value.$validate()) return;

		await apiClient.account
			.resetPassword({
				userId: emailModel.value[props.mode].state.userId,
				resetToken: codeMerge.value,
				password: emailModel.value[props.mode].state.confirmPassword,
			})
			.then(async () => {
				$q.notify({
					type: "positive",
					message: "Reset password successful",
				});

				// Login
				const { authenticateOidcPassword } = useOidcStore();
				await authenticateOidcPassword({
					username: emailModel.value[props.mode].state.emailAddress,
					password: emailModel.value[props.mode].state.password,
				})
					.then((succ: any) => {
						$q.notify({
							type: "positive",
							message:
								"Login successful, Hello " +
								succ.profile.unique_name,
						});
						const loginChannel = new BroadcastChannel("login");
						loginChannel.postMessage("reload");
					})
					.catch(() => {
						$q.notify({
							type: "negative",
							message: "Authentication mismatch.",
						});
					});
			})
			.catch((err) => {
				console.log(err);
				if (err.status !== 500) {
					if (
						err?.body?.error?.code?.includes("CodeInvalid") ||
						err?.body?.error?.code?.includes("InvalidToken")
					)
						codeError.value = err?.body?.error?.message;
					$q.notify({
						type: "negative",
						message:
							err?.body?.error?.message ||
							"Email address confirm failed",
					});
				}
			});
	} else {
		if (!$vuelidate.value.$validate()) return;

		await apiClient.account
			.registerWithCode({
				register: emailModel.value[props.mode].state,
				code: codeMerge.value,
			})
			.then(async () => {
				$q.notify({
					type: "positive",
					message: "Email address confirm successful",
				});

				// Login
				const { authenticateOidcPassword } = useOidcStore();
				await authenticateOidcPassword({
					username: emailModel.value[props.mode].state.userName,
					password: emailModel.value[props.mode].state.password,
				})
					.then((succ: any) => {
						$q.notify({
							type: "positive",
							message:
								"Login successful, Hello " +
								succ.profile.unique_name,
						});
						const loginChannel = new BroadcastChannel("login");
						loginChannel.postMessage("reload");
					})
					.catch(() => {
						$q.notify({
							type: "negative",
							message: "Authentication mismatch.",
						});
					});
			})
			.catch((err) => {
				if (err.status !== 500) {
					console.log(err);
					if (err?.body?.error?.code == "CodeInvalid")
						codeError.value = err?.body?.error?.message;
					$q.notify({
						type: "negative",
						message:
							err?.body?.error?.message ||
							"Email address confirm failed",
					});
				}
			});
	}
};
</script>

<style lang="scss" scoped>
.code-input :deep(.q-field__control) {
	padding: 0;
}
</style>
