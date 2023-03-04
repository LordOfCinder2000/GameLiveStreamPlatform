/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VirtualCurrencyDto } from './VirtualCurrencyDto';

export type WalletDto = {
    id?: string;
    userId?: string;
    currencies?: Array<VirtualCurrencyDto> | null;
};
