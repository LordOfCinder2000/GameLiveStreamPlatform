/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemSellableDto } from './ItemSellableDto';

export type PaymentDto = {
    readonly extraProperties?: Record<string, any> | null;
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    userId?: string;
    paymentMethod?: string | null;
    externalTradingCode?: string | null;
    currency?: string | null;
    originalPaymentAmount?: number;
    paymentDiscount?: number;
    actualPaymentAmount?: number;
    completionTime?: string | null;
    canceledTime?: string | null;
    paymentItems?: Array<ItemSellableDto> | null;
};
