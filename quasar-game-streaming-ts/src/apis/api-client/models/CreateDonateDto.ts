/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateDonateDto = {
    recipientChannelId: string;
    giftId: number;
    giftSku: string;
    quantity: number;
    detail?: string | null;
};
