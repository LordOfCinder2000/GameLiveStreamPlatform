/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemSellableDto } from '../models/ItemSellableDto';
import type { PagedResultDtoOfGiftGroupDto } from '../models/PagedResultDtoOfGiftGroupDto';
import type { PagedResultDtoOfItemSellableDto } from '../models/PagedResultDtoOfItemSellableDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ItemService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param sku 
     * @returns ItemSellableDto Success
     * @throws ApiError
     */
    public getVirtualCurrencyPackageBySku(
sku: string,
): CancelablePromise<ItemSellableDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/item/virtual-currency-package-by-sku',
            query: {
                'sku': sku,
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
     * @param locale 
     * @param country 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfItemSellableDto Success
     * @throws ApiError
     */
    public getListVirtualCurrencyPackage(
locale?: string,
country?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfItemSellableDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/item/virtual-currency-package',
            query: {
                'Locale': locale,
                'Country': country,
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
     * @param sku 
     * @returns ItemSellableDto Success
     * @throws ApiError
     */
    public getBySku(
sku: string,
): CancelablePromise<ItemSellableDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/item/by-sku',
            query: {
                'sku': sku,
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
     * @returns ItemSellableDto Success
     * @throws ApiError
     */
    public getById(
id: number,
): CancelablePromise<ItemSellableDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/item/{id}/by-id',
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
     * @param giftGroupId 
     * @param locale 
     * @param country 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfItemSellableDto Success
     * @throws ApiError
     */
    public getListGiftByGroupId(
giftGroupId: string,
locale?: string,
country?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfItemSellableDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/item/gift-by-group-id/{giftGroupId}',
            path: {
                'giftGroupId': giftGroupId,
            },
            query: {
                'Locale': locale,
                'Country': country,
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
     * @returns PagedResultDtoOfGiftGroupDto Success
     * @throws ApiError
     */
    public getListGiftGroups(): CancelablePromise<PagedResultDtoOfGiftGroupDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/item/gift-groups',
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
