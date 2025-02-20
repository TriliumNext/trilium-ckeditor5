/**
 * https://github.com/TriliumNext/Notes/issues/1002
 */

import Command from '@ckeditor/ckeditor5-core/src/command';

class MoveBlockUpDownCommand extends Command {
	/**
	 * @import DocumentSelection from "@ckeditor/ckeditor5-engine/src/model/documentselection"
	 * @param {DocumentSelection} selection */
	getSelectedBlocks(selection) {
		return [...selection.getSelectedBlocks()];
	}

	getSibling(selectedBlock) {
		return selectedBlock.previousSibling;
	}

	get offset() {
		return 'before';
	}

	refresh() {
		const selection = this.editor.model.document.selection;
		const selectedBlocks = this.getSelectedBlocks(selection);

		this.isEnabled = true;
		for (const selectedBlock of selectedBlocks) {
			if (!this.getSibling(selectedBlock)) this.isEnabled = false;
		}
	}

	execute() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const selectedBlocks = this.getSelectedBlocks(selection);

		model.change((writer) => {
			for (const selectedBlock of selectedBlocks) {
				const sibling = this.getSibling(selectedBlock);
				if (sibling) {
					const range = model.createRangeOn(selectedBlock);
					writer.move(range, sibling, this.offset);
				}
			}
		});
	}
}

class MoveBlockUpCommand extends MoveBlockUpDownCommand {}

class MoveBlockDownCommand extends MoveBlockUpDownCommand {
	/** @override */
	getSelectedBlocks(selection) {
		return [...selection.getSelectedBlocks()].reverse();
	}

	/** @override */
	getSibling(selectedBlock) {
		return selectedBlock.nextSibling;
	}

	/** @override */
	get offset() {
		return 'after';
	}
}

/**
 * @import Editor from "@ckeditor/ckeditor5-core/src/editor/editor"
 * @param {Editor} editor
 */
export default function moveBlockUpDownShortcutPlugin(editor) {
	editor.config.define('moveBlockUp', {
		keystroke: 'ctrl+arrowup',
	});
	editor.config.define('moveBlockDown', {
		keystroke: 'ctrl+arrowdown',
	});

	const keystrokeUp = editor.config.get('moveBlockUp.keystroke');
	const keystrokeDown = editor.config.get('moveBlockDown.keystroke');

	editor.commands.add('moveBlockUp', new MoveBlockUpCommand(editor));
	editor.commands.add('moveBlockDown', new MoveBlockDownCommand(editor));

	editor.keystrokes.set(keystrokeUp, 'moveBlockUp');
	editor.keystrokes.set(keystrokeDown, 'moveBlockDown');
}
