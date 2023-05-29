/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SocialLinkType } from './SocialLinkType';

export type SocialLinkDto = {
    id?: string;
    url?: string | null;
    socialName?: SocialLinkType;
};
