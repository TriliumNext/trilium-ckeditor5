export function isHtmlIncluded(dataTransfer: any): boolean;
export default class FileUploadEditing extends Plugin {
    static get requires(): (typeof Notification | typeof FileRepository | typeof Clipboard)[];
    static get pluginName(): string;
    init(): void;
    _readAndUpload(loader: any, fileElement: any): any;
}
import { Plugin } from "@ckeditor/ckeditor5-core";
import { Notification } from "@ckeditor/ckeditor5-ui";
import { FileRepository } from "@ckeditor/ckeditor5-upload";
import { Clipboard } from "@ckeditor/ckeditor5-clipboard";
