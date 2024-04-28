import walk from "./walk.js";

/**
 * Find a node and return it, or `null` if not found.
 * @param {Node} node the node to start from
 * @param {(node: Node) => boolean} callback the callback predicate to match
 * @returns {Node | null} the matching node or `null` if none is found
 */
export default function find (node, callback) {
	return walk.call(this, node, node => {
		if (callback.call(this, node)) {
			return node;
		}
	}) ?? null;
}
