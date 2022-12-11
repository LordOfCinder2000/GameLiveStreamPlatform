/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReCaptchaDto } from '../models/ReCaptchaDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ReCaptchaService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param token 
     * @returns ReCaptchaDto Success
     * @throws ApiError
     */
    public reCaptchaValidateReCaptcha(
token?: string,
): CancelablePromise<ReCaptchaDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/re-captcha/validate-re-captcha',
            query: {
                'token': token,
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
