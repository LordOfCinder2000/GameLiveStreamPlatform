<template>
	<div>
		<q-form @submit="onSubmit" class="q-gutter-md">
			<q-input
				v-model="registerState.emailAddress"
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

			<q-btn
				dense
				class=""
				:label="'Send again(' + countDown + ')'"
				color="positive"
				no-caps
				@click.prevent="sendCode"
				:disable="countDown != 0 || $vuelidate.emailAddress.$invalid"
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
						v-model.number="code.codeValue"
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

<script setup>
import { useAccountRegisterStore } from "stores/components/account-register-store";
import { authClient } from "boot/openapi-client";
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
import { useQuasar } from "quasar";
const $q = useQuasar();

const { registerState, $externalResults, $vuelidate, multipleErrors } =
	useAccountRegisterStore();

const props = defineProps({
	mode: {
		type: String,
	},
});

watchEffect(() => {
	if (props.mode == "AccountForgot") {
		registerState.emailAddress = "";
	}
});

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

const codes = ref([
	{ id: 1, codeValue: ref("") },
	{ id: 2, codeValue: ref("") },
	{ id: 3, codeValue: ref("") },
	{ id: 4, codeValue: ref("") },
	{ id: 5, codeValue: ref("") },
	{ id: 6, codeValue: ref("") },
]);

const codeMerge = computed(() => {
	var temp = "";
	codes.value.forEach((code) => {
		temp += code.codeValue;
	});
	return temp;
});

const countDown = ref(3);
const sendCode = async () => {
	//send code
	await authClient.email
		.emailSendEmailConfirmCode({
			targetEmailAddress: registerState.emailAddress,
			subject: "Confirm email address",
			body: "",
		})
		.then(() => {
			$q.notify({
				color: "positive",
				message: `Send code success to email address: <strong class="text-black">${registerState.emailAddress}</strong>`,
				html: true,
			});
			countDown.value = 60;
		})
		.catch((err) => {
			$q.notify({
				color: "negative",
				message: err?.body?.error?.message || "Send code not success",
			});
		});
};

const codeError = ref(null);

onMounted(() => {
	setInterval(() => {
		if (countDown.value == 0) return;
		countDown.value -= 1;
	}, 1000);
	$vuelidate.value.$validate();
});
codes.value.forEach((code, i) => {
	watch(code, (codeNew, codeOld) => {
		if (codeNew.codeValue && items.value[i + 1]) {
			items.value[i + 1].$el.click();
		}
	});
});

const items = ref(null);
const focusInput = (ref) => {
	ref.select();
};

const modelUpdate = (value, index) => {
	codeError.value = "";
	if (!value) {
		items.value[index - 2]?.$el.click();
	}
};

const beforeInput = (event, ref, index) => {
	if (event.data) {
		if (1 < event.data.length && event.data.length <= codes.value.length) {
			//
			var arrNumber = String(event.data)
				.split("")
				.map((num) => {
					return Number(num);
				});
			codes.value.forEach((code, i) => {
				code.codeValue = arrNumber[i];
			});
			event.preventDefault();
		}
		if (event.data == event.currentTarget.value && ref) {
			ref.$el.click();
			event.preventDefault();
		}
	}
};

const goToDirection = (event, ref) => {
	ref?.$el.click();
};

const onSubmit = async () => {
	if (!$vuelidate.value.$validate()) return;

	await authClient.account
		.accountRegisterWithCode({
			register: registerState,
			code: codeMerge.value,
		})
		.then(async () => {
			$q.notify({
				color: "positive",
				message: "Email address confirm successful",
			});

			// Login
			const { authenticateOidcPassword } = useOidcStore();
			await authenticateOidcPassword({
				username: registerState.userName,
				password: registerState.password,
			})
				.then((succ) => {
					$q.notify({
						color: "positive",
						message:
							"Login successful, Hello " +
							succ.profile.unique_name,
					});
					window.location.reload(true);
					const loginChannel = new BroadcastChannel("login");
					loginChannel.postMessage("reload");
				})
				.catch(() => {
					$q.notify({
						color: "negative",
						message: "Authentication mismatch.",
					});
				});
		})
		.catch((err) => {
			if (err?.body?.error?.code == "CodeInvalid")
				codeError.value = err?.body?.error?.message;
			$q.notify({
				color: "negative",
				message:
					err?.body?.error?.message || "Email address confirm failed",
			});
		});
};
</script>

<style lang="scss" scoped>
.code-input :deep(.q-field__control) {
	padding: 0;
}
</style>
