import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import blockAutoformatEditing from "@ckeditor/ckeditor5-autoformat/src/blockautoformatediting";

export default class AdmonitionAutoformat extends Plugin {
	static get requires() {
		return [ Autoformat ];
	}

	afterInit() {
		if (!this.editor.commands.get("admonition")) {
			return;
		}

		const instance = (this as any);
		blockAutoformatEditing(this.editor, instance, /^\!\!\[*\! (.+) $/, (match) => {
			console.log("Got match ", match);
		});
	}
}
