/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import type {
	Admonition,
	AdmonitionCommand,
	AdmonitionEditing,
	AdmonitionUI
} from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Admonition.pluginName ]: Admonition;
		[ AdmonitionEditing.pluginName ]: AdmonitionEditing;
		[ AdmonitionUI.pluginName ]: AdmonitionUI;
	}

	interface CommandsMap {
		admonition: AdmonitionCommand;
	}
}
