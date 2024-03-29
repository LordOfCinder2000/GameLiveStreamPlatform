/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConfirmEmailCodeDto } from '../models/ConfirmEmailCodeDto';
import type { SendEmailConfirmCodeDto } from '../models/SendEmailConfirmCodeDto';
import type { SendEmailDto } from '../models/SendEmailDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EmailService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public sendEmail(
requestBody?: SendEmailDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/email/send-email',
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
     * @param password 
     * @returns string Success
     * @throws ApiError
     */
    public encryptionPassword(
password: string = 'qjlptyuxeqepylwh',
): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/email/encryption-password',
            query: {
                'password': password,
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
     * @returns any Success
     * @throws ApiError
     */
    public sendEmailConfirmCode(
requestBody?: SendEmailConfirmCodeDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/email/send-email-confirm-code',
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
    public sendEmailResetPasswordCode(
requestBody?: SendEmailConfirmCodeDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/email/send-email-reset-password-code',
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
    public confirmEmailCode(
requestBody?: ConfirmEmailCodeDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/email/confirm-email-code',
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
