/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateFileWithStreamInput = {
    readonly extraProperties?: Record<string, any> | null;
    fileContainerName: string;
    parentId?: string | null;
    ownerUserId?: string | null;
    content?: Blob | null;
    generateUniqueFileName?: boolean;
};
