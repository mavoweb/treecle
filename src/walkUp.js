import { getParent } from "./parents.js";
import { assertParentPointers } from "./util.js";

/**
 * Walk up the tree from the given node, calling the callback on each node.
 * @param {object} node
 * @param {function} callback
 * @returns {any} The first non-undefined value returned by the callback, otherwise undefined
 */
export default function walkUp (node, callback) {
	while (node) {
		const ret = callback(node);
		if (ret !== undefined) {
			return ret;
		}
		assertParentPointers.call(this, node, "Cannot walk up the tree from a node with no parent pointer.");
		node = getParent.call(this, node);
	}
}
