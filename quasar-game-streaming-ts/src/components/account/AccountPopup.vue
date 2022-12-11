<template>
	<q-dialog ref="loginPopup" @hide="accountPopupHide" persistent>
		<q-card style="min-width: 600px">
			<q-linear-progress
				v-if="progress"
				indeterminate
				rounded
				color="positive"
			/>
			<q-toolbar>
				<q-avatar class="rotating bg-positive">
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
				</q-avatar>

				<q-toolbar-title
					><span class="text-weight-bold">Game</span>
					Streaming</q-toolbar-title
				>

				<q-btn flat round dense icon="close" v-close-popup />
			</q-toolbar>
			<q-separator />
			<q-card-section horizontal>
				<q-card-section
					:class="[
						'col-8',
						{ 'q-pt-sm': accountModeActive },
						{ 'q-pa-none': !accountModeActive },
					]"
				>
					<div v-if="!accountModeActive">
						<q-tabs
							v-model="tabCopy"
							dense
							active-color="positive"
							indicator-color="positive"
							align="left"
							narrow-indicator
							no-caps
						>
							<q-tab name="login" label="Login" />
							<q-tab name="register" label="Register" />
						</q-tabs>
						<q-tab-panels keep-alive v-model="tabCopy" animated>
							<q-tab-panel class="no-scroll" name="login">
								<AccountLogin
									@login="login"
									@forgotPassword="forgotPassword"
								/>
							</q-tab-panel>

							<q-tab-panel class="no-scroll" name="register">
								<AccountRegister
									ref="accountRegister"
									@confirmReCaptcha="confirmReCaptcha"
									@confirmEmail="confirmEmail"
								/>
							</q-tab-panel>
						</q-tab-panels>
					</div>
					<div v-else>
						<q-btn
							v-if="accountModeActive"
							flat
							dense
							icon="arrow_back"
							class="q-mb-sm"
							@click="backToPrev"
						/>

						<span class="text-subtitle1 on-right text-positive">{{
							accountMode.title
						}}</span>
						<Suspense>
							<component
								:mode="confirmEmailMode"
								:is="accountMode.componentName"
								@confirmEmail="confirmEmail"
								@confirmReCaptcha="confirmReCaptcha"
								ref="dynamicRef"
							></component>
							<template #fallback>
								<q-inner-loading
									color="positive"
									:showing="true"
								/>
							</template>
						</Suspense>
					</div>
				</q-card-section>
				<q-separator vertical />

				<q-card-section class="q-pa-none col">
					<AccountSocial />
				</q-card-section>
			</q-card-section>

			<q-separator />
			<q-toolbar> </q-toolbar>
			<q-inner-loading :showing="showReCaptchaBG">
				<div class="column flex-center">
					<ReCaptcha
						v-show="showReCaptcha"
						@verifyRecaptchaSuccess="verifyRecaptchaSuccess"
						@receiveRecaptchaToken="receiveRecaptchaToken"
					/>
					<div
						v-if="!showReCaptcha"
						class="column flex-center text-positive"
					>
						<q-spinner-hourglass size="4rem" />
						<p>Please waiting...</p>
					</div>
				</div>
			</q-inner-loading>
		</q-card>
	</q-dialog>
</template>

<script setup lang="ts">
import {
	ref,
	watchEffect,
	defineAsyncComponent,
	shallowRef,
	onMounted,
	onUnmounted,
	watch,
} from "vue";
import { QDialog } from "quasar";
import { useAccountStore } from "stores/components/account-store";
import AccountLogin from "components/account/AccountLogin.vue";
import AccountRegister from "components/account/AccountRegister.vue";
import AccountSocial from "components/account/AccountSocial.vue";
import AccountForgot from "components/account/AccountForgot.vue";
import AccountEmailConfirm from "components/account/AccountEmailConfirm.vue";
import ReCaptcha from "components/ReCaptcha.vue";
import { useReCaptchaStore } from "stores/components/recaptcha-store";

const props = defineProps({
	tab: {
		type: String,
		default: "login",
	},
});

const loginPopup = ref<QDialog | null>(null);

const showReCaptcha = ref(false);
const showReCaptchaBG = ref(false);

const confirmReCaptcha = async () => {
	showReCaptcha.value = true;
	showReCaptchaBG.value = true;
};

const accountRegister = ref<any | null>(null);
const receiveRecaptchaToken = () => {
	showReCaptcha.value = false;
};
const verifyRecaptchaSuccess = async () => {
	debugger;
	if (dynamicRef.value) {
		await dynamicRef.value
			.onSubmit()
			.then(() => {
				useReCaptchaStore().recaptchaValid = false;
				showReCaptchaBG.value = false;
			})
			.catch((error: any) => {
				console.log(error);
			});
	} else {
		if (accountRegister.value) {
			await accountRegister.value
				.onSubmit()
				.then(() => {
					useReCaptchaStore().recaptchaValid = false;
					showReCaptchaBG.value = false;
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
	}
};

const dynamicRef = ref<any | null>(null);

const tabCopy = ref(props.tab);

watchEffect(() => {
	tabCopy.value = props.tab;
});

const accountModeActive = ref(false);

const accountModes = shallowRef({
	AccountForgot: {
		id: 1,
		name: "AccountForgot",
		componentName: AccountForgot,
		title: "Forgot password",
	},
	AccountEmailConfirm: {
		id: 2,
		name: "AccountEmailConfirm",
		componentName: AccountEmailConfirm,
		title: "Confirm email address",
	},
});

const accountMode = shallowRef<any>(accountModes.value.AccountForgot);
const from = ref("");
const confirmEmail = (value: string) => {
	if (value) {
		from.value = value;
		confirmEmailMode.value = value;
	}
	accountModeActive.value = true;
	accountMode.value = accountModes.value.AccountEmailConfirm;
	progress.value = true;
	setTimeout(() => {
		progress.value = false;
	}, 1000);
};

const login = async (login: () => Promise<any>) => {
	showReCaptchaBG.value = true;
	await login()
		.then(() => {
			loginPopup.value?.hide();
		})
		.finally(() => {
			showReCaptchaBG.value = false;
		});
};

const forgotPassword = () => {
	accountModeActive.value = true;
	accountMode.value = accountModes.value.AccountForgot;
};

const accountPopupHide = () => {
	accountModeActive.value = false;
	useAccountStore().$reset();
};

const confirmEmailMode = ref("AccountConfirm");

const backToPrev = () => {
	if (from.value == "AccountForgot") {
		forgotPassword();
	} else {
		accountModeActive.value = false;
	}
	from.value = "";
};

const progress = ref(false);
</script>

<style></style>
