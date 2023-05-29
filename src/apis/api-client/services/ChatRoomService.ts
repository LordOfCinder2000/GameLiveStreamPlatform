/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateChatRoomDto } from '../models/CreateChatRoomDto';
import type { PagedResultDtoOfChannelDto } from '../models/PagedResultDtoOfChannelDto';
import type { SendMessageRateLimitRuleDto } from '../models/SendMessageRateLimitRuleDto';
import type { UpdateSendMessageRateLimitRuleDto } from '../models/UpdateSendMessageRateLimitRuleDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChatRoomService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns SendMessageRateLimitRuleDto Success
     * @throws ApiError
     */
    public getMessgaeRateLimit(
id: string,
): CancelablePromise<SendMessageRateLimitRuleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/{id}/messgae-rate-limit',
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
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public changeSendMessgaeRateLimit(
requestBody?: UpdateSendMessageRateLimitRuleDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room/change-send-messgae-rate-limit',
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
     * @returns any Success
     * @throws ApiError
     */
    public create(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room',
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
    public createConversation(
requestBody?: CreateChatRoomDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room/conversation',
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
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public setRateLimit(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room/{id}/set-rate-limit',
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
     * @returns any Success
     * @throws ApiError
     */
    public seedRateLimit(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room/seed-rate-limit',
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
     * @returns boolean Success
     * @throws ApiError
     */
    public exist(
id: string,
): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/chat-room/{id}/exist',
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
     * @param chatRoomId 
     * @param includeDetails 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfChannelDto Success
     * @throws ApiError
     */
    public getListChannelJoined(
chatRoomId: string,
includeDetails?: boolean,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfChannelDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/chat-room/channel-joined',
            query: {
                'ChatRoomId': chatRoomId,
                'IncludeDetails': includeDetails,
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

}
