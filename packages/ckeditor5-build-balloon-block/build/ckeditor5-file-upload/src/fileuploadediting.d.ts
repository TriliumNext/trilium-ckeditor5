export function isHtmlIncluded(dataTransfer: any): boolean;
export default class FileUploadEditing extends Plugin {
    static get requires(): (typeof Notification | typeof FileRepository | typeof Clipboard)[];
    static get pluginName(): string;
    init(): void;
    _readAndUpload(loader: any, fileElement: any): any;
}
import { Plugin } from 'ckeditor5/src/core';
import { Notification } from 'ckeditor5/src/ui';
import { FileRepository } from 'ckeditor5/src/upload';
import { Clipboard } from 'ckeditor5/src/clipboard';
