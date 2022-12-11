<template>
	<q-page class="flex flex-center column" padding>
		<div style="width: 300px">
			<q-select
				class="full-width"
				v-model="loginType"
				:options="loginTypes"
				label="Standard"
			/>

			<div v-if="!loginSuccess">
				<h5>Auth</h5>
				<q-form
					@submit.prevent="loginWebsanova"
					@reset="onReset"
					class="q-gutter-md"
				>
					<q-input
						filled
						v-model="username"
						label="Username"
						hint="Username"
					/>
					<q-input
						filled
						type="password"
						v-model="password"
						label="Password"
					/>
					<q-toggle v-model="rememberMe" label="Remember me" />
					<div>
						<!-- <q-btn label="Submit" type="submit" color="primary" />
						<q-btn
							label="Reset"
							type="reset"
							color="primary"
							flat
							class="q-ml-sm"
						/> -->
					</div>
				</q-form>
			</div>
			<div class="column" v-else>
				<h5>Login Success</h5>
				<div>
					<span>username: </span>
					<span>{{ username }}</span>
				</div>
				<q-btn @click="logout" label="Logout" color="red" />
			</div>
			<q-btn label="loginOidc" @click="loginOidc" color="primary" />
			<q-btn
				label="callSecretApi"
				@click="callSecretApi"
				color="yellow"
			/>
			<q-btn label="signinSilent" @click="signinSilent" color="green" />
			<q-btn label="signoutOidc" @click="signoutOidc" color="red" />
			<q-btn label="getUser" @click="getUser" color="purple" />
			<q-btn
				label="getAccessToken"
				@click="getAccessToken"
				color="pink"
			/>
		</div>
	</q-page>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { api } from "boot/axios";
import qs from "qs";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { LoadingBar } from "quasar";
// @ts-ignore
import { useAuth } from "@websanova/vue-auth/src/v3.js";
import { AuthService } from "boot/auth/oidc-oauth2";
import { useOidcStore } from "stores/modules/oidc-store";

// import { useAuthComp } from "composables";

const username = ref("admin");
const password = ref("1q2w3E*");
const rememberMe = ref(false);
// @Websanova
const auth = useAuth();

// const { login } = useAuthComp();

const router = useRouter();

const state = reactive({
	form: {
		body: {
			userNameOrEmailAddress: username.value,
			password: password.value,
			rememberMe: rememberMe.value,
		},
		remember: false,
		fetchUser: true,
		staySignedIn: false,
		errors: {},
	},
});

const errors = (res) => {
	state.form.errors = Object.fromEntries(
		res.data.errors.map((item) => [item.field, item.msg])
	);
};

const loginWebsanova = () => {
	// auth.login({
	// 	data: state.form.body,
	// 	remember: state.form.remember,
	// 	fetchUser: state.form.fetchUser,
	// 	staySignedIn: state.form.staySignedIn,
	// 	redirect: {
	// 		name: "watch-live",
	// 	},
	// }).then(
	// 	(fetchRes: any) => {
	// 		console.log(fetchRes);
	// 	},
	// 	(errorRes: any) => {
	// 		// errors(errorRes.response);
	// 		console.log(errorRes);
	// 	}
	// );
	auth.oauth2({
		params: {
			username: username.value,
			password: password.value,
			grant_type: "password",
			client_id: "GameStreaming_Quasar",
			client_secret: "1q2w3e*",
			scope: "GameStreaming offline_access",
		},
		remember: false,
		staySignedIn: true,
		fetchUser: true,
		window: {
			name: "_blank",
			specs: {},
			replace: false,
		},
	});
};
//  =================== Normal
const $q = useQuasar();

const loginTypes = ref(["token", "cookie"]);
const loginType = ref("token");

const loginSuccess = ref($q.sessionStorage.getItem("isAuth"));

const headers = ref({});
const data = ref({});

const authChannel = new BroadcastChannel("auth");
const onSubmit = () => {
	let endPoint = "";
	switch (loginType.value) {
		case "token":
			endPoint = "/connect/token";
			data.value = {
				username: username.value,
				password: password.value,
				grant_type: "password",
				client_id: "GameStreaming_Quasar",
				client_secret: "1q2w3e*",
				scope: "GameStreaming offline_access",
			};
			headers.value = {
				"Content-Type": "application/x-www-form-urlencoded",
			};
			break;
		case "cookie":
			endPoint = "/api/account/login";
			data.value = {
				userNameOrEmailAddress: username.value,
				password: password.value,
				rememberMe: rememberMe.value,
			};
			headers.value = {
				//accept: "text/plain",
				// "Content-Type": "application/json",
			};
			break;
		default:
			break;
	}
	if (headers.value["Content-Type"] === "application/x-www-form-urlencoded")
		data.value = qs.stringify(data.value);
	api.post(endPoint, data.value, {
		headers: headers.value,
	})
		.then(function (response) {
			$q.sessionStorage.set("isAuth", true);
			authChannel.postMessage({ cmd: "refresh", isAuth: true });
			window.location.reload();
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

const onReset = () => {
	username.value = "";
	password.value = "";
};

const logout = () => {
	api.get("/api/account/logout")
		.then(function (response) {
			$q.sessionStorage.set("isAuth", false);
			authChannel.postMessage({ cmd: "refresh", isAuth: false });
			window.location.reload();
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
};

authChannel.onmessage = function (e) {
	if (e.data.cmd === "refresh") {
		$q.sessionStorage.set("isAuth", e.data.isAuth);
		// loginOidc();
		window.location.reload();
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// const authService = new AuthService();
// authService.userManager.events.addUserSignedIn(function () {
// 	console.log("addUserSignedIn...");
// });

/**Các chức năng */

// const loginOidc = () => {
// 	authService.userManager.signinPopup();
// 	// mainOidc.signIn();
// };

const callSecretApi = () => {
	api.get("https://localhost:44356/api/account/my-profile", {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "text/plain",
			"X-Requested-With": "XMLHttpRequest",
			"Require-Auth": "true",
		},
	})
		.then(function (response) {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
};

// const signinSilent = () => {
// 	authService.userManager.signinSilent();
// 	// mainOidc.signIn();
// };

// const signoutOidc = () => {
// 	authService.userManager.signoutPopup();
// };

// const getUser = () => {
// 	authService.userManager.getUser().then((user) => {
// 		console.log("user: ", user);
// 	});
// };
// const querySessionStatus = () => {
// 	authService.userManager
// 		.querySessionStatus()
// 		.then((success) => {
// 			console.log(success);
// 		})
// 		.catch((failed) => {
// 			// if (failed.error === "login_required") {
// 			// 	loginOidc();
// 			// }
// 		});
// };
onMounted(() => {
	// authService.userManager.clearStaleState().then(() => {
	// 	console.log("clear stale state!");
	// });
	// new Promise((resolve, reject) => {
	// 	authService.userManager
	// 		.getUser()
	// 		.then((user) => {
	// 			if (user == null) {
	// 				// signinSilent();
	// 				return resolve(false);
	// 			} else {
	// 				return resolve(true);
	// 			}
	// 		})
	// 		.catch(function (err) {
	// 			console.log(err);
	// 			return reject(err);
	// 		});
	// }).then(
	// 	(success) => {
	// 		if (success) console.log("signin success !");
	// 	},
	// 	(err) => {
	// 		console.log("signin failed", err);
	// 	}
	// );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
const {
	authenticateOidcPopup,
	signOutOidcSilent,
	authenticateOidcSilent,
	authenticateOidcPassword,
} = useOidcStore();
// const authService = new AuthService();
const loginOidc = () => {
	// authService.userManager.signinPopup();
	authenticateOidcPopup();
	// authenticateOidcPassword({
	// 	username: username.value,
	// 	password: password.value,
	// });
};
const signoutOidc = () => {
	signOutOidcSilent();
};

const getAccessToken = () => {
	const { oidcAccessToken } = useOidcStore();
	alert(oidcAccessToken);
};
const signinSilent = () => {
	authenticateOidcSilent();
};
const getUser = () => {
	const { oidcUser } = useOidcStore();
	console.log(oidcUser);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// const oidcOAuth2Store = useOidcStore();

// const loginOidc = () => {
// 	// oidcOAuth2Store.authenticateOidcPopup();
// 	const oidcOAuth2Store = useOidcStore();
// 	oidcOAuth2Store.oidcCheckAccess(router.currentRoute);
// };
// const signoutOidc = () => {
// 	oidcOAuth2Store.signOutOidcSilent(() => {
// 		alert("s");
// 	});
// };

// const getAccessToken = () => {
// 	alert(oidcOAuth2Store.oidcAccessToken);
// };

// const signinSilent = () => {
// 	oidcOAuth2Store.authenticateOidcSilent({ ignoreErrors: true });
// };
</script>

<style></style>
