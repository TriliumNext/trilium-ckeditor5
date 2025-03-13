/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module admonition/admonitionui
 */

import { Plugin, icons } from 'ckeditor5/src/core.js';
import { ButtonView, MenuBarMenuListItemButtonView } from 'ckeditor5/src/ui.js';

import '../theme/blockquote.css';
import admonitionIcon from '../theme/icons/admonition.svg';

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
			const buttonView = this._createButton( ButtonView );

			buttonView.set( {
				tooltip: true
			} );

			return buttonView;
		} );

		editor.ui.componentFactory.add( 'menuBar:admonition', () => {
			const buttonView = this._createButton( MenuBarMenuListItemButtonView );

			buttonView.set( {
				role: 'menuitemcheckbox'
			} );

			return buttonView;
		} );
	}

	/**
	 * Creates a button for admonition command to use either in toolbar or in menu bar.
	 */
	private _createButton<T extends typeof ButtonView | typeof MenuBarMenuListItemButtonView>( ButtonClass: T ): InstanceType<T> {
		const editor = this.editor;
		const locale = editor.locale;
		const command = editor.commands.get( 'admonition' )!;
		const view = new ButtonClass( editor.locale ) as InstanceType<T>;
		const t = locale.t;

		view.set( {
			label: t( 'Admonition' ),
			icon: admonitionIcon,
			isToggleable: true
		} );

		view.bind( 'isEnabled' ).to( command, 'isEnabled' );
		view.bind( 'isOn' ).to( command, 'value' );

		// Execute the command.
		this.listenTo( view, 'execute', () => {
			editor.execute( 'admonition' );
			editor.editing.view.focus();
		} );

		return view;
	}
}
