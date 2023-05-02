/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
export default class BalloonEditor extends BalloonEditorBase {
    static builtinPlugins: any[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        image: {
            resizeOptions: ({
                name: string;
                value: null;
                icon: string;
            } | {
                name: string;
                value: string;
                icon: string;
            })[];
            toolbar: string[];
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
