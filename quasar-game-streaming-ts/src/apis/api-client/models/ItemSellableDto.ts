/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Group } from './Group';
import type { Media } from './Media';
import type { Price } from './Price';
import type { VirtualCurrency } from './VirtualCurrency';
import type { VirtualPrice } from './VirtualPrice';

export type ItemSellableDto = {
    id?: number;
    sku?: string | null;
    name?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    type?: string | null;
    isFree?: boolean;
    price?: Price;
    virtualPrice?: VirtualPrice;
    quantity?: number;
    content?: VirtualCurrency;
    mediaList?: Array<Media> | null;
    groups?: Array<Group> | null;
};
