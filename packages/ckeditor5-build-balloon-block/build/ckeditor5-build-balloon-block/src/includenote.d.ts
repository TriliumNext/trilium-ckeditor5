export default class IncludeNote extends Plugin {
    static get requires(): (typeof IncludeNoteUI)[];
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
declare class IncludeNoteUI extends Plugin {
    init(): void;
}
export {};
