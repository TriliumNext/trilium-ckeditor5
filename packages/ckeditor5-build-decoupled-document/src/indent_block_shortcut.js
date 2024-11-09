/**
 * https://github.com/zadam/trilium/issues/978
 */
export default function indentBlockShortcutPlugin(editor) {
	editor.keystrokes.set( 'Tab', ( data, cancel ) => {
		const command = editor.commands.get( 'indentBlock' );

		if ( command.isEnabled && !isInTable() ) {
			command.execute();
			cancel();
		}
	} );

	editor.keystrokes.set( 'Shift+Tab', ( data, cancel ) => {
		const command = editor.commands.get( 'outdentBlock' );

		if ( command.isEnabled && !isInTable() ) {
			command.execute();
			cancel();
		}
	} );

	// in table TAB should switch cells
	function isInTable() {
		let el = editor.model.document.selection.getFirstPosition();

		while (el) {
			if (el.name === 'tableCell') {
				return true;
			}

			el = el.parent;
		}

		return false;
	}
}
