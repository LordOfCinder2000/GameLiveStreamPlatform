/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateFileInput } from './CreateFileInput';

export type CreateManyFileInput = {
    readonly extraProperties?: Record<string, any> | null;
    fileInfos?: Array<CreateFileInput> | null;
};
