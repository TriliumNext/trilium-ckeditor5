import { FileRepository } from 'ckeditor5/src/upload';
import { Command } from 'ckeditor5/src/core';
import { findOptimalInsertionRange } from 'ckeditor5/src/widget';

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

	console.log("Uploading file", file, loader);

	// Do not throw when upload adapter is not set. FileRepository will log an error anyway.
	if ( !loader ) {
		return;
	}

	insertFileLink( writer, model, { linkHref: '', uploadId: loader.id }, file );
}

function insertFileLink( writer, model, attributes = {}, file ) {
	const selection = model.document.selection;
	const insertAtSelection = findOptimalInsertionRange( selection, model );

	const linkedText = writer.createText( file.name, attributes );
	model.insertContent( linkedText, insertAtSelection );

	if ( linkedText.parent ) {
		writer.setSelection( linkedText, 'on' );
	}
}
