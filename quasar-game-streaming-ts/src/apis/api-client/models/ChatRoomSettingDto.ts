/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SendMessageRateLimitRuleDto } from './SendMessageRateLimitRuleDto';

export type ChatRoomSettingDto = {
    sendMessageRateLimitRule?: SendMessageRateLimitRuleDto;
    followerSendMessageOnly?: boolean;
};
