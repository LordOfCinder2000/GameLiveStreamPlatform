/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileContainerType } from './FileContainerType';

export type PublicFileContainerConfiguration = {
    fileContainerType?: FileContainerType;
    enableAutoRename?: boolean;
    maxByteSizeForEachFile?: number;
    maxByteSizeForEachUpload?: number;
    maxFileQuantityForEachUpload?: number;
    allowOnlyConfiguredFileExtensions?: boolean;
    fileExtensionsConfiguration?: Record<string, boolean | null> | null;
    getDownloadInfoTimesLimitEachUserPerMinute?: number | null;
};
