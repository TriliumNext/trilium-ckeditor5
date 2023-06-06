import {findOptimalInsertionRange} from '@ckeditor/ckeditor5-widget/src/utils';

export function fetchLocalFile(link) {
	return new Promise((resolve, reject) => {
		const linkHref = link.getAttribute('href');

		// Fetch works asynchronously and so does not block browser UI when processing data.
		fetch(linkHref)
			.then(resource => resource.blob())
			.then(blob => {
				const mimeType = getFileMimeType(blob, linkHref);
				const ext = mimeType.replace('file/', '');
				const filename = `file.${ext}`;
				const file = createFileFromBlob(blob, filename, mimeType);

				file ? resolve(file) : reject();
			})
			.catch(reject);
	});
}

export function isLocalFile(node) {
	if (!node.is('element', 'a') || !node.getAttribute('href')) {
		return false;
	}

	return node.getAttribute('href');
}


function getFileMimeType(blob, src) {
	if (blob.type) {
		return blob.type;
	} else if (src.match(/data:(image\/\w+);base64/)) {
		return src.match(/data:(image\/\w+);base64/)[1].toLowerCase();
	} else {
		throw new Error('Could not retrieve mime type for file.');
	}
}

function createFileFromBlob(blob, filename, mimeType) {
	try {
		return new File([blob], filename, {type: mimeType});
	} catch (err) {
		// Edge does not support `File` constructor ATM, see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9551546/.
		// However, the `File` function is present (so cannot be checked with `!window.File` or `typeof File === 'function'`), but
		// calling it with `new File( ... )` throws an error. This try-catch prevents that. Also when the function will
		// be implemented correctly in Edge the code will start working without any changes (see #247).
		return null;
	}
}

export function insertFileLink(writer, model, attributes = {}, file) {
	const selection = model.document.selection;
	const insertAtSelection = findOptimalInsertionRange(selection, model);

	const linkedText = writer.createText(file.name, attributes);
	model.insertContent(linkedText, insertAtSelection);

	if (linkedText.parent) {
		writer.setSelection(linkedText, 'on');
	}
}
