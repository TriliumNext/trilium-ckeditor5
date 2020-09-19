// A simple plugin that extends the remove format feature to consider links.
export default function removeFormatLinksPlugin( editor ) {
	// Extend the editor schema and mark the "linkHref" model attribute as formatting.
	editor.model.schema.setAttributeProperties( 'linkHref', {
		isFormatting: true
	} );
}
