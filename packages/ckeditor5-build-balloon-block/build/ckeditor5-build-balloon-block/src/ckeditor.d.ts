/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { BalloonEditor as BalloonEditorBase } from '@ckeditor/ckeditor5-editor-balloon';
import '../theme/theme.css';
export default class BalloonEditor extends BalloonEditorBase {
    static builtinPlugins: any[];
    static defaultConfig: {
        toolbar: {
            items: string[];
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
        blockToolbar: string[];
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
