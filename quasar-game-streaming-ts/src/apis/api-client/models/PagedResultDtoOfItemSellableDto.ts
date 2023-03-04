/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemSellableDto } from './ItemSellableDto';

export type PagedResultDtoOfItemSellableDto = {
    items?: Array<ItemSellableDto> | null;
    totalCount?: number;
};
