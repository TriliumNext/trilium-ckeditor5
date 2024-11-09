import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

export default class UploadimagePlugin extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ FileRepository ];
	}

	static get pluginName() {
		return 'UploadimagePlugin';
	}

	init() {
		this.editor.plugins.get('FileRepository').createUploadAdapter = loader => new Adapter(loader);
	}
}

class Adapter {
	/**
	 * Creates a new adapter instance.
	 *
	 * @param {module:upload/filerepository~FileLoader} loader
	 */
	constructor(loader) {
		/**
		 * FileLoader instance to use during the upload.
		 *
		 * @member {module:upload/filerepository~FileLoader} #loader
		 */
		this.loader = loader;
	}

	/**
	 * Starts the upload process.
	 *
	 * @see module:upload/filerepository~Adapter#upload
	 * @returns {Promise}
	 */
	upload() {
		return this.loader.file
			.then( file => new Promise( ( resolve, reject ) => {
				this._initRequest().then(() => {
					this._initListeners( resolve, reject, file );
					this._sendRequest( file );
				});
			} ) );
	}

	/**
	 * Aborts the upload process.
	 *
	 * @see module:upload/filerepository~Adapter#abort
	 * @returns {Promise}
	 */
	abort() {
		if (this.xhr) {
			this.xhr.abort();
		}
	}

	/**
	 * Initializes the XMLHttpRequest object.
	 *
	 * @private
	 */
	_initRequest() {
		return glob.getHeaders().then(headers => {
			const xhr = this.xhr = new XMLHttpRequest();

			const {noteId} = glob.getActiveContextNote();

			// this must be a relative path
			const url = `api/notes/${noteId}/attachments/upload`;

			xhr.open('POST', url, true);
			xhr.responseType = 'json';

			for (const headerName in headers) {
				xhr.setRequestHeader(headerName, headers[headerName]);
			}
		});
	}

	/**
	 * Initializes XMLHttpRequest listeners.
	 *
	 * @private
	 * @param {Function} resolve Callback function to be called when the request is successful.
	 * @param {Function} reject Callback function to be called when the request cannot be completed.
	 */
	async _initListeners(resolve, reject) {
		const xhr = this.xhr;
		const loader = this.loader;
		const file = await loader.file;
		const genericError = 'Cannot upload file:' + ` ${file.name}.`;

		xhr.addEventListener('error', () => reject(genericError));
		xhr.addEventListener('abort', () => reject());
		xhr.addEventListener('load', () => {
			const response = xhr.response;

			if (!response || !response.uploaded) {
				return reject(response && response.error && response.error.message ? response.error.message : genericError);
			}

			resolve({
				default: response.url
			});
		});

		// Upload progress when it's supported.
		/* istanbul ignore else */
		if (xhr.upload) {
			xhr.upload.addEventListener('progress', evt => {
				if (evt.lengthComputable) {
					loader.uploadTotal = evt.total;
					loader.uploaded = evt.loaded;
				}
			});
		}
	}

	/**
	 * Prepares the data and sends the request.
	 *
	 * @private
	 */
	async _sendRequest() {
		// Prepare form data.
		const data = new FormData();
		data.append('upload', await this.loader.file);

		// Send request.
		this.xhr.send(data);
	}
}
