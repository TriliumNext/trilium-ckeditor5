/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module admonition/admonitionediting
 */

import { Plugin } from 'ckeditor5/src/core.js';
import { Enter, type ViewDocumentEnterEvent } from 'ckeditor5/src/enter.js';
import { Delete, type ViewDocumentDeleteEvent } from 'ckeditor5/src/typing.js';

import AdmonitionCommand, { AdmonitionType, ADMONITION_TYPES, DEFAULT_ADMONITION_TYPE, ADMONITION_TYPE_ATTRIBUTE } from './admonitioncommand.js';

/**
 * The block quote editing.
 *
 * Introduces the `'admonition'` command and the `'aside'` model element.
 *
 * @extends module:core/plugin~Plugin
 */
export default class AdmonitionEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'AdmonitionEditing' as const;
	}

	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [ Enter, Delete ] as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;
		const schema = editor.model.schema;

		editor.commands.add( 'admonition', new AdmonitionCommand( editor ) );

		schema.register( 'aside', {
			inheritAllFrom: '$container',
			allowAttributes: ADMONITION_TYPE_ATTRIBUTE
		} );

		editor.conversion.for("upcast").elementToElement({
			view: {
				name: "aside",
				classes: "admonition",
			},
			model: (viewElement, { writer }) => {
				let type: AdmonitionType = DEFAULT_ADMONITION_TYPE;
				for (const className of viewElement.getClassNames()) {
					if (className !== "admonition" && (ADMONITION_TYPES as readonly string[]).includes(className)) {
						type = className as AdmonitionType;
					}
				}

				const attributes: Record<string, unknown> = {};
				attributes[ADMONITION_TYPE_ATTRIBUTE] = type;
				return writer.createElement("aside", attributes);
			}
		});

		editor.conversion.for("downcast")
			.elementToElement( {
				model: 'aside',
				view: "aside"
			})
			.attributeToAttribute({
				model: ADMONITION_TYPE_ATTRIBUTE,
				view: (value) => ({
					key: "class",
					value: [ "admonition", value as string ]
				})
			});

		// Postfixer which cleans incorrect model states connected with block quotes.
		editor.model.document.registerPostFixer( writer => {
			const changes = editor.model.document.differ.getChanges();

			for ( const entry of changes ) {
				if ( entry.type == 'insert' ) {
					const element = entry.position.nodeAfter;

					if ( !element ) {
						// We are inside a text node.
						continue;
					}

					if ( element.is( 'element', 'aside' ) && element.isEmpty ) {
						// Added an empty aside - remove it.
						writer.remove( element );

						return true;
					} else if ( element.is( 'element', 'aside' ) && !schema.checkChild( entry.position, element ) ) {
						// Added a aside in incorrect place. Unwrap it so the content inside is not lost.
						writer.unwrap( element );

						return true;
					} else if ( element.is( 'element' ) ) {
						// Just added an element. Check that all children meet the scheme rules.
						const range = writer.createRangeIn( element );

						for ( const child of range.getItems() ) {
							if (
								child.is( 'element', 'aside' ) &&
								!schema.checkChild( writer.createPositionBefore( child ), child )
							) {
								writer.unwrap( child );

								return true;
							}
						}
					}
				} else if ( entry.type == 'remove' ) {
					const parent = entry.position.parent;

					if ( parent.is( 'element', 'aside' ) && parent.isEmpty ) {
						// Something got removed and now aside is empty. Remove the aside as well.
						writer.remove( parent );

						return true;
					}
				}
			}

			return false;
		} );

		const viewDocument = this.editor.editing.view.document;
		const selection = editor.model.document.selection;
		const admonitionCommand: AdmonitionCommand = editor.commands.get( 'admonition' )!;

		// Overwrite default Enter key behavior.
		// If Enter key is pressed with selection collapsed in empty block inside a quote, break the quote.
		this.listenTo<ViewDocumentEnterEvent>( viewDocument, 'enter', ( evt, data ) => {
			if ( !selection.isCollapsed || !admonitionCommand.value ) {
				return;
			}

			const positionParent = selection.getLastPosition()!.parent;

			if ( positionParent.isEmpty ) {
				editor.execute( 'admonition' );
				editor.editing.view.scrollToTheSelection();

				data.preventDefault();
				evt.stop();
			}
		}, { context: 'aside' } );

		// Overwrite default Backspace key behavior.
		// If Backspace key is pressed with selection collapsed in first empty block inside a quote, break the quote.
		this.listenTo<ViewDocumentDeleteEvent>( viewDocument, 'delete', ( evt, data ) => {
			if ( data.direction != 'backward' || !selection.isCollapsed || !admonitionCommand!.value ) {
				return;
			}

			const positionParent = selection.getLastPosition()!.parent;

			if ( positionParent.isEmpty && !positionParent.previousSibling ) {
				editor.execute( 'admonition' );
				editor.editing.view.scrollToTheSelection();

				data.preventDefault();
				evt.stop();
			}
		}, { context: 'aside' } );
	}
}
