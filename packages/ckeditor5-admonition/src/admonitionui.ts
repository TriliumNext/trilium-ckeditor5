/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module admonition/admonitionui
 */

import { Plugin, } from 'ckeditor5/src/core.js';
import { addListToDropdown, createDropdown, ListDropdownButtonDefinition, SplitButtonView, ViewModel } from 'ckeditor5/src/ui.js';

import '../theme/blockquote.css';
import admonitionIcon from '../theme/icons/admonition.svg';
import { Collection } from '@ckeditor/ckeditor5-utils';
import AdmonitionCommand from './admonitioncommand';

interface AdmonitionDefinition {
	title: string;
}

export const ADMONITION_TYPES: Record<string, AdmonitionDefinition> = {
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
		const dropdownView = createDropdown(locale, SplitButtonView);
		const splitButtonView = dropdownView.buttonView;
		const t = locale.t;

		addListToDropdown(dropdownView, this._getDropdownItems())

		// Button configuration.
		splitButtonView.set( {
			label: t( 'Admonition' ),
			icon: admonitionIcon,
			isToggleable: true,
			tooltip: true
		} );
		splitButtonView.on("execute", () => {
			editor.execute("admonition", { usePreviousChoice: true });
			editor.editing.view.focus();
		});
		splitButtonView.bind( 'isOn' ).to( command, 'value', value => (!!value) as boolean);

		// Dropdown configuration
		dropdownView.bind( 'isEnabled' ).to( command, 'isEnabled' );
		dropdownView.on("execute", evt => {
			editor.execute("admonition", { forceValue: ( evt.source as any ).commandParam } );
			editor.editing.view.focus();
		});

		return dropdownView;
	}

	private _getDropdownItems() {
		const itemDefinitions = new Collection<ListDropdownButtonDefinition>();
		const command = this.editor.commands.get("admonition") as AdmonitionCommand

		for (const [ type, admonition ] of Object.entries(ADMONITION_TYPES)) {
			const definition: ListDropdownButtonDefinition = {
				type: "button",
				model: new ViewModel({
					commandParam: type,
					label: admonition.title,
					role: 'menuitemradio',
					withText: true
				})
			}

			definition.model.bind("isOn").to(command, "value", currentType => currentType === type);
			itemDefinitions.add(definition);
		}

		return itemDefinitions;
	}
}
