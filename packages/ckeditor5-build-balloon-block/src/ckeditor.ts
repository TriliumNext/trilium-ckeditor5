/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold } from '@ckeditor/ckeditor5-basic-styles';
import { Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Superscript } from '@ckeditor/ckeditor5-basic-styles';
import { Subscript } from '@ckeditor/ckeditor5-basic-styles';
import { Underline } from '@ckeditor/ckeditor5-basic-styles';
import { Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { Code } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image } from '@ckeditor/ckeditor5-image';
import { ImageCaption } from '@ckeditor/ckeditor5-image';
import { ImageStyle } from '@ckeditor/ckeditor5-image';
import { ImageToolbar } from '@ckeditor/ckeditor5-image';
import { ImageUpload } from '@ckeditor/ckeditor5-image';
import { ImageResize } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { AutoLink } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { ListProperties } from '@ckeditor/ckeditor5-list';
import { TodoList } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { PictureEditing } from '@ckeditor/ckeditor5-image';
import { Table } from '@ckeditor/ckeditor5-table';
import { TableToolbar } from '@ckeditor/ckeditor5-table';
import { TableProperties } from '@ckeditor/ckeditor5-table';
import { TableCellProperties } from '@ckeditor/ckeditor5-table';
import { TableCaption } from '@ckeditor/ckeditor5-table';
import { TableSelection } from '@ckeditor/ckeditor5-table';
import { TableColumnResize } from '@ckeditor/ckeditor5-table';
import { BlockToolbar } from '@ckeditor/ckeditor5-ui';
import { HeadingButtonsUI } from '@ckeditor/ckeditor5-heading';
import { ParagraphButtonUI } from '@ckeditor/ckeditor5-paragraph';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Font } from '@ckeditor/ckeditor5-font';
import { FontColor } from '@ckeditor/ckeditor5-font';
import { FontBackgroundColor } from '@ckeditor/ckeditor5-font';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { IndentBlock } from '@ckeditor/ckeditor5-indent';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Clipboard } from '@ckeditor/ckeditor5-clipboard';
import { Enter } from '@ckeditor/ckeditor5-enter';
import { ShiftEnter } from '@ckeditor/ckeditor5-enter';
import { Typing } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';
import Uploadfileplugin from "../../ckeditor5-file-upload/uploadfileplugin";

import Math from '@isaul32/ckeditor5-math/src/math';
import AutoformatMath from '@isaul32/ckeditor5-math/src/autoformatmath';

import MentionCustomization from './mention_customization';
import UploadimagePlugin from './uploadimage';
import InternalLinkPlugin from './internallink';
import MarkdownImportPlugin from './markdownimport';
import CuttonotePlugin from './cuttonote';
import IncludeNote from './includenote';
import ReferenceLink from './referencelink';
import indentBlockShortcutPlugin from './indent_block_shortcut';
import removeFormatLinksPlugin from './remove_format_links';

import '../theme/theme.css';

// expose so that Trilium can use it
// eslint-disable-next-line no-undef
(window as any).EditorWatchdog = EditorWatchdog;

export default class BalloonEditor extends BalloonEditorBase {
	public static override builtinPlugins = [
		// essentials package expanded to allow selectively disable Enter and ShiftEnter
		Clipboard, Enter, SelectAll, ShiftEnter, Typing, Undo,
		UploadAdapter,
		Autoformat,
		Bold,
		Italic,
		Underline,
		Strikethrough,
		Code,
		Superscript,
		Subscript,
		BlockQuote,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		ImageResize,
		Link,
		AutoLink,
		List,
		ListProperties,
		TodoList,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Table,
		TableToolbar,
		TableProperties,
		TableCellProperties,
		TableSelection,
		TableCaption,
		TableColumnResize,
		Indent,
		IndentBlock,
		BlockToolbar,
		ParagraphButtonUI,
		HeadingButtonsUI,
		Uploadfileplugin,
		UploadimagePlugin,
		TextTransformation,
		Font,
		FontColor,
		FontBackgroundColor,
		CodeBlock,
		SelectAll,
		HorizontalLine,
		RemoveFormat,
		FindAndReplace,
		Mention,
		InternalLinkPlugin,
		MarkdownImportPlugin,
		CuttonotePlugin,
		MentionCustomization,
		IncludeNote,
		ReferenceLink,
		indentBlockShortcutPlugin,
		removeFormatLinksPlugin,
		Math,
		AutoformatMath
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
			// styles: [
			// 	'alignLeft',
			// 	'alignCenter',
			// 	'alignRight',
			// 	'full', // full and side are for BC since the old images have been created with these styles
			// 	'side'
			// ],
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
				'imageStyle:inline',
				'imageStyle:alignLeft',
				'imageStyle:alignCenter',
				'imageStyle:alignRight',
				'|',
				'imageResize:25',
				'imageResize:50',
				'imageResize:original',
				'|',
				'toggleImageCaption'
			]
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
			'findAndReplace'
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
