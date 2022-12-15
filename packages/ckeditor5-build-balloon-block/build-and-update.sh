#!/usr/bin/env bash

rm -rf node_modules/@ckeditor/ckeditor5-mention
rm -rf node_modules/@ckeditor/ckeditor5-find-and-replace
mkdir node_modules
# force usage of local modification
# mention contains changes to support the attribute editor
cp -r ../ckeditor5-mention node_modules/@ckeditor/
# find and replace disables keyboard shortcut so that it doesn't override trilium find widget
cp -r ../ckeditor5-find-and-replace node_modules/@ckeditor/

npm run build

# pointing the source map file to correct location
sed -i -e 's/sourceMappingURL=ckeditor.js.map/sourceMappingURL=libraries\/ckeditor\/ckeditor.js.map/g' build/ckeditor.js

cp build/ckeditor.* ~/trilium/libraries/ckeditor/

cp ../../node_modules/@ckeditor/ckeditor5-inspector/build/inspector.js ~/trilium/libraries/ckeditor/
