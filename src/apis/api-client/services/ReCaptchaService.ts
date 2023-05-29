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
     * @param ip 
     * @returns ReCaptchaDto Success
     * @throws ApiError
     */
    public validateReCaptchaToken(
token: string,
ip?: string,
): CancelablePromise<ReCaptchaDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/re-captcha/validate-token',
            query: {
                'token': token,
                'ip': ip,
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
