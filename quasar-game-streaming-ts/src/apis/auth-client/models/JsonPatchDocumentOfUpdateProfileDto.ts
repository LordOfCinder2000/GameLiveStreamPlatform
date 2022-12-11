/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { IContractResolver } from './IContractResolver';
import type { OperationOfUpdateProfileDto } from './OperationOfUpdateProfileDto';

export type JsonPatchDocumentOfUpdateProfileDto = {
    readonly operations?: Array<OperationOfUpdateProfileDto> | null;
    contractResolver?: IContractResolver;
};
