export default class UploadimagePlugin extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): (typeof FileRepository)[];
    static get pluginName(): string;
    init(): void;
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
