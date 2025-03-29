import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import scissorsIcon from './icons/scissors.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import HtmlDataProcessor from '@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor';

export default class CutToNotePlugin extends Plugin {
	init() {
		this.htmlDataProcessor = new HtmlDataProcessor();

		this.editor.ui.componentFactory.add( 'cutToNote', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Cut & paste selection to sub-note',
				icon: scissorsIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on('execute', () => {
				const editorEl = this.editor.editing.view.getDomRoot();
				const component = glob.getComponentByEl(editorEl);

				component.triggerCommand('cutIntoNote');
			});

			return view;
		} );

		this.editor.getSelectedHtml = () => this.getSelectedHtml();
		this.editor.removeSelection = () => this.removeSelection();
	}

	getSelectedHtml() {
		const model = this.editor.model;
		const document = model.document;

		const content = this.editor.data.toView(model.getSelectedContent(document.selection));

		return this.htmlDataProcessor.toData(content);
	}

	async removeSelection() {
		const model = this.editor.model;

		model.deleteContent(model.document.selection);
		this.editor.execute("paragraph");

		const component = this.getComponent();

		await component.triggerCommand('saveNoteDetailNow');
	}

	getComponent() {
		const editorEl = this.editor.editing.view.getDomRoot();

		return glob.getComponentByEl( editorEl );
	}
}
