export default class CutToNotePlugin extends Plugin {
    init(): void;
    htmlDataProcessor: HtmlDataProcessor | undefined;
    getSelectedHtml(): string;
    removeSelection(): Promise<void>;
    getComponent(): any;
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor';
