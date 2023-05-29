/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileDownloadInfoModel } from './FileDownloadInfoModel';
import type { FileInfoDto } from './FileInfoDto';

export type CreateFileOutput = {
    readonly extraProperties?: Record<string, any> | null;
    fileInfo?: FileInfoDto;
    downloadInfo?: FileDownloadInfoModel;
};
