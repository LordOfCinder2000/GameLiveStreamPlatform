/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import {
	CancelablePromise,
	BaseHttpRequest,
	OpenAPIConfig,
} from "apis/api-client";
import type { ApiRequestOptions } from "apis/api-client/core/ApiRequestOptions";
import { request as __request } from "./request-fetch";

export class FetchHttpRequest extends BaseHttpRequest {
	constructor(config: OpenAPIConfig) {
		super(config);
	}

	/**
	 * Request method
	 * @param options The request options from the service
	 * @returns CancelablePromise<T>
	 * @throws ApiError
	 */
	public override request<T>(
		options: ApiRequestOptions
	): CancelablePromise<T> {
		return __request(this.config, options);
	}
}
