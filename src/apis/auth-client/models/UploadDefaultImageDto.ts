/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DefaultImageType } from './DefaultImageType';

export type UploadDefaultImageDto = {
    fileTypeName: DefaultImageType;
    content?: Blob | null;
};
