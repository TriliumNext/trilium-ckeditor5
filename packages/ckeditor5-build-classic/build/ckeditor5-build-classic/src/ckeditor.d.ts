/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
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
import { ImageUpload } from '@ckeditor/ckeditor5-image';
import { ImageResize } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { TodoList } from '@ckeditor/ckeditor5-list';
import { Table } from '@ckeditor/ckeditor5-table';
import { TableProperties } from '@ckeditor/ckeditor5-table';
import { TableCellProperties } from '@ckeditor/ckeditor5-table';
import { TableCaption } from '@ckeditor/ckeditor5-table';
import { TableColumnResize } from '@ckeditor/ckeditor5-table';
import { Font } from '@ckeditor/ckeditor5-font';
import { FontColor } from '@ckeditor/ckeditor5-font';
import { FontBackgroundColor } from '@ckeditor/ckeditor5-font';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { SelectAll } from '@ckeditor/ckeditor5-select-all';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Typing } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import Math from '@triliumnext/ckeditor5-math/src/math';
import MentionCustomization from './mention_customization';
import InternalLinkPlugin from './internallink';
import IncludeNote from './includenote';
import '../theme/theme.css';
import { SpecialCharactersEmoji } from "./special_characters_emoji";
export default class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof Heading | typeof Typing | typeof Superscript | typeof Subscript | typeof Bold | typeof Code | typeof Italic | typeof Strikethrough | typeof Underline | typeof BlockQuote | typeof Undo | typeof Image | typeof ImageCaption | typeof ImageInline | typeof ImageResize | typeof ImageStyle | typeof ImageUpload | typeof Link | typeof List | typeof TodoList | typeof Table | typeof TableCaption | typeof TableCellProperties | typeof TableColumnResize | typeof TableProperties | typeof Font | typeof FontBackgroundColor | typeof FontColor | typeof CodeBlock | typeof Mention | typeof Indent | typeof SelectAll | typeof HorizontalLine | typeof RemoveFormat | typeof SpecialCharactersEssentials | typeof MentionCustomization | typeof InternalLinkPlugin | typeof IncludeNote | typeof SpecialCharactersEmoji | typeof Math)[];
    static defaultConfig: {
        toolbar: {
            items: (string | {
                label: string;
                icon: string;
                items: string[];
            } | {
                label: string;
                items: string[];
                icon?: undefined;
            })[];
        };
        image: {
            styles: {
                options: string[];
            };
            resizeOptions: ({
                name: string;
                value: null;
                icon: string;
            } | {
                name: string;
                value: string;
                icon: string;
            })[];
            toolbar: (string | {
                name: string;
                title: string;
                items: string[];
                defaultItem: string;
            })[];
            upload: {
                types: string[];
            };
        };
        heading: {
            options: ({
                model: "paragraph";
                title: string;
                class: string;
                view?: undefined;
            } | {
                model: "heading2";
                view: string;
                title: string;
                class: string;
            } | {
                model: "heading3";
                view: string;
                title: string;
                class: string;
            } | {
                model: "heading4";
                view: string;
                title: string;
                class: string;
            } | {
                model: "heading5";
                view: string;
                title: string;
                class: string;
            } | {
                model: "heading6";
                view: string;
                title: string;
                class: string;
            })[];
        };
        table: {
            contentToolbar: string[];
        };
        list: {
            properties: {
                styles: boolean;
                startIndex: boolean;
                reversed: boolean;
            };
        };
        link: {
            defaultProtocol: string;
        };
        language: string;
    };
}
