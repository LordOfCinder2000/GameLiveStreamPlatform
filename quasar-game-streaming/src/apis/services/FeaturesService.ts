/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetFeatureListResultDto } from '../models/GetFeatureListResultDto';
import type { UpdateFeaturesDto } from '../models/UpdateFeaturesDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FeaturesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param providerName 
     * @param providerKey 
     * @returns GetFeatureListResultDto Success
     * @throws ApiError
     */
    public featuresGet(
providerName?: string,
providerKey?: string,
): CancelablePromise<GetFeatureListResultDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/feature-management/features',
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
    public featuresUpdate(
providerName?: string,
providerKey?: string,
requestBody?: UpdateFeaturesDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/feature-management/features',
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
