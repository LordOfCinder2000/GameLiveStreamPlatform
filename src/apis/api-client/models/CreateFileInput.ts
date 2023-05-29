/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileType } from './FileType';

export type CreateFileInput = {
    readonly extraProperties?: Record<string, any> | null;
    fileContainerName: string;
    parentId?: string | null;
    ownerUserId?: string | null;
    fileName: string;
    mimeType?: string | null;
    fileType?: FileType;
    content?: string | null;
};
