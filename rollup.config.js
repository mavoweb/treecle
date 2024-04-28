import pkg from "./package.json";

const BASE_FILENAME = pkg.name;
const IIFE_NAME = pkg.name.replace(/^./, $0 => $0.toUpperCase());

function bundle (filename, format, filenameAddition = "") {
	if (format !== "esm" && filenameAddition) {
		filename += "." + filenameAddition;
	}

	return {
		file: `dist/${filename}.js`,
		name: IIFE_NAME,
		format,
		sourcemap: format !== "esm"
	};
}

export default {
	input: "src/index.js",
	output: [
		bundle(BASE_FILENAME, "iife", "global"),
		bundle(BASE_FILENAME, "esm"),
		bundle(BASE_FILENAME, "cjs", "cjs"),
		bundle("index.js", "esm")
	],
};
