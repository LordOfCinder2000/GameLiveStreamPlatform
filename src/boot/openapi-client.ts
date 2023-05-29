import { apiConfig } from "boot/axios";
import { AuthClient } from "apis/auth-client";
import { ApiClient } from "apis/api-client";
import { extend } from "quasar";
import { boot } from "quasar/wrappers";
import { useAppConfigurationStore } from "stores/app-configuration-store";

export * from "apis/api-client";

class AuthClientExtend extends AuthClient {
	setRequireAuthHeader = (value: string) =>
		Object.assign(this.request.config.HEADERS || {}, {
			"Require-Auth": value,
		});
}

export const authClient = new AuthClient({
	BASE: process.env.AUTH_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: apiConfig.headers,
});

export const authClientRequireAuth = new AuthClient({
	BASE: process.env.AUTH_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: Object.assign({}, apiConfig.headers, {
		"Require-Auth": "true",
	}),
});

class ApiClientExtend extends AuthClientExtend {}

export const apiClient = new ApiClient({
	BASE: process.env.API_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: apiConfig.headers,
});

export const apiClientRequireAuth = new ApiClient({
	BASE: process.env.API_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: Object.assign({}, apiConfig.headers, {
		"Require-Auth": "true",
	}),
});

export const testApiClientRequireAuth = new ApiClient({
	BASE: process.env.AUTH_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: Object.assign({}, apiConfig.headers, {
		"Require-Auth": "true",
	}),
});

export const testApiClient = new ApiClient({
	BASE: process.env.AUTH_URL,
	WITH_CREDENTIALS: apiConfig.withCredentials,
	HEADERS: apiConfig.headers,
});

export default boot(({}) => {});
