/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChannelDto } from '../models/ChannelDto';
import type { FollowType } from '../models/FollowType';
import type { PagedResultDtoOfChannelDto } from '../models/PagedResultDtoOfChannelDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChannelService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public addFollowing(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/app/channel/{id}/following',
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
     * @returns any Success
     * @throws ApiError
     */
    public removeFollowing(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/app/channel/{id}/following',
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
     * @param isLive 
     * @param channelId 
     * @param includeDetails 
     * @param filter 
     * @param followType 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfChannelDto Success
     * @throws ApiError
     */
    public getFollowings(
isLive?: boolean,
channelId?: string,
includeDetails?: boolean,
filter?: string,
followType?: FollowType,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfChannelDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/channel/followings',
            query: {
                'IsLive': isLive,
                'ChannelId': channelId,
                'IncludeDetails': includeDetails,
                'Filter': filter,
                'FollowType': followType,
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
     * @param isLive 
     * @param channelId 
     * @param includeDetails 
     * @param filter 
     * @param followType 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfChannelDto Success
     * @throws ApiError
     */
    public getFollowers(
isLive?: boolean,
channelId?: string,
includeDetails?: boolean,
filter?: string,
followType?: FollowType,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfChannelDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/channel/followers',
            query: {
                'IsLive': isLive,
                'ChannelId': channelId,
                'IncludeDetails': includeDetails,
                'Filter': filter,
                'FollowType': followType,
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
     * @returns number Success
     * @throws ApiError
     */
    public getFollowingCount(
id: string,
): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/channel/{id}/following-count',
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
     * @returns number Success
     * @throws ApiError
     */
    public getFollowerCount(
id: string,
): CancelablePromise<number> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/channel/{id}/follower-count',
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
     * @param userName 
     * @returns ChannelDto Success
     * @throws ApiError
     */
    public getByUserName(
userName?: string,
): CancelablePromise<ChannelDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/channel/by-user-name',
            query: {
                'userName': userName,
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
     * @returns ChannelDto Success
     * @throws ApiError
     */
    public get(
id: string,
): CancelablePromise<ChannelDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/app/channel/{id}',
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
