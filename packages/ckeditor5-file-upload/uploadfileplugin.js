import { Plugin } from 'ckeditor5/src/core';
import FileUploadEditing from './src/fileuploadediting';

export default class Uploadfileplugin extends Plugin {
	static get requires() {
		return [ FileUploadEditing ];
	}

	static get pluginName() {
		return 'fileUploadPlugin';
	}
}
