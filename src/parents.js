import updateParents from "./updateParents.js";
const parentMap = new WeakMap();

/**
 * Set the `parent` property on a node.
 * By default it will skip nodes that already have a `parent` property, but you can set force = true to prevent that.
 * @param {Node} node The node to set the parent on
 * @param {{node: Node, path: Array<string | number>} | null} parentPath An object storing the parent node and the path to the node from the parent
 * @param {object} [options]
 * @param {boolean} [options.force] Allow overwriting
 * @returns {boolean | undefined} false if the parent was already set, and undefined otherwise
 */
export function setPath (node, parentPath, { force } = {}) {
	if (!force && parentMap.has(node)) {
		// We assume that if the node already has a parent, its subtree will also have parents
		return false;
	}

	parentMap.set(node, parentPath);
}

/**
 * Get the parent node of a node.
 * @param {Node} node The node to get the parent of
 * @returns {Node | null | undefined} The parent node, or `null` if node is the root, or undefined if the node's parent is unknown
 */
export function getParent (node) {
	const path = getPath.call(this, node);
	return path?.node;
}

/**
 * Get the parent node and path from parent to child for a node.
 * If the parent is unknown, it will look in the configuration for the root node and update the parent pointers for the entire tree.
 * @param {Node} node The node to get the parent and path of
 * @returns {{node: Node, path: Array<string | number>} | undefined} An object containing the parent node and the property name of the child node in the parent, or undefined if the node's parent is unknown
 */
export function getPath (node) {
	let path = parentMap.get(node);

	if (path === undefined) {
		// We have no information about the parent
		if (this?.root) {
			// We have the root node, update parent pointers for the entire tree
			updateParents.call(this, this.root);

			// Try again
			path = parentMap.get(node);
		}
	}

	return path;
}

/**
 * Clear a node's parent.
 * @param {Node} node The node to clear the parent of
 * @returns {boolean} True if the node had a parent and it was removed, false if the node had no parent set
 */
export function clearParent (node) {
	return parentMap.delete(node);
}
