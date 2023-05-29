/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbpLoginResult } from '../models/AbpLoginResult';
import type { UserLoginInfo } from '../models/UserLoginInfo';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LoginService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns AbpLoginResult Success
     * @throws ApiError
     */
    public login(
requestBody?: UserLoginInfo,
): CancelablePromise<AbpLoginResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/login',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns any Success
     * @throws ApiError
     */
    public logout(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/logout',
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
     * @returns AbpLoginResult Success
     * @throws ApiError
     */
    public checkPassword(
requestBody?: UserLoginInfo,
): CancelablePromise<AbpLoginResult> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/check-password',
            body: requestBody,
            mediaType: 'application/json',
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
