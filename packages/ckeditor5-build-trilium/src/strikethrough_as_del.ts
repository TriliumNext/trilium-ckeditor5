import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class StrikethroughAsDel extends Plugin {

	init() {
		this.editor.conversion
			.for("downcast")
			.attributeToElement({
				model: "strikethrough",
				view: "del",
				converterPriority: "high"
			});
	}

}
