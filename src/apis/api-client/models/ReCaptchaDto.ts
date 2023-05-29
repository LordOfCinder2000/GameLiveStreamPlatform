/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ReCaptchaDto = {
    success?: boolean;
    challenge_ts?: string | null;
    hostname?: string | null;
    'error-codes'?: Array<string> | null;
};
