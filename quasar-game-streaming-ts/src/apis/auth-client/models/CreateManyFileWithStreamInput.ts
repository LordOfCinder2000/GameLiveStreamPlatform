/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateManyFileWithStreamInput = {
    readonly extraProperties?: Record<string, any> | null;
    fileContainerName: string;
    parentId?: string | null;
    ownerUserId?: string | null;
    fileContents?: Array<Blob> | null;
    generateUniqueFileName?: boolean;
};
