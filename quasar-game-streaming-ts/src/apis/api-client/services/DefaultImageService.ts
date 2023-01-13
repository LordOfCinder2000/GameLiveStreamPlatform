/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileInfoDto } from '../models/FileInfoDto';
import type { UploadDefaultImageDto } from '../models/UploadDefaultImageDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultImageService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public upload(
requestBody?: UploadDefaultImageDto,
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/default-image/upload',
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
     * @param fileTypeName 
     * @returns void 
     * @throws ApiError
     */
    public get(
fileTypeName: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/default-image/{fileTypeName}',
            path: {
                'fileTypeName': fileTypeName,
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
