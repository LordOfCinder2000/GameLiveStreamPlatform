/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UpdateSendMessageRateLimitRuleDto } from './UpdateSendMessageRateLimitRuleDto';

export type UpdateChatRoomSettingDto = {
    sendMessageRateLimitRule: UpdateSendMessageRateLimitRuleDto;
    followerSendMessageOnly: boolean;
};
