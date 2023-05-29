/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordInput } from '../models/ChangePasswordInput';
import type { FileInfoDto } from '../models/FileInfoDto';
import type { JsonPatchDocument } from '../models/JsonPatchDocument';
import type { ProfileDto } from '../models/ProfileDto';
import type { UpdateProfileDto } from '../models/UpdateProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProfileService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public get(): CancelablePromise<ProfileDto> {
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
    public update(
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
    public patch(
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public changePassword(
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

    /**
     * @param requestBody 
     * @returns ProfileDto Success
     * @throws ApiError
     */
    public patchProperty(
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
     * @param formData 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public uploadProfilePicture(
formData?: {
input?: Blob;
},
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/account/my-profile/profile-picture',
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * @returns void 
     * @throws ApiError
     */
    public getProfilePicture(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/my-profile/profile-picture',
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
     * @returns void 
     * @throws ApiError
     */
    public getProfileByIdPicture(
id: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/account/{id}/profile-picture',
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

}
