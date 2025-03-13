/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module block-quote/blockquote
 */

import { Plugin } from 'ckeditor5/src/core.js';

import AdmonitionEditing from './admonitionediting.js';
import AdmonitionUI from './admonitionui.js';

/**
 * The block quote plugin.
 *
 * For more information about this feature check the {@glink api/block-quote package page}.
 *
 * This is a "glue" plugin which loads the {@link module:block-quote/blockquoteediting~BlockQuoteEditing block quote editing feature}
 * and {@link module:block-quote/blockquoteui~BlockQuoteUI block quote UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Admonition extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [ AdmonitionEditing, AdmonitionUI ] as const;
	}

	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'BlockQuote' as const;
	}
}
