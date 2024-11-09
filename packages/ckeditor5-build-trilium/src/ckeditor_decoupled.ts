/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { DecoupledEditor as DecoupledEditorBase } from '@ckeditor/ckeditor5-editor-decoupled';
import '../theme/theme.css';
import { COMMON_PLUGINS, COMMON_SETTINGS } from './config';

export default class DecoupledEditor extends DecoupledEditorBase {
	public static override builtinPlugins = [
		...COMMON_PLUGINS,
	];

	public static override defaultConfig = {
		...COMMON_SETTINGS,

		// For nested toolbars, refer to https://ckeditor.com/docs/ckeditor5/latest/getting-started/setup/toolbar.html#grouping-toolbar-items-in-dropdowns-nested-toolbars.
		toolbar: {
			items: [
				'heading',
				'fontSize',
				'|',
				'bold',
				'italic',
				{
					label: "Text formatting",
					icon: "text",
					items: [
						'underline',
						'strikethrough',
						'superscript',
						'subscript',
						'code',
					],
				},
				'|',
				'fontColor',
				'fontBackgroundColor',
				'removeFormat',
				'|',
				'bulletedList', 'numberedList', 'todoList',
				'|',
				'blockQuote',
				'insertTable',
				'codeBlock',
				{
					label: "Insert",
					icon: "plus",
					items: [
						'imageUpload',
						'|',
						'link',
						'internallink',
						'includeNote',
						'|',
						'specialCharacters',
						'math',
						'horizontalLine'
					]
				},
				'|',
				'outdent', 'indent',
				'|',
				'markdownImport',
				'cuttonote'
			]
		}
	};
}
