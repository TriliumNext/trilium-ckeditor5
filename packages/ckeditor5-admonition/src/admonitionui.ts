/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module admonition/admonitionui
 */

import { Plugin, } from 'ckeditor5/src/core.js';
import { addListToDropdown, createDropdown, ListDropdownButtonDefinition, ViewModel } from 'ckeditor5/src/ui.js';

import '../theme/blockquote.css';
import admonitionIcon from '../theme/icons/admonition.svg';
import { Collection } from '@ckeditor/ckeditor5-utils';

interface AdmonitionDefinition {
	title: string;
}

const ADMONITION_TYPES: Record<string, AdmonitionDefinition> = {
	"note": {
		title: "Note"
	},
	"tip": {
		title: "Tip"
	},
	"important": {
		title: "Important"
	},
	"caution": {
		title: "Caution"
	},
	"warning": {
		title: "Warning"
	}
};

/**
 * The block quote UI plugin.
 *
 * It introduces the `'admonition'` button.
 *
 * @extends module:core/plugin~Plugin
 */
export default class AdmonitionUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'AdmonitionUI' as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'admonition', () => {
			const buttonView = this._createButton();

			return buttonView;
		} );
	}

	/**
	 * Creates a button for admonition command to use either in toolbar or in menu bar.
	 */
	private _createButton() {
		const editor = this.editor;
		const locale = editor.locale;
		const command = editor.commands.get( 'admonition' )!;
		const view = createDropdown(locale);
		const t = locale.t;

		addListToDropdown(view, this._getDropdownItems())

		view.buttonView.set( {
			label: t( 'Admonition' ),
			icon: admonitionIcon,
			isToggleable: true,
			tooltip: true
		} );

		view.bind( 'isEnabled' ).to( command, 'isEnabled' );
		// view.buttonView.bind( 'isOn' ).to( command, 'value' );

		// Execute the command.
		this.listenTo( view, 'execute', () => {
			editor.execute( 'admonition' );
			editor.editing.view.focus();
		} );

		return view;
	}

	private _getDropdownItems() {
		const itemDefinitions = new Collection<ListDropdownButtonDefinition>();

		for (const [ type, admonition ] of Object.entries(ADMONITION_TYPES)) {
			const definition: ListDropdownButtonDefinition = {
				type: "button",
				model: new ViewModel({
					commandParam: type,
					label: admonition.title,
					withText: true
				})
			}

			itemDefinitions.add(definition);
		}

		return itemDefinitions;
	}
}
