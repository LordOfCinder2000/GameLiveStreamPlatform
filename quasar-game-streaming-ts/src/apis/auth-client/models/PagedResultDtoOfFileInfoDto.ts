/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileInfoDto } from './FileInfoDto';

export type PagedResultDtoOfFileInfoDto = {
    items?: Array<FileInfoDto> | null;
    totalCount?: number;
};
