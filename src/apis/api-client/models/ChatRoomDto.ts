/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ChatRoomDto = {
    id?: string;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    adminId?: string;
    conversation?: boolean;
};
