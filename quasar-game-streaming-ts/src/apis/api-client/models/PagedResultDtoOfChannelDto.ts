/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelDto } from './ChannelDto';

export type PagedResultDtoOfChannelDto = {
    items?: Array<ChannelDto> | null;
    totalCount?: number;
};
