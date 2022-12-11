/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IdentityUserCreateDto } from '../models/IdentityUserCreateDto';
import type { IdentityUserDto } from '../models/IdentityUserDto';
import type { IdentityUserUpdateDto } from '../models/IdentityUserUpdateDto';
import type { IdentityUserUpdateRolesDto } from '../models/IdentityUserUpdateRolesDto';
import type { ListResultDtoOfIdentityRoleDto } from '../models/ListResultDtoOfIdentityRoleDto';
import type { PagedResultDtoOfIdentityUserDto } from '../models/PagedResultDtoOfIdentityUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @param id 
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public get(
id: string,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/{id}',
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
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public update(
id: string,
requestBody?: IdentityUserUpdateDto,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/identity/users/{id}',
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
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public delete(
id: string,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/identity/users/{id}',
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
     * @param filter 
     * @param sorting 
     * @param skipCount 
     * @param maxResultCount 
     * @returns PagedResultDtoOfIdentityUserDto Success
     * @throws ApiError
     */
    public getList(
filter?: string,
sorting?: string,
skipCount?: number,
maxResultCount?: number,
): CancelablePromise<PagedResultDtoOfIdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users',
            query: {
                'Filter': filter,
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
     * @param requestBody 
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public create(
requestBody?: IdentityUserCreateDto,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/identity/users',
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
     * @returns ListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public getRoles(
id: string,
): CancelablePromise<ListResultDtoOfIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/{id}/roles',
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
     * @returns any Success
     * @throws ApiError
     */
    public updateRoles(
id: string,
requestBody?: IdentityUserUpdateRolesDto,
): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/identity/users/{id}/roles',
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
     * @returns ListResultDtoOfIdentityRoleDto Success
     * @throws ApiError
     */
    public getAssignableRoles(): CancelablePromise<ListResultDtoOfIdentityRoleDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/assignable-roles',
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
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public findByUsername(
userName: string,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/by-username/{userName}',
            path: {
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
     * @param email 
     * @returns IdentityUserDto Success
     * @throws ApiError
     */
    public findByEmail(
email: string,
): CancelablePromise<IdentityUserDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/identity/users/by-email/{email}',
            path: {
                'email': email,
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
