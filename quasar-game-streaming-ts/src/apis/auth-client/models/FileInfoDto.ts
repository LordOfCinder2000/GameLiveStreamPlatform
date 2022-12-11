/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileType } from './FileType';

export type FileInfoDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    parentId?: string | null;
    fileContainerName?: string | null;
    fileName?: string | null;
    mimeType?: string | null;
    fileType?: FileType;
    subFilesQuantity?: number;
    byteSize?: number;
    hash?: string | null;
    ownerUserId?: string | null;
};
