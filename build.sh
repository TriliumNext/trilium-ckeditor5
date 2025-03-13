#!/usr/bin/env bash

if [ $# -ne 1 ]; then
	echo "Usage: $0 /path/to/Notes/repo"
	exit 1
fi

cd packages/ckeditor5-build-trilium
yarn build
cp -v build/ckeditor.* $1/libraries/ckeditor

mkdir -p $1/libraries/ckeditor/translations
for language in es de es fr zh-cn zh ro; do
	cp -v build/translations/$language.js $1/libraries/ckeditor/translations/$language.js
done
