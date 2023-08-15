export default class Uploadfileplugin extends Plugin {
    static get requires(): (typeof FileUploadEditing)[];
    static get pluginName(): string;
}
import { Plugin } from "@ckeditor/ckeditor5-core";
import FileUploadEditing from "./src/fileuploadediting";
