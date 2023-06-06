import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
import ProgressBarView from "../theme/progressbarview";

import '../theme/fileupload.css';

export default class FileUploadProgress extends Plugin {
	static get pluginName() {
		return 'fileUploadProgress';
	}

	init() {
		const editor = this.editor;
		// Upload status change - update file's view according to that status.
		editor.editing.downcastDispatcher.on(
			'attribute:uploadStatus:$text',
			(...args) => this.uploadStatusChange(...args)
		);
	}

	uploadStatusChange(evt, data, conversionApi) {
		const editor = this.editor;
		const modelItem = data.item;

		const fileRepository = editor.plugins.get(FileRepository);
		const uploadId = modelItem.getAttribute('uploadId');
		const status = uploadId ? data.attributeNewValue : null

		if (!conversionApi.consumable.consume(data.item, evt.name)) {
			return;
		}

		// Show progress bar on the top of the file when the file is uploading.
		if (status === 'reading') {
			const loader = fileRepository.loaders.get(uploadId);
			this.progressBar = _showProgressBar(editor, loader);

			return;
		}

		return;
	}
}

function _createProgressBar(locale) {
	return new ProgressBarView(locale);
}

function _showProgressBar(editor, loader) {
	const progressBar = _createProgressBar(editor.locale);
	const toolbar = editor.ui.view.stickyPanel;
	progressBar.render();

	toolbar.element.append(progressBar.element);

	progressBar.on('cancel', () => {
		try {
			loader.abort();
		} catch {
			console.warn('Loader already aborted.')
		}

		_removeProgressBar(toolbar, progressBar);
	});

	loader.on('change:uploadedPercent', (evt, name, value) => {
		progressBar.set('customWidth', value);
	});

	loader.on('change:uploadResponse', (evt, name, value) => {
		if (value) {
			_removeProgressBar(toolbar, progressBar);
		}
	});

	return progressBar;
}

function _removeProgressBar(toolbar, progressBar) {
	toolbar.element.removeChild(progressBar.element);
	progressBar.destroy();
}

