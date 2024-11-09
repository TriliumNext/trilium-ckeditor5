/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';
import { BlockToolbar } from '@ckeditor/ckeditor5-ui';
import '../theme/theme.css';
import { COMMON_PLUGINS } from './config';

export default class BalloonEditor extends BalloonEditorBase {
	public static override builtinPlugins = [
		...COMMON_PLUGINS,
		BlockToolbar
	];

	public static override defaultConfig = {
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
		image: {
			styles: {
				options: [
					'inline',
					'alignBlockLeft',
					'alignCenter',
					'alignBlockRight',
					'alignLeft',
					'alignRight',
					'full', // full and side are for BC since the old images have been created with these styles
					'side'
				]
			},
			resizeOptions: [
				{
					name: 'imageResize:original',
					value: null,
					icon: 'original'
				},
				{
					name: 'imageResize:25',
					value: '25',
					icon: 'small'
				},
				{
					name: 'imageResize:50',
					value: '50',
					icon: 'medium'
				},
				{
					name: 'imageResize:75',
					value: '75',
					icon: 'medium'
				}
			],
			toolbar: [
				// Image styles, see https://ckeditor.com/docs/ckeditor5/latest/features/images/images-styles.html#demo.
				'imageStyle:inline',
				'imageStyle:alignCenter',
				{
					name: "imageStyle:wrapText",
					title: "Wrap text",
					items: [
						'imageStyle:alignLeft',
						'imageStyle:alignRight',
					],
					defaultItem: 'imageStyle:alignRight'
				},
				{
					name: "imageStyle:block",
					title: "Block align",
					items: [
						'imageStyle:alignBlockLeft',
						'imageStyle:alignBlockRight'
					],
					defaultItem: "imageStyle:alignBlockLeft",
				},
				'|',
				'imageResize:25',
				'imageResize:50',
				'imageResize:original',
				'|',
				'toggleImageCaption'
			],
			upload: {
				types: [ 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg', 'svg+xml', 'avif' ]
			}
		},
		heading: {
			options: [
				{ model: 'paragraph' as const, title: 'Paragraph', class: 'ck-heading_paragraph' },
				// // heading1 is not used since that should be a note's title
				{ model: 'heading2' as const, view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
				{ model: 'heading3' as const, view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
				{ model: 'heading4' as const, view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
				{ model: 'heading5' as const, view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
				{ model: 'heading6' as const, view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
			]
		},
		blockToolbar: [
			'heading',
			'|',
			'bulletedList', 'numberedList', 'todoList',
			'|',
			'blockQuote', 'codeBlock', 'insertTable', 'internallink', 'includeNote', 'math',
			'|',
			'outdent', 'indent', 'horizontalLine',
			'|',
			'imageUpload',
			'markdownImport',
			'findAndReplace',
			'specialCharacters'
		],
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells',
				'tableProperties',
				'tableCellProperties',
				'toggleTableCaption'
			]
		},
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		link: {
			defaultProtocol: 'https://'
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		language: 'en'
	};
}
