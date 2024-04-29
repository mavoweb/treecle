import walk from "./walk.js";

/**
 * Recursively reduce a tree to a single value in a depth-first traversal.
 * @param {Node} node The node to start from
 * @param {function} callback Takes in the current accumulator and node and returns the new accumulator
 * @param {any} initialValue The initial value of the accumulator
 * @returns {any} the reduced value after visiting all nodes
 */
export default function reduce (node, callback, initialValue) {
	let acc = initialValue;
	walk.call(this, node, (node, parentPath) => {
		acc = callback(acc, node, parentPath);
	});
	return acc;
}
