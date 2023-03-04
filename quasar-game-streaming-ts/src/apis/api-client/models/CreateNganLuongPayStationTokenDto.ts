/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BankCodeType } from './BankCodeType';
import type { PaymentMethodType } from './PaymentMethodType';

export type CreateNganLuongPayStationTokenDto = {
    paymentMethod: PaymentMethodType;
    bankCode: BankCodeType;
    returnUrl?: string | null;
    notifyUrl?: string | null;
    cancelUrl?: string | null;
    langCode?: string | null;
};
