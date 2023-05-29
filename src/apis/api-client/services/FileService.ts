/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFileInput } from '../models/CreateFileInput';
import type { CreateFileOutput } from '../models/CreateFileOutput';
import type { CreateManyFileInput } from '../models/CreateManyFileInput';
import type { CreateManyFileOutput } from '../models/CreateManyFileOutput';
import type { FileDownloadInfoModel } from '../models/FileDownloadInfoModel';
import type { FileDownloadOutput } from '../models/FileDownloadOutput';
import type { FileInfoDto } from '../models/FileInfoDto';
import type { FileType } from '../models/FileType';
import type { MoveFileInput } from '../models/MoveFileInput';
import type { PagedResultDtoOfFileInfoDto } from '../models/PagedResultDtoOfFileInfoDto';
import type { PublicFileContainerConfiguration } from '../models/PublicFileContainerConfiguration';
import type { UpdateFileInfoInput } from '../models/UpdateFileInfoInput';
import type { UpdateFileInput } from '../models/UpdateFileInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FileService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public get(
id: string,
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file/{id}',
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
     * @returns any Success
     * @throws ApiError
     */
    public delete(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/file-management/file/{id}',
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
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public actionUpdate(
id: string,
formData?: {
FileName: string;
File?: Blob;
ExtraProperties?: Record<string, any>;
},
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/file-management/file/{id}',
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
     * @param fileContainerName 
     * @param parentId 
     * @param ownerUserId 
     * @param directoryOnly 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfFileInfoDto Success
     * @throws ApiError
     */
    public getList(
fileContainerName: string,
parentId?: string,
ownerUserId?: string,
directoryOnly?: boolean,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfFileInfoDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file',
            query: {
                'ParentId': parentId,
                'FileContainerName': fileContainerName,
                'OwnerUserId': ownerUserId,
                'DirectoryOnly': directoryOnly,
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
     * @param formData 
     * @returns CreateFileOutput Success
     * @throws ApiError
     */
    public actionCreate(
formData?: {
FileContainerName: string;
FileType?: FileType;
ParentId?: string;
OwnerUserId?: string;
File?: Blob;
GenerateUniqueFileName?: boolean;
ExtraProperties?: Record<string, any>;
},
): CancelablePromise<CreateFileOutput> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/file-management/file',
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
     * @param requestBody 
     * @returns CreateFileOutput Success
     * @throws ApiError
     */
    public create(
requestBody?: CreateFileInput,
): CancelablePromise<CreateFileOutput> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/file-management/file/with-bytes',
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
     * @param fileContainerName 
     * @param generateUniqueFileName 
     * @param parentId 
     * @param ownerUserId 
     * @param extraProperties 
     * @param formData 
     * @returns CreateFileOutput Success
     * @throws ApiError
     */
    public createWithStream(
fileContainerName: string,
generateUniqueFileName?: boolean,
parentId?: string,
ownerUserId?: string,
extraProperties?: Record<string, any>,
formData?: {
Content?: Blob;
},
): CancelablePromise<CreateFileOutput> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/file-management/file/with-stream',
            query: {
                'GenerateUniqueFileName': generateUniqueFileName,
                'FileContainerName': fileContainerName,
                'ParentId': parentId,
                'OwnerUserId': ownerUserId,
                'ExtraProperties': extraProperties,
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
     * @param requestBody 
     * @returns CreateManyFileOutput Success
     * @throws ApiError
     */
    public createMany(
requestBody?: CreateManyFileInput,
): CancelablePromise<CreateManyFileOutput> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/file-management/file/many/with-bytes',
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
     * @param fileContainerName 
     * @param generateUniqueFileName 
     * @param parentId 
     * @param ownerUserId 
     * @param extraProperties 
     * @param formData 
     * @returns CreateManyFileOutput Success
     * @throws ApiError
     */
    public createManyWithStream(
fileContainerName: string,
generateUniqueFileName?: boolean,
parentId?: string,
ownerUserId?: string,
extraProperties?: Record<string, any>,
formData?: {
FileContents?: Array<Blob>;
},
): CancelablePromise<CreateManyFileOutput> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/file-management/file/many/with-stream',
            query: {
                'GenerateUniqueFileName': generateUniqueFileName,
                'FileContainerName': fileContainerName,
                'ParentId': parentId,
                'OwnerUserId': ownerUserId,
                'ExtraProperties': extraProperties,
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
     * @param formData 
     * @returns CreateManyFileOutput Success
     * @throws ApiError
     */
    public actionCreateMany(
formData?: {
FileContainerName: string;
FileType?: FileType;
ParentId?: string;
OwnerUserId?: string;
Files?: Array<Blob>;
GenerateUniqueFileName?: boolean;
ExtraProperties?: Record<string, any>;
},
): CancelablePromise<CreateManyFileOutput> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/file-management/file/many',
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
     * @param requestBody 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public update(
id: string,
requestBody?: UpdateFileInput,
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/file-management/file/{id}/with-bytes',
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
     * @param extraProperties 
     * @param formData 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public updateWithStream(
id: string,
extraProperties?: Record<string, any>,
formData?: {
Content?: Blob;
},
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/file-management/file/{id}/with-stream',
            path: {
                'id': id,
            },
            query: {
                'ExtraProperties': extraProperties,
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
     * @param requestBody 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public move(
id: string,
requestBody?: MoveFileInput,
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/file-management/file/{id}/move',
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
     * @returns FileDownloadInfoModel Success
     * @throws ApiError
     */
    public getDownloadInfo(
id: string,
): CancelablePromise<FileDownloadInfoModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file/{id}/download-info',
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
     * @param requestBody 
     * @returns FileInfoDto Success
     * @throws ApiError
     */
    public updateInfo(
id: string,
requestBody?: UpdateFileInfoInput,
): CancelablePromise<FileInfoDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/file-management/file/{id}/info',
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
     * @param token 
     * @returns FileDownloadOutput Success
     * @throws ApiError
     */
    public download(
id: string,
token?: string,
): CancelablePromise<FileDownloadOutput> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file/{id}/download/with-bytes',
            path: {
                'id': id,
            },
            query: {
                'token': token,
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
     * @param token 
     * @returns binary Success
     * @throws ApiError
     */
    public downloadWithStream(
id: string,
token?: string,
): CancelablePromise<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file/{id}/download/with-stream',
            path: {
                'id': id,
            },
            query: {
                'token': token,
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
     * @param token 
     * @returns void 
     * @throws ApiError
     */
    public actionDownload(
id: string,
token?: string,
): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file/{id}/download',
            path: {
                'id': id,
            },
            query: {
                'token': token,
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
     * @param fileContainerName 
     * @param ownerUserId 
     * @returns PublicFileContainerConfiguration Success
     * @throws ApiError
     */
    public getConfiguration(
fileContainerName?: string,
ownerUserId?: string,
): CancelablePromise<PublicFileContainerConfiguration> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/file-management/file/configuration',
            query: {
                'fileContainerName': fileContainerName,
                'ownerUserId': ownerUserId,
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
