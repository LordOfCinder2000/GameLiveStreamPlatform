/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DefaultImageType } from '../models/DefaultImageType';
import type { FileInfoDto } from '../models/FileInfoDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultImageService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param fileTypeName 
     * @param formData 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public upload(
fileTypeName: DefaultImageType,
formData?: {
Content?: Blob;
},
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/default-image/upload',
            query: {
                'FileTypeName': fileTypeName,
            },
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
