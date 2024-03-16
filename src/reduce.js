import walk from "./walk.js";

/**
 * Recursively reduce a tree to a single value
 * @param {Node} node
 * @param {function} callback takes in the current accumulator and node and returns the new accumulator
 * @param {any} initialValue
 * @returns {any} the reduced value
 */
export default function reduce (node, callback, initialValue) {
	let acc = initialValue;
	walk.call(this, node, (node, parentPath) => {
		acc = callback(acc, node, parentPath);
	});
	return acc;
}
