#!/usr/bin/env bash

# Function to display help message
display_help() {
    echo "Usage: $0 </absolute_path/to/TriliumNext/Notes_repo>"
	echo ""
    echo "Options:"
    echo "  --help    Display this help message"
	echo ""
    exit 0
}

# Check if an argument is provided, otherwise show warning and help
if [ $# -eq 0 ]; then
	echo ""
    echo "❌ Error: No argument provided."
	echo ""
    display_help
fi

# Check if the user asked for help
if [ "$1" == "--help" ]; then
    display_help
fi

# Check if the argument is an absolute path
echo -n "🔍 Checking: Argument is an absolute path... "
if [[ "$1" != /* ]]; then
    echo "❌ Failed"
    echo "Error: The argument must be an absolute path."
    exit 1
fi
echo "✅ Passed"

# Check if the path is an npm project (contains package.json)
echo -n "🔍 Checking: Path contains a valid npm project... "
if [ -f "$1/package.json" ]; then
    echo "✅ Passed"
else
    echo "❌ Failed"
    echo "Error: This is not an npm project (package.json not found)."
    exit 1
fi

# If everything is correct, print success message
echo "🎉 Success: Valid npm project path -> $1"


cd packages/ckeditor5-build-trilium
yarn build
cp -v build/ckeditor.* $1/libraries/ckeditor

mkdir -p $1/libraries/ckeditor/translations
for language in es de es fr zh-cn zh ro; do
	cp -v build/translations/$language.js $1/libraries/ckeditor/translations/$language.js
done
