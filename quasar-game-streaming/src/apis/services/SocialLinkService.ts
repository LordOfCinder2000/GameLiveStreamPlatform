/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSocialLinkDto } from '../models/CreateSocialLinkDto';
import type { ListResultDtoOfSocialLinkDto } from '../models/ListResultDtoOfSocialLinkDto';
import type { UpdateSocialLinkDto } from '../models/UpdateSocialLinkDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SocialLinkService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ListResultDtoOfSocialLinkDto Success
     * @throws ApiError
     */
    public socialLinkGet(): CancelablePromise<ListResultDtoOfSocialLinkDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/social-link',
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
     * @returns ListResultDtoOfSocialLinkDto Success
     * @throws ApiError
     */
    public socialLinkCreate(
requestBody?: Array<CreateSocialLinkDto>,
): CancelablePromise<ListResultDtoOfSocialLinkDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/social-link',
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
     * @returns any Success
     * @throws ApiError
     */
    public socialLinkUpdate(
id?: string,
requestBody?: UpdateSocialLinkDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/account/social-link',
            query: {
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
     * @returns any Success
     * @throws ApiError
     */
    public socialLinkDelete(
id?: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/account/social-link',
            query: {
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

}
