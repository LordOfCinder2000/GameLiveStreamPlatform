/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChannelChatRoomDto } from '../models/ChannelChatRoomDto';
import type { ChannelChatRoomInfoDto } from '../models/ChannelChatRoomInfoDto';
import type { ChatRoomBlockTimeType } from '../models/ChatRoomBlockTimeType';
import type { ChatRoomDto } from '../models/ChatRoomDto';
import type { ChatRoomSettingDto } from '../models/ChatRoomSettingDto';
import type { CreateChatRoomDto } from '../models/CreateChatRoomDto';
import type { JsonPatchDocument } from '../models/JsonPatchDocument';
import type { PagedResultDtoOfChannelChatRoomDto } from '../models/PagedResultDtoOfChannelChatRoomDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChatRoomService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns ChatRoomSettingDto Success
     * @throws ApiError
     */
    public getSetting(
id: string,
): CancelablePromise<ChatRoomSettingDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/{id}/setting',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns ChatRoomSettingDto Success
     * @throws ApiError
     */
    public patchSetting(
id: string,
requestBody?: JsonPatchDocument,
): CancelablePromise<ChatRoomSettingDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/app/chat-room/{id}/setting',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public create(
requestBody?: CreateChatRoomDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room',
            body: requestBody,
            mediaType: 'application/json-patch+json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param chatRoomId 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfChannelChatRoomDto Success
     * @throws ApiError
     */
    public getListChannelJoined(
chatRoomId: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfChannelChatRoomDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/channel-joined',
            query: {
                'ChatRoomId': chatRoomId,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @param channelId 
     * @returns ChannelChatRoomInfoDto Success
     * @throws ApiError
     */
    public getChannelJoinedInfo(
id: string,
channelId: string,
): CancelablePromise<ChannelChatRoomInfoDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/{id}/channel-joined-info/{channelId}',
            path: {
                'id': id,
                'channelId': channelId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @param channelId 
     * @returns ChannelChatRoomDto Success
     * @throws ApiError
     */
    public setChannelModerator(
id: string,
channelId: string,
): CancelablePromise<ChannelChatRoomDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/app/chat-room/{id}/set-channel-moderator/{channelId}',
            path: {
                'id': id,
                'channelId': channelId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @param channelId 
     * @returns ChannelChatRoomDto Success
     * @throws ApiError
     */
    public unsetChannelModerator(
id: string,
channelId: string,
): CancelablePromise<ChannelChatRoomDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/app/chat-room/{id}/unset-channel-moderator/{channelId}',
            path: {
                'id': id,
                'channelId': channelId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @param channelId 
     * @param blockTime 
     * @returns ChannelChatRoomDto Success
     * @throws ApiError
     */
    public blockChannel(
id: string,
channelId: string,
blockTime: ChatRoomBlockTimeType,
): CancelablePromise<ChannelChatRoomDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/app/chat-room/{id}/block-channel/{channelId}',
            path: {
                'id': id,
                'channelId': channelId,
            },
            query: {
                'blockTime': blockTime,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @param channelId 
     * @returns ChannelChatRoomDto Success
     * @throws ApiError
     */
    public unblockChannel(
id: string,
channelId: string,
): CancelablePromise<ChannelChatRoomDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/app/chat-room/{id}/unblock-channel/{channelId}',
            path: {
                'id': id,
                'channelId': channelId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param adminId 
     * @returns ChatRoomDto Success
     * @throws ApiError
     */
    public getByAdminId(
adminId: string,
): CancelablePromise<ChatRoomDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/by-admin-id/{adminId}',
            path: {
                'adminId': adminId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

    /**
     * @param id 
     * @returns ChannelChatRoomDto Success
     * @throws ApiError
     */
    public getListModerators(
id: string,
): CancelablePromise<Array<ChannelChatRoomDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/{id}/moderators',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }

}
