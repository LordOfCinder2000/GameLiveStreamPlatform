import { boot } from "quasar/wrappers";
import axios from "axios";
import { useOidcStore } from "stores/modules/oidc-store";

// Global interceptors
const globalInterceptorsRequest = {
	onFulfilled: function (config) {
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
	onRejected: function (error) {
		return Promise.reject(error);
	},
};

const apiConfig = {
	withCredentials: true,
	headers: {
		"Require-Auth": false,
	},
};

// Global Instance
axios.defaults.xsrfHeaderName = "RequestVerificationToken";
axios.interceptors.request.use(
	globalInterceptorsRequest.onFulfilled,
	globalInterceptorsRequest.onRejected
);

//api instance
const api = axios.create(apiConfig);
api.interceptors.request.use(
	globalInterceptorsRequest.onFulfilled,
	globalInterceptorsRequest.onRejected
);

export default boot(({ app }) => {
	app.config.globalProperties.$axios = axios;

	app.config.globalProperties.$api = api;
});

export { axios, api, apiConfig };
