import { apiConfig } from "boot/axios";
import { AuthClient } from "apis/auth-client";
import {
	ApiClient,
	OpenAPI as ApiOpenAPI,
	OpenAPIConfig,
	BaseHttpRequest,
} from "apis/api-client";
import { AxiosHttpRequest } from "apis/api-client/core/AxiosHttpRequest";
import { FetchHttpRequest } from "apis/requests";
import { useOidcStore } from "stores/modules/oidc-store";

type OpenAPIConfigExtended = OpenAPIConfig & {
	KEEP_ALIVE?: boolean;
};
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
class ApiClientExtend extends ApiClient {
	constructor(config: Partial<OpenAPIConfig>) {
		super(config);
	}

	public config(
		config: Partial<OpenAPIConfigExtended>,
		HttpRequest: HttpRequestConstructor = AxiosHttpRequest
	) {
		if (config.KEEP_ALIVE) {
			HttpRequest = FetchHttpRequest;
			config.TOKEN = useOidcStore().access_token ?? "";
		}

		return new ApiClient(
			{
				...this.request.config,
				HEADERS: { ...this.request.config.HEADERS, ...config.HEADERS },
				...config,
			},
			HttpRequest
		);
	}
}

ApiOpenAPI.WITH_CREDENTIALS = apiConfig.withCredentials ?? true;
ApiOpenAPI.HEADERS = apiConfig.headers;
ApiOpenAPI.CREDENTIALS = "same-origin";

export const authClient = new AuthClient({
	...ApiOpenAPI,
	BASE: process.env.AUTH_URL,
});

export const apiClient = new ApiClientExtend({
	...ApiOpenAPI,
	BASE: process.env.API_URL,
});
export * from "apis/api-client";
