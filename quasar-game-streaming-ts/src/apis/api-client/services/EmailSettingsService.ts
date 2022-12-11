/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailSettingsDto } from '../models/EmailSettingsDto';
import type { SendTestEmailInput } from '../models/SendTestEmailInput';
import type { UpdateEmailSettingsDto } from '../models/UpdateEmailSettingsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EmailSettingsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns EmailSettingsDto Success
     * @throws ApiError
     */
    public get(): CancelablePromise<EmailSettingsDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/setting-management/emailing',
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
    public update(
requestBody?: UpdateEmailSettingsDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/setting-management/emailing',
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
    public sendTestEmail(
requestBody?: SendTestEmailInput,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/setting-management/emailing/send-test-email',
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
