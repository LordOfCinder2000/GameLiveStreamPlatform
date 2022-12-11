/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FileManagerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns binary Success
     * @throws ApiError
     */
    public fileManagerDownload(
id: string,
): CancelablePromise<Blob> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/file-manager/{id}/download',
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
     * @param id 
     * @param formData 
     * @returns any Success
     * @throws ApiError
     */
    public fileManagerUpload(
id: string,
formData?: {
streamContent?: Blob;
},
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/file-manager/{id}/upload',
            path: {
                'id': id,
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
     * @param id 
     * @param formData 
     * @returns any Success
     * @throws ApiError
     */
    public fileManagerCreateFile(
id?: string,
formData?: {
Content?: Blob;
},
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/file-manager/file',
            query: {
                'Id': id,
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
     * @param id 
     * @param formData 
     * @returns any Success
     * @throws ApiError
     */
    public fileManagerCreateMultipleFile(
id?: string,
formData?: {
Contents?: Array<Blob>;
},
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/file-manager/multiple-file',
            query: {
                'Id': id,
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

}
