/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChatRoomBlockTimeType } from './ChatRoomBlockTimeType';
import type { ChatRoomRoleType } from './ChatRoomRoleType';

export type ChannelChatRoomInfoDto = {
    channelId?: string;
    ownerChannelUserName?: string | null;
    role?: ChatRoomRoleType;
    connectedTime?: string | null;
    blockTime?: ChatRoomBlockTimeType;
    followers?: number;
    followings?: number;
};
