/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";

import { AuthCookieService } from "./services/AuthCookieService";
import { LoginService } from "./services/LoginService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class AuthClient {
	public readonly authCookie: AuthCookieService;
	public readonly login: LoginService;

	public readonly request: BaseHttpRequest;

	constructor(
		config?: Partial<OpenAPIConfig>,
		HttpRequest: HttpRequestConstructor = AxiosHttpRequest
	) {
		this.request = new HttpRequest({
			BASE: config?.BASE ?? "",
			VERSION: config?.VERSION ?? "1",
			WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
			CREDENTIALS: config?.CREDENTIALS ?? "include",
			TOKEN: config?.TOKEN,
			USERNAME: config?.USERNAME,
			PASSWORD: config?.PASSWORD,
			HEADERS: config?.HEADERS,
			ENCODE_PATH: config?.ENCODE_PATH,
		});

		this.authCookie = new AuthCookieService(this.request);
		this.login = new LoginService(this.request);
	}
}
