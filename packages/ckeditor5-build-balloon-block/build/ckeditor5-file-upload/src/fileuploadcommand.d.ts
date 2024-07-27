export default class FileUploadCommand extends Command {
    /**
     * Executes the command.
     *
     * @fires execute
     * @param {Object} options Options for the executed command.
     * @param {File|Array.<File>} options.file The file or an array of files to upload.
     */
    execute(options: {
        file: File | Array<File>;
    }): void;
}
import { Command } from 'ckeditor5/src/core';
