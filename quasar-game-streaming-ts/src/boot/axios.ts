import { boot } from "quasar/wrappers";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useOidcStore } from "stores/modules/oidc-store";
import { authClient } from "boot/openapi-client";

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$axios: AxiosInstance;
	}
}

const globalInterceptorsRequest = {
	onFulfilled: function (config: AxiosRequestConfig) {
		if (config.headers["Require-Auth"] === "true") {
			const { oidcAccessToken } = useOidcStore();
			// OpenAPI.TOKEN = oidcAccessToken;
			config.headers.Authorization = `Bearer ${oidcAccessToken}`;
		}
		if (config.headers["Require-Auth"] !== undefined) {
			delete config.headers["Require-Auth"];
		}

		return config;
	},
	onRejected: function (error: any) {
		return Promise.reject(error);
	},
};

const globalInterceptorsResponse = {
	onFulfilled: function (response: AxiosResponse) {
		// authClient.setRequireAuthHeader("false");
		return response;
	},
	onRejected: function (error: any) {
		return Promise.reject(error);
	},
};

const apiConfig = {
	withCredentials: true,
	headers: {
		// "Access-Control-Allow-Origin": "*",
		"X-Requested-With": "XMLHttpRequest",
		"Require-Auth": "false",
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
