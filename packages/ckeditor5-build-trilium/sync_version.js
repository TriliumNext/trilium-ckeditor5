const fs = require("fs");

const sourcePackageJson = JSON.parse(fs.readFileSync("../ckeditor5-build-decoupled-document/package.json"));
const destPackageJson = JSON.parse(fs.readFileSync("./package.json"));

function updateDependencies(sourceDeps, destDeps) {
	for (const [ name, version ] of Object.entries(sourceDeps)) {
		destDeps[name] = version;
	}
}

updateDependencies(sourcePackageJson.dependencies, destPackageJson.dependencies);
updateDependencies(sourcePackageJson.devDependencies, destPackageJson.devDependencies);

fs.writeFileSync("./package.json", JSON.stringify(destPackageJson, null, 2));
