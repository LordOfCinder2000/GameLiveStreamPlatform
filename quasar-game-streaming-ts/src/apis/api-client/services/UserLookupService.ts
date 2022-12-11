/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListResultDtoOfUserData } from '../models/ListResultDtoOfUserData';
import type { UserData } from '../models/UserData';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserLookupService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param email 
     * @returns any Success
     * @throws ApiError
     */
    public checkDuplicateEmail(
email: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/check-duplicate-email/{email}',
            path: {
                'email': email,
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
     * @param userName 
     * @returns any Success
     * @throws ApiError
     */
    public checkDuplicateUserName(
userName: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/check-duplicate-username/{userName}',
            path: {
                'userName': userName,
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
     * @param email 
     * @returns string Success
     * @throws ApiError
     */
    public findByEmail(
email: string,
): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/by-email/{email}',
            path: {
                'email': email,
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
     * @returns UserData Success
     * @throws ApiError
     */
    public findById(
id: string,
): CancelablePromise<UserData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/{id}',
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
     * @param userName 
     * @returns UserData Success
     * @throws ApiError
     */
    public findByUserName(
userName: string,
): CancelablePromise<UserData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/by-username/{userName}',
            path: {
                'userName': userName,
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
     * @returns ListResultDtoOfUserData Success
     * @throws ApiError
     */
    public search(
filter?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<ListResultDtoOfUserData> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/search',
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
     * @param filter 
     * @returns number Success
     * @throws ApiError
     */
    public getCount(
filter?: string,
): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/lookup/count',
            query: {
                'Filter': filter,
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
