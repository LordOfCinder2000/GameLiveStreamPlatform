/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Endpoint } from './Endpoint';
import type { PlayListItem } from './PlayListItem';
import type { PlayListStatusEnum } from './PlayListStatusEnum';
import type { PublishTypeEnum } from './PublishTypeEnum';
import type { StatusEnum } from './StatusEnum';
import type { TypeEnum } from './TypeEnum';

export type BroadcastAMSDto = {
    streamId?: string | null;
    name?: string | null;
    description?: string | null;
    publish?: boolean | null;
    date?: number | null;
    plannedStartDate?: number | null;
    plannedEndDate?: number | null;
    duration?: number | null;
    endPointList?: Array<Endpoint> | null;
    playListItemList?: Array<PlayListItem> | null;
    publicStream?: boolean | null;
    is360?: boolean | null;
    listenerHookURL?: string | null;
    category?: string | null;
    ipAddr?: string | null;
    username?: string | null;
    password?: string | null;
    quality?: string | null;
    speed?: number | null;
    streamUrl?: string | null;
    originAdress?: string | null;
    mp4Enabled?: number | null;
    webMEnabled?: number | null;
    expireDurationMS?: number | null;
    rtmpURL?: string | null;
    zombi?: boolean | null;
    pendingPacketSize?: number | null;
    hlsViewerCount?: number | null;
    webRTCViewerCount?: number | null;
    rtmpViewerCount?: number | null;
    startTime?: number | null;
    receivedBytes?: number | null;
    bitrate?: number | null;
    userAgent?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    altitude?: string | null;
    mainTrackStreamId?: string | null;
    subTrackStreamIds?: Array<string> | null;
    absoluteStartTimeMs?: number | null;
    webRTCViewerLimit?: number | null;
    hlsViewerLimit?: number | null;
    subFolder?: string | null;
    currentPlayIndex?: number | null;
    metaData?: string | null;
    playlistLoopEnabled?: boolean | null;
    status?: StatusEnum;
    playListStatus?: PlayListStatusEnum;
    type?: TypeEnum;
    publishType?: PublishTypeEnum;
};
