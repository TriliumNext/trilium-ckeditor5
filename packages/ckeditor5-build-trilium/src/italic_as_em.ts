import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class ItalicAsEmPlugin extends Plugin {

	init() {
		this.editor.conversion
			.for("downcast")
			.attributeToElement({
				model: "italic",
				view: "em",
				converterPriority: "high"
			});
	}

}
