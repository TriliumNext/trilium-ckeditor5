import { Plugin } from 'ckeditor5/src/core';
import FileUploadEditing from './src/fileuploadediting';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import UploadAdapter from '@ckeditor/ckeditor5-build-balloon-block/src/uploadadapter';

export default class Uploadfileplugin extends Plugin {
	static get requires() {
		return [ FileUploadEditing, FileRepository ];
	}

	static get pluginName() {
		return 'fileUploadPlugin';
	}

	init() {
		this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new UploadAdapter(loader);
	}
}
