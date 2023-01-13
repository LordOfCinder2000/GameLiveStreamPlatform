/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelChatRoomActionType } from './ChannelChatRoomActionType';
import type { ChatRoomBlockTimeType } from './ChatRoomBlockTimeType';
import type { ChatRoomRoleType } from './ChatRoomRoleType';

export type ChannelChatRoomActionDto = {
    channelId?: string;
    ownerChannelUserName?: string | null;
    role?: ChatRoomRoleType;
    connectedTime?: string | null;
    blockTime?: ChatRoomBlockTimeType;
    action?: ChannelChatRoomActionType;
};
