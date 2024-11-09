import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class MentionCustomization extends Plugin {
	afterInit() {
		const editor = this.editor;
		// override standard mention command (see https://github.com/ckeditor/ckeditor5/issues/6470)
		editor.commands.add('mention', new CustomMentionCommand(editor));
	}
}

class CustomMentionCommand extends Command {
	execute(options) {
		const {model} = this.editor;
		const {document} = model;
		const {selection} = document;
		const {mention} = options;

		const range = options.range || selection.getFirstRange();

		if (mention.id.startsWith('#') || mention.id.startsWith('~')) {
			model.change(writer => {
				// Replace a range with the text with a mention.
				model.insertContent( writer.createText( mention.id, {} ), range );
			});
		}
		else if (mention.action === 'create-note') {
			const editorEl = this.editor.editing.view.getDomRoot();
			const component = glob.getComponentByEl(editorEl);

			component.createNoteForReferenceLink(mention.noteTitle).then(notePath => {
				this.insertReference(range, notePath);
			});
		}
		else {
			this.insertReference(range, options.mention.notePath);
		}
	}

	insertReference(range, notePath) {
		const {model} = this.editor;

		model.change(writer => {
			// override the selection or at least the beginning @ character
			model.insertContent(writer.createText('', {}), range);

			this.editor.execute('referenceLink', {href: '#' + notePath});
		});
	}
}
