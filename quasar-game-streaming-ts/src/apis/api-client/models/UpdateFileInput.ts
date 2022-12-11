/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateFileInput = {
    readonly extraProperties?: Record<string, any> | null;
    fileName: string;
    mimeType?: string | null;
    content?: string | null;
};
