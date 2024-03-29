/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdentityUserDto } from '../models/IdentityUserDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { RegisterValidateDto } from '../models/RegisterValidateDto';
import type { RegisterWithCodeDto } from '../models/RegisterWithCodeDto';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { SendPasswordResetCodeDto } from '../models/SendPasswordResetCodeDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AccountService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public register(
requestBody?: RegisterDto,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/register',
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public sendPasswordResetCode(
requestBody?: SendPasswordResetCodeDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/send-password-reset-code',
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public resetPassword(
requestBody?: ResetPasswordDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/reset-password',
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
     * @param requestBody 
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public registerWithCode(
requestBody?: RegisterWithCodeDto,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/account/register-with-code',
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public validateRegisterData(
requestBody?: RegisterValidateDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/account/validate-register-data',
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
