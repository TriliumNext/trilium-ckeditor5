/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';
import { BlockToolbar } from '@ckeditor/ckeditor5-ui';
import '../theme/theme.css';
import { COMMON_PLUGINS, COMMON_SETTINGS } from './config';

export default class BalloonEditor extends BalloonEditorBase {
	public static override builtinPlugins = [
		...COMMON_PLUGINS,
		BlockToolbar
	];

	public static override defaultConfig = {
		...COMMON_SETTINGS,

		toolbar: {
			items: [
				'fontSize',
				'bold',
				'italic',
				'underline',
				'strikethrough',
				'superscript',
				'subscript',
				'fontColor',
				'fontBackgroundColor',
				'code',
				'link',
				'removeFormat',
				'internallink',
				'cuttonote'
			]
		},

		blockToolbar: [
			'heading',
			'|',
			'bulletedList', 'numberedList', 'todoList',
			'|',
			'blockQuote', 'codeBlock', 'insertTable',
			{
				label: "Insert",
				icon: "plus",
				items: [
					'internallink',
					'includeNote',
					'|',
					'math',
					'horizontalLine',
					'pageBreak'
				]
			},
			'|',
			'outdent', 'indent',
			'|',
			'imageUpload',
			'markdownImport',
			'specialCharacters',
			'findAndReplace'
		]
	};
}
