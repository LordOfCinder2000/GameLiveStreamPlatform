/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastAMSDto } from '../models/BroadcastAMSDto';
import type { BroadcastDto } from '../models/BroadcastDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StreamService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns BroadcastAMSDto Success
     * @throws ApiError
     */
    public createMyBroadcast(
requestBody?: BroadcastDto,
): CancelablePromise<BroadcastAMSDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/stream/my-broadcast',
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
     * @returns BroadcastAMSDto Success
     * @throws ApiError
     */
    public updateMyBroadcast(
requestBody?: BroadcastAMSDto,
): CancelablePromise<BroadcastAMSDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/app/stream/my-broadcast',
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
     * @returns any Success
     * @throws ApiError
     */
    public deleteMyBroadcast(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/app/stream/my-broadcast',
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
     * @returns BroadcastDto Success
     * @throws ApiError
     */
    public getListMyBroadcast(): CancelablePromise<Array<BroadcastDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/stream/my-broadcast',
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
