import { getParent } from "./parents.js";

/**
 * Walk up the parent chain until a node is found that matches the callback.
 * @param {Node} node the node to start from
 * @param {(node: Node): boolean} callback the callback to match
 * @returns {Node | null} the matching node or `null` if none is found
 */
export default function closest (node, callback) {
	let n = node;

	do {
		if (callback.call(this, n)) {
			return n;
		}
	} while (n = getParent.call(this, n));

	return null;
}
