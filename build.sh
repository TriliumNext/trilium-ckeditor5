#!/usr/bin/env bash

# exit immediately on error to avoid hidden failures
set -e
# exit if an undefined variable is used to catch bugs early
set -u

if [ $# -ne 1 ]; then
	echo "Usage: $0 /path/to/Notes/repo"
	exit 1
fi

# convert relative paths to absolute paths
TARGET_DIR=$(realpath "$1")

# ensure script is location-independent
SCRIPT_DIR="$(realpath "$(dirname "${BASH_SOURCE[0]}")")"

cd "$SCRIPT_DIR/packages/ckeditor5-build-trilium"

yarn build

cp -v build/ckeditor.* "$TARGET_DIR/libraries/ckeditor"

mkdir -p "$TARGET_DIR/libraries/ckeditor/translations"
for language in es de fr zh-cn zh ro; do
	cp -v "build/translations/$language.js" "$TARGET_DIR/libraries/ckeditor/translations/$language.js"
done
