import { FileRepository } from 'ckeditor5/src/upload';
import { Command } from 'ckeditor5/src/core';

export default class FileUploadCommand extends Command {
	refresh() {
		this.isEnabled = true;
	}

	/**
	 * Executes the command.
	 *
	 * @fires execute
	 * @param {Object} options Options for the executed command.
	 * @param {File|Array.<File>} options.file The file or an array of files to upload.
	 */
	execute( options ) {
		const editor = this.editor;
		const model = editor.model;

		const fileRepository = editor.plugins.get( FileRepository );

		model.change( writer => {
			const filesToUpload = options.file;
			for ( const file of filesToUpload ) {
				uploadFile( writer, model, fileRepository, file );
			}
		} );
	}
}

/**
 * 	Handles uploading single file.
 *
 *	@param {module:engine/model/writer~writer} writer
 *	@param {module:engine/model/model~Model} model
 *	@param {File} file
 */
function uploadFile( writer, model, fileRepository, file ) {
	const loader = fileRepository.createLoader( file );

	// Do not throw when upload adapter is not set. FileRepository will log an error anyway.
	if ( !loader ) {
		return;
	}

	insertFileLink( writer, model, { href: '', uploadId: loader.id }, file );
}

function insertFileLink( writer, model, attributes = {}, file ) {
	const placeholder = writer.createElement( 'reference', attributes );
	model.insertContent( placeholder, model.document.selection );
	writer.insertText( ' ', placeholder, 'after' );
}
