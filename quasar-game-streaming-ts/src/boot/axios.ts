import { boot } from "quasar/wrappers";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useOidcStore } from "stores/modules/oidc-store";
import { useAccountStore } from "stores/components/account-store";
declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$axios: AxiosInstance;
	}
}

const globalInterceptorsRequest = {
	onFulfilled: function (config: AxiosRequestConfig) {
		// if (config.headers["Require-Auth"] === "true") {
		// 	const { oidcAccessToken } = useOidcStore();
		// 	// OpenAPI.TOKEN = oidcAccessToken;
		// 	config.headers.Authorization = `Bearer ${oidcAccessToken}`;
		// }
		// if (config.headers["Require-Auth"] !== undefined) {
		// 	delete config.headers["Require-Auth"];
		// }
		const { oidcAccessToken } = useOidcStore();
		if (oidcAccessToken)
			config.headers.Authorization = `Bearer ${oidcAccessToken}`;
		return config;
	},
	onRejected: function (error: any) {
		return Promise.reject(error);
	},
};

const globalInterceptorsResponse = {
	onFulfilled: function (response: AxiosResponse) {
		return response;
	},
	onRejected: async function (error: any) {
		if (error.response.status === 401) {
			useAccountStore().openLoginDialog();

			const { removeOidcUser, oidcIsAuthenticated } = useOidcStore();
			if (oidcIsAuthenticated)
				await removeOidcUser()
					.then(() => {})
					.catch((error) => {
						console.log(error);
					});
		}
		return Promise.reject(error);
	},
};

const apiConfig = <AxiosRequestConfig>{
	withCredentials: true,
	headers: {
		// "Access-Control-Allow-Origin": "*",
		// "Require-Auth": "false",
		"X-Requested-With": "XMLHttpRequest",
	},
};

// Global Instance
axios.defaults.xsrfHeaderName = "RequestVerificationToken";
axios.interceptors.request.use(
	globalInterceptorsRequest.onFulfilled,
	globalInterceptorsRequest.onRejected
);

axios.interceptors.response.use(
	globalInterceptorsResponse.onFulfilled,
	globalInterceptorsResponse.onRejected
);

//api instance
const api = axios.create(apiConfig);
api.interceptors.request.use(
	globalInterceptorsRequest.onFulfilled,
	globalInterceptorsRequest.onRejected
);
api.interceptors.response.use(
	globalInterceptorsResponse.onFulfilled,
	globalInterceptorsResponse.onRejected
);
export default boot(({ app }) => {
	app.config.globalProperties.$axios = axios;

	app.config.globalProperties.$api = api;
});

export { axios, api, apiConfig };
