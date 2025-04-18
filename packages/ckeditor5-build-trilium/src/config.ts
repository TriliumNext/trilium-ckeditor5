import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
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
import { Image, ImageInline } from '@ckeditor/ckeditor5-image';
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
import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import Uploadfileplugin from "../../ckeditor5-file-upload/uploadfileplugin";
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { TextPartLanguage } from "@ckeditor/ckeditor5-language";
import { Style } from "../../ckeditor5-style";

import MentionCustomization from './mention_customization';
import UploadimagePlugin from './uploadimage';
import InternalLinkPlugin from './internallink';
import ItalicAsEmPlugin from './italic_as_em';
import MarkdownImportPlugin from './markdownimport';
import CuttonotePlugin from './cuttonote';
import IncludeNote from './includenote';
import ReferenceLink from './referencelink';
import indentBlockShortcutPlugin from './indent_block_shortcut';
import removeFormatLinksPlugin from './remove_format_links';

import {SpecialCharactersEmoji} from "./special_characters_emoji";

// External plugins
import { Math, AutoformatMath } from '../../ckeditor5-math/src/index';

import { Mermaid } from "../../ckeditor5-mermaid/src/index";

import '../../ckeditor5-footnotes/src/footnote.css';
import { Footnotes } from '../../ckeditor5-footnotes';
import Kbd from "../../ckeditor5-keyboard-marker/src/Kbd";
import { Admonition } from "../../ckeditor5-admonition";
import StrikethroughAsDel from './strikethrough_as_del';

export const COMMON_PLUGINS = [
	// essentials package expanded to allow selectively disable Enter and ShiftEnter
	Clipboard, Enter, SelectAll, ShiftEnter, Typing, Undo,
	CKFinderUploadAdapter,
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
	ImageInline,
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
	SpecialCharacters,
	SpecialCharactersEssentials,
	SpecialCharactersEmoji,
	FindAndReplace,
	Mention,
	InternalLinkPlugin,
	ItalicAsEmPlugin,
	StrikethroughAsDel,
	MarkdownImportPlugin,
	CuttonotePlugin,
	MentionCustomization,
	IncludeNote,
	ReferenceLink,
	indentBlockShortcutPlugin,
	removeFormatLinksPlugin,
	PageBreak,
	GeneralHtmlSupport,
	TextPartLanguage,
	Style,

	// External plugins
	Math,
	AutoformatMath,
	Footnotes,
	Mermaid,
	Kbd,
	Admonition
];

export const COMMON_SETTINGS = { };
