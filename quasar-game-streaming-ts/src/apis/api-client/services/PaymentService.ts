/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNganLuongPayStationTokenDto } from '../models/CreateNganLuongPayStationTokenDto';
import type { CreatePaymentDto } from '../models/CreatePaymentDto';
import type { CreateXsollaPayStationTokenDto } from '../models/CreateXsollaPayStationTokenDto';
import type { PagedResultDtoOfPaymentDto } from '../models/PagedResultDtoOfPaymentDto';
import type { PaymentDto } from '../models/PaymentDto';
import type { PaymentMethodDto } from '../models/PaymentMethodDto';
import type { PaymentProviderTokenDto } from '../models/PaymentProviderTokenDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class PaymentService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @param requestBody 
     * @returns PaymentProviderTokenDto Success
     * @throws ApiError
     */
    public createNganLuongPayStationToken(
id: string,
requestBody?: CreateNganLuongPayStationTokenDto,
): CancelablePromise<PaymentProviderTokenDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/payment/{id}/ngan-luong-pay-station-token',
            path: {
                'id': id,
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

    /**
     * @param id 
     * @param requestBody 
     * @returns PaymentProviderTokenDto Success
     * @throws ApiError
     */
    public createXsollaPayStationToken(
id: string,
requestBody?: CreateXsollaPayStationTokenDto,
): CancelablePromise<PaymentProviderTokenDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/payment/{id}/xsolla-pay-station-token',
            path: {
                'id': id,
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

    /**
     * @param requestBody 
     * @returns PaymentDto Success
     * @throws ApiError
     */
    public create(
requestBody?: CreatePaymentDto,
): CancelablePromise<PaymentDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/payment',
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
     * @param includeDetails 
     * @param maxCreationTime 
     * @param minCreationTime 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfPaymentDto Success
     * @throws ApiError
     */
    public getList(
includeDetails?: boolean,
maxCreationTime?: string,
minCreationTime?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfPaymentDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/payment',
            query: {
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
     * @returns PaymentMethodDto Success
     * @throws ApiError
     */
    public getListPaymentMethod(): CancelablePromise<Array<PaymentMethodDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/payment/payment-method',
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
     * @param _package 
     * @param currency 
     * @returns void 
     * @throws ApiError
     */
    public test(
_package?: string,
currency?: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/payment/test',
            query: {
                'package': _package,
                'currency': currency,
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
