export default class Uploadfileplugin extends Plugin {
    static get requires(): (typeof FileUploadEditing)[];
    static get pluginName(): string;
}
import { Plugin } from 'ckeditor5/src/core';
import FileUploadEditing from './src/fileuploadediting';
