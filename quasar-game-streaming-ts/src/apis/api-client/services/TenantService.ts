/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PagedResultDtoOfTenantDto } from '../models/PagedResultDtoOfTenantDto';
import type { TenantCreateDto } from '../models/TenantCreateDto';
import type { TenantDto } from '../models/TenantDto';
import type { TenantUpdateDto } from '../models/TenantUpdateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TenantService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns TenantDto Success
     * @throws ApiError
     */
    public get(
id: string,
): CancelablePromise<TenantDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}',
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

    /**
     * @param id 
     * @param requestBody 
     * @returns TenantDto Success
     * @throws ApiError
     */
    public update(
id: string,
requestBody?: TenantUpdateDto,
): CancelablePromise<TenantDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}',
            path: {
                'id': id,
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

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public delete(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}',
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

    /**
     * @param filter 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfTenantDto Success
     * @throws ApiError
     */
    public getList(
filter?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfTenantDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/multi-tenancy/tenants',
            query: {
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @param requestBody 
     * @returns TenantDto Success
     * @throws ApiError
     */
    public create(
requestBody?: TenantCreateDto,
): CancelablePromise<TenantDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/multi-tenancy/tenants',
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

    /**
     * @param id 
     * @returns string Success
     * @throws ApiError
     */
    public getDefaultConnectionString(
id: string,
): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
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

    /**
     * @param id 
     * @param defaultConnectionString 
     * @returns any Success
     * @throws ApiError
     */
    public updateDefaultConnectionString(
id: string,
defaultConnectionString?: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
            path: {
                'id': id,
            },
            query: {
                'defaultConnectionString': defaultConnectionString,
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
     * @returns any Success
     * @throws ApiError
     */
    public deleteDefaultConnectionString(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
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
