/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelDto } from './ChannelDto';
import type { ItemSellableDto } from './ItemSellableDto';

export type DonateDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    isDeleted?: boolean;
    deleterId?: string | null;
    deletionTime?: string | null;
    giverChannelId?: string;
    recipientChannelId?: string;
    giftSku?: string | null;
    giftId?: number;
    quantity?: number;
    detail?: string | null;
    gift?: ItemSellableDto;
    giverChannel?: ChannelDto;
    recipientChannel?: ChannelDto;
};
