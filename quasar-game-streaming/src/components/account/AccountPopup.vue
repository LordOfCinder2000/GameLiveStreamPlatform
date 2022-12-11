<template>
	<q-dialog @hide="accountPopupHide">
		<q-card style="min-width: 600px">
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
									@forgotPassword="
										() => {
											accountModeActive = true;
											accountMode =
												accountModes.AccountForgot;
										}
									"
								/>
							</q-tab-panel>

							<q-tab-panel class="no-scroll" name="register">
								<AccountRegister
									@confirmEmail="
										() => {
											accountModeActive = true;
											accountMode =
												accountModes.AccountEmailConfirm;
										}
									"
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
							@click.prevent="accountModeActive = false"
						/>

						<span class="text-subtitle1 on-right text-positive">{{
							accountMode.title
						}}</span>
						<component
							:mode="accountMode.name"
							:is="accountMode.componentName"
						></component>
					</div>
				</q-card-section>
				<q-separator vertical />

				<q-card-section class="q-pa-none col">
					<AccountSocial />
				</q-card-section>
			</q-card-section>

			<q-separator />
			<q-toolbar> </q-toolbar>
		</q-card>
	</q-dialog>
</template>

<script setup>
import {
	ref,
	watchEffect,
	defineAsyncComponent,
	shallowRef,
	onMounted,
	watch,
} from "vue";
import { useAccountRegisterStore } from "stores/components/account-register-store";
import AccountLogin from "components/account/AccountLogin.vue";
import AccountRegister from "components/account/AccountRegister.vue";
import AccountSocial from "components/account/AccountSocial.vue";
const AccountForgot = defineAsyncComponent(() =>
	import("components/account/AccountForgot.vue")
);
const AccountEmailConfirm = defineAsyncComponent(() =>
	import("components/account/AccountEmailConfirm.vue")
);

const props = defineProps({
	tab: {
		type: String,
		default: "login",
	},
});

const tabCopy = ref(props.tab);

watchEffect(() => {
	tabCopy.value = props.tab;
});

const accountModeActive = ref(false);

const accountModes = shallowRef({
	AccountForgot: {
		id: 1,
		name: "AccountForgot",
		componentName: AccountEmailConfirm,
		title: "Forgot password",
	},
	AccountEmailConfirm: {
		id: 2,
		name: "AccountEmailConfirm",
		componentName: AccountEmailConfirm,
		title: "Confirm email address",
	},
});

const accountMode = shallowRef(accountModes.value.AccountForgot);

const accountPopupHide = () => {
	accountModeActive.value = false;
	useAccountRegisterStore().$reset();
};
</script>

<style></style>
