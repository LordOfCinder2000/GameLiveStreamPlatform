/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordInput } from '../models/ChangePasswordInput';
import type { JsonPatchDocument } from '../models/JsonPatchDocument';
import type { ProfileDto } from '../models/ProfileDto';
import type { UpdateProfileDto } from '../models/UpdateProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProfileService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public profilePatch(
requestBody?: JsonPatchDocument,
): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/account/my-profile',
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
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public profileGet(): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/my-profile',
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
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public profileUpdate(
requestBody?: UpdateProfileDto,
): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/account/my-profile',
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
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public profilePatchProperty(
requestBody?: UpdateProfileDto,
): CancelablePromise<ProfileDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/account/my-profile/property',
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
    public profileChangePassword(
requestBody?: ChangePasswordInput,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/my-profile/change-password',
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
