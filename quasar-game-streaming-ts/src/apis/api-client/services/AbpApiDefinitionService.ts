/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationApiDescriptionModel } from '../models/ApplicationApiDescriptionModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AbpApiDefinitionService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param includeTypes 
     * @returns ApplicationApiDescriptionModel Success
     * @throws ApiError
     */
    public get(
includeTypes?: boolean,
): CancelablePromise<ApplicationApiDescriptionModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/api-definition',
            query: {
                'IncludeTypes': includeTypes,
            },
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
