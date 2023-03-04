/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreatePaymentItemDto } from './CreatePaymentItemDto';

export type CreatePaymentDto = {
    paymentMethod: string;
    paymentItems: Array<CreatePaymentItemDto>;
};
