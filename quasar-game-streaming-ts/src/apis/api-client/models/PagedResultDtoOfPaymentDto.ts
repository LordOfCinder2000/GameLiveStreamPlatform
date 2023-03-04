/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentDto } from './PaymentDto';

export type PagedResultDtoOfPaymentDto = {
    items?: Array<PaymentDto> | null;
    totalCount?: number;
};
