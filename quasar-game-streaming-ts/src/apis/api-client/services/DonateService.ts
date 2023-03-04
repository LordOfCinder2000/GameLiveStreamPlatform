/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDonateDto } from '../models/CreateDonateDto';
import type { DonateActionType } from '../models/DonateActionType';
import type { DonateDto } from '../models/DonateDto';
import type { PagedResultDtoOfDonateDto } from '../models/PagedResultDtoOfDonateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DonateService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns DonateDto Success
     * @throws ApiError
     */
    public create(
requestBody?: CreateDonateDto,
): CancelablePromise<DonateDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/donate',
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
     * @param donateAction 
     * @param includeDetails 
     * @param maxCreationTime 
     * @param minCreationTime 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfDonateDto Success
     * @throws ApiError
     */
    public getList(
donateAction: DonateActionType,
includeDetails?: boolean,
maxCreationTime?: string,
minCreationTime?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfDonateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/donate',
            query: {
                'DonateAction': donateAction,
                'IncludeDetails': includeDetails,
                'MaxCreationTime': maxCreationTime,
                'MinCreationTime': minCreationTime,
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
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public giveBack(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/donate/{id}/give-back',
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
     * @returns any Success
     * @throws ApiError
     */
    public test(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/donate/test',
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
