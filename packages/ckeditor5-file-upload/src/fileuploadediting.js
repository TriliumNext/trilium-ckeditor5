import { Plugin } from 'ckeditor5/src/core';
import { FileRepository } from 'ckeditor5/src/upload';
import { Notification } from 'ckeditor5/src/ui';
import { Clipboard } from 'ckeditor5/src/clipboard';
import { UpcastWriter } from 'ckeditor5/src/engine';

import FileUploadCommand from './fileuploadcommand';

export default class FileUploadEditing extends Plugin {
	static get requires() {
		return [ FileRepository, Notification, Clipboard ];
	}

	static get pluginName() {
		return 'FileUploadEditing';
	}

	init() {
		const editor = this.editor;
		const doc = editor.model.document;
		const conversion = editor.conversion;
		const fileRepository = editor.plugins.get( FileRepository );

		// Register fileUpload command.
		editor.commands.add( 'fileUpload', new FileUploadCommand( editor ) );

		// Register upcast converter for uploadId.
		conversion.for( 'upcast' )
			.attributeToAttribute( {
				view: {
					name: 'a',
					key: 'uploadId'
				},
				model: 'uploadId'
			} );

		this.listenTo( editor.editing.view.document, 'clipboardInput', ( evt, data ) => {
			// Skip if non-empty HTML data is included.
			// https://github.com/ckeditor/ckeditor5-upload/issues/68
			if ( isHtmlIncluded( data.dataTransfer ) ) {
				return;
			}

			const files = Array.from( data.dataTransfer.files );

			editor.model.change( writer => {
				// Set selection to paste target.
				if ( data.targetRanges ) {
					writer.setSelection( data.targetRanges.map( viewRange => editor.editing.mapper.toModelRange( viewRange ) ) );
				}

				if ( files.length ) {
					evt.stop();

					// Upload files after the selection has changed in order to ensure the command's state is refreshed.
					editor.model.enqueueChange( 'default', () => {
						editor.execute( 'fileUpload', { file: files } );
					} );
				}
			} );
		} );

		this.listenTo( editor.plugins.get( Clipboard ), 'inputTransformation', ( evt, data ) => {
			const fetchableFiles = Array.from( editor.editing.view.createRangeIn( data.content ) )
				.filter( value => isLocalFile( value.item ) && !value.item.getAttribute( 'uploadProcessed' ) )
				.map( value => {
					return { promise: fetchLocalFile( value.item ), fileElement: value.item };
				} );

			if ( !fetchableFiles.length ) {
				return;
			}

			const writer = new UpcastWriter();

			for ( const fetchableFile of fetchableFiles ) {
				// Set attribute marking that the file was processed already.
				writer.setAttribute( 'uploadProcessed', true, fetchableFile.fileElement );

				const loader = fileRepository.createLoader( fetchableFile.promise );

				if ( loader ) {
					writer.setAttribute( 'href', '', fetchableFile.fileElement );
					writer.setAttribute( 'uploadId', loader.id, fetchableFile.fileElement );
				}
			}
		} );

		// Prevents from the browser redirecting to the dropped file.
		editor.editing.view.document.on( 'dragover', ( evt, data ) => {
			data.preventDefault();
		} );

		// Upload placeholder files that appeared in the model.
		doc.on( 'change', () => {
			const changes = doc.differ.getChanges( { includeChangesInGraveyard: true } );
			for ( const entry of changes ) {
				if ( entry.type == 'insert' ) {
					const item = entry.position.nodeAfter;
					if ( item ) {
						const isInGraveyard = entry.position.root.rootName == '$graveyard';
						for ( const file of getFileLinksFromChangeItem( editor, item ) ) {
							// Check if the file element still has upload id.
							const uploadId = file.getAttribute( 'uploadId' );
							if ( !uploadId ) {
								continue;
							}

							// Check if the file is loaded on this client.
							const loader = fileRepository.loaders.get( uploadId );

							if ( !loader ) {
								continue;
							}

							if ( isInGraveyard ) {
								// If the file was inserted to the graveyard - abort the loading process.
								loader.abort();
							} else if ( loader.status == 'idle' ) {
								// If the file was inserted into content and has not been loaded yet, start loading it.
								this._readAndUpload( loader, file );
							}
						}
					}
				}
			}
		} );
	}

	_readAndUpload( loader, fileElement ) {
		const editor = this.editor;
		const model = editor.model;
		const t = editor.locale.t;
		const fileRepository = editor.plugins.get( FileRepository );
		const notification = editor.plugins.get( Notification );

		model.enqueueChange( 'transparent', writer => {
			writer.setAttribute( 'uploadStatus', 'reading', fileElement );
		} );

		return loader.read()
			.then( () => {
				const promise = loader.upload();

				model.enqueueChange( 'transparent', writer => {
					writer.setAttribute( 'uploadStatus', 'uploading', fileElement );
				} );

				return promise;
			} )
			.then( data => {
				model.enqueueChange( 'transparent', writer => {
					writer.setAttributes( { uploadStatus: 'complete', href: data.default }, fileElement );
				} );

				clean();

				// wait a bit so that froca has time to load the changes
				return new Promise(res => setTimeout(res, 100));
			} )
			.then(() => {
				// we're correctly updating the model, but the view remains broken,
				// hack around it is to force CKEditor to reload the now updated HTML
				editor.setData(editor.getData());
			})
			.catch( error => {
				// If status is not 'error' nor 'aborted' - throw error, because it means that something else went wrong,
				// it might be a generic error, and it would be real pain to find what is going on.
				if ( loader.status !== 'error' && loader.status !== 'aborted' ) {
					throw error;
				}

				// Might be 'aborted'.
				if ( loader.status == 'error' && error ) {
					notification.showWarning( error, {
						title: t( 'Upload failed' ),
						namespace: 'upload'
					} );
				}

				clean();

				// Permanently remove file from insertion batch.
				model.enqueueChange( 'transparent', writer => {
					writer.remove( fileElement );
				} );
			} );

		function clean() {
			model.enqueueChange( 'transparent', writer => {
				writer.removeAttribute( 'uploadId', fileElement );
				writer.removeAttribute( 'uploadStatus', fileElement );
			} );

			fileRepository.destroyLoader( loader );
		}
	}
}

function fetchLocalFile( link ) {
	return new Promise( ( resolve, reject ) => {
		const href = link.getAttribute( 'href' );

		// Fetch works asynchronously and so does not block the browser UI when processing data.
		fetch( href )
			.then( resource => resource.blob() )
			.then( blob => {
				const mimeType = getFileMimeType( blob, href );
				const ext = mimeType.replace( 'file/', '' );
				const filename = `file.${ ext }`;
				const file = createFileFromBlob( blob, filename, mimeType );

				file ? resolve( file ) : reject();
			} )
			.catch( reject );
	} );
}

function isLocalFile( node ) {
	if ( !node.is( 'element', 'a' ) || !node.getAttribute( 'href' ) ) {
		return false;
	}

	return node.getAttribute( 'href' );
}

function getFileMimeType( blob, src ) {
	if ( blob.type ) {
		return blob.type;
	} else if ( src.match( /data:(image\/\w+);base64/ ) ) {
		return src.match( /data:(image\/\w+);base64/ )[ 1 ].toLowerCase();
	} else {
		throw new Error( 'Could not retrieve mime type for file.' );
	}
}

function createFileFromBlob( blob, filename, mimeType ) {
	try {
		return new File( [ blob ], filename, { type: mimeType } );
	} catch ( err ) {
		// Edge does not support `File` constructor ATM, see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9551546/.
		// However, the `File` function is present (so cannot be checked with `!window.File` or `typeof File === 'function'`), but
		// calling it with `new File( ... )` throws an error. This try-catch prevents that. Also when the function will
		// be implemented correctly in Edge the code will start working without any changes (see #247).
		return null;
	}
}

// Returns `true` if non-empty `text/html` is included in the data transfer.
//
// @param {module:clipboard/datatransfer~DataTransfer} dataTransfer
// @returns {Boolean}
export function isHtmlIncluded( dataTransfer ) {
	return Array.from( dataTransfer.types ).includes( 'text/html' ) && dataTransfer.getData( 'text/html' ) !== '';
}

function getFileLinksFromChangeItem( editor, item ) {
	return Array.from( editor.model.createRangeOn( item ) )
		.filter( value => value.item.hasAttribute( 'href' ) )
		.map( value => value.item );
}
