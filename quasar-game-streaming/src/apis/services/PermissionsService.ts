/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetPermissionListResultDto } from '../models/GetPermissionListResultDto';
import type { UpdatePermissionsDto } from '../models/UpdatePermissionsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PermissionsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param providerName 
     * @param providerKey 
     * @returns GetPermissionListResultDto Success
     * @throws ApiError
     */
    public permissionsGet(
providerName?: string,
providerKey?: string,
): CancelablePromise<GetPermissionListResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/permission-management/permissions',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
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
     * @param providerName 
     * @param providerKey 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public permissionsUpdate(
providerName?: string,
providerKey?: string,
requestBody?: UpdatePermissionsDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/permission-management/permissions',
            query: {
                'providerName': providerName,
                'providerKey': providerKey,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
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
