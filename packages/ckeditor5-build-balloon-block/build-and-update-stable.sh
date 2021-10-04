#!/usr/bin/env bash

rm -rf node_modules/@ckeditor/ckeditor5-mention
# force usage of local modification
cp -r ../ckeditor5-mention node_modules/@ckeditor/
cp -r ../ckeditor5-find-and-replace node_modules/@ckeditor/

npm run build

# pointing the source map file to correct location
sed -i -e 's/sourceMappingURL=ckeditor.js.map/sourceMappingURL=libraries\/ckeditor\/ckeditor.js.map/g' build/ckeditor.js

cp build/ckeditor.* ~/trilium-stable/libraries/ckeditor/

cp ../../node_modules/@ckeditor/ckeditor5-inspector/build/inspector.js ~/trilium-stable/libraries/ckeditor/
