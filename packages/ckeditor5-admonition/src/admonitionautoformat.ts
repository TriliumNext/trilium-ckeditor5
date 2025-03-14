import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import blockAutoformatEditing from "@ckeditor/ckeditor5-autoformat/src/blockautoformatediting";
import { AdmonitionType, admonitionTypes } from "./admonitioncommand";

function tryParseAdmonitionType(match: RegExpMatchArray) {
	if (match.length !== 2) {
		return;
	}

	if ((admonitionTypes as readonly string[]).includes(match[1])) {
		return match[1] as AdmonitionType;
	}
}

export default class AdmonitionAutoformat extends Plugin {
	static get requires() {
		return [ Autoformat ];
	}

	afterInit() {
		if (!this.editor.commands.get("admonition")) {
			return;
		}

		const instance = (this as any);
		blockAutoformatEditing(this.editor, instance, /^\!\!\[*\! (.+) $/, ({ match }) => {
			const type = tryParseAdmonitionType(match);
			if (!type) {
				return;
			}

			this.editor.execute("admonition", { forceValue: type });
		});
	}
}
