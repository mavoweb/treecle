import { getParent }from "./parents.js";

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
		const parent = getParent.call(this, node);
		// TODO: what should happen if parent is undefined (meaning no parent pointers have been set?)
		node = parent;
	}
}
