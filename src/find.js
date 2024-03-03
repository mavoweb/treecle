import walk from "./walk.js";

/**
 * Find a node and return it, or `null` if not found.
 * @param {object | object[]} node
 * @param {function(object): boolean} callback
 */
export default function find (node, callback) {
	return walk.call(this, node, node => {
		if (callback.call(this, node)) {
			return node;
		}
	}) ?? null;
}
