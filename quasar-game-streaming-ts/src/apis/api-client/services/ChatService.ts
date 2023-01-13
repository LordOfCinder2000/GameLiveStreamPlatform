/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateChatMessageDto } from '../models/CreateChatMessageDto';
import type { SendMessageInput } from '../models/SendMessageInput';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChatService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public sendMessage(
requestBody?: SendMessageInput,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/chat/send-message',
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
     * @param connectionId 
     * @param roomId 
     * @returns any Success
     * @throws ApiError
     */
    public joinChatRoom(
connectionId: string,
roomId?: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/chat/join-chat-room/{connectionId}',
            path: {
                'connectionId': connectionId,
            },
            query: {
                'roomId': roomId,
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
     * @param connectionId 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public sendMessageToChatRoom(
connectionId: string,
requestBody?: CreateChatMessageDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/chat/send-message-to-chat-room/{connectionId}',
            path: {
                'connectionId': connectionId,
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
     * @param connectionId 
     * @param roomId 
     * @returns any Success
     * @throws ApiError
     */
    public leaveChatRoom(
connectionId: string,
roomId?: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/chat/leave-chat-room/{connectionId}',
            path: {
                'connectionId': connectionId,
            },
            query: {
                'roomId': roomId,
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
