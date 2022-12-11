/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationConfigurationDto } from '../models/ApplicationConfigurationDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AbpApplicationConfigurationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ApplicationConfigurationDto Success
     * @throws ApiError
     */
    public abpApplicationConfigurationGet(): CancelablePromise<ApplicationConfigurationDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/application-configuration',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

}
