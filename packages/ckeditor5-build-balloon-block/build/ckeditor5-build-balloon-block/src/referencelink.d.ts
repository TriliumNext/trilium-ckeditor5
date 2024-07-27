export default class ReferenceLink extends Plugin {
    static get requires(): (typeof ReferenceLinkEditing)[];
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
declare class ReferenceLinkEditing extends Plugin {
    static get requires(): (typeof Widget)[];
    init(): void;
    _defineSchema(): void;
    _defineConverters(): void;
}
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
export {};
