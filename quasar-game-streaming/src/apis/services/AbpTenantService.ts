/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FindTenantResultDto } from '../models/FindTenantResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AbpTenantService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param name 
     * @returns FindTenantResultDto Success
     * @throws ApiError
     */
    public abpTenantFindTenantByName(
name: string,
): CancelablePromise<FindTenantResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/multi-tenancy/tenants/by-name/{name}',
            path: {
                'name': name,
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

    /**
     * @param id 
     * @returns FindTenantResultDto Success
     * @throws ApiError
     */
    public abpTenantFindTenantById(
id: string,
): CancelablePromise<FindTenantResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/abp/multi-tenancy/tenants/by-id/{id}',
            path: {
                'id': id,
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
