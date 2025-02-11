/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';
import { BlockToolbar } from '@ckeditor/ckeditor5-ui';
import '../theme/theme.css';
import { COMMON_PLUGINS, COMMON_SETTINGS } from './config';

//@ts-ignore
export default class BalloonEditor extends BalloonEditorBase {
	public static override builtinPlugins = [
		...COMMON_PLUGINS,
		BlockToolbar
	];
}
