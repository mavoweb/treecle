import pkg from "./package.json";

const BASE_FILENAME = pkg.name;
const IIFE_NAME = pkg.name.replace(/^./, $0 => $0.toUpperCase());

function bundle (format, filenameAddition = "") {
	let filename = BASE_FILENAME;

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
		bundle("iife", "global"),
		bundle("esm"),
		bundle("cjs", "cjs"),
	],
};
