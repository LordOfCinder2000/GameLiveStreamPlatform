/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Desktop } from './Desktop';
import type { SizeType } from './SizeType';
import type { ThemeType } from './ThemeType';
import type { VersionType } from './VersionType';

export type Ui = {
    size?: SizeType;
    theme?: ThemeType;
    version?: VersionType;
    desktop?: Desktop;
};
