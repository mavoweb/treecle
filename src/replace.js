import {
	clearParent,
	getPath,
	setPath,
} from "./parents.js";

/**
 * Replaces a child node with a new node, and updates the parent node and parent pointers
 * @param {object} child
 * @param {object} newChild
 * @throws {Error} If the child node does not have a parent node set
 * @returns {object | null} The new child node or null if the child node was a root node
 */
export default function replace (child, newChild) {
	const parentPath = getPath(child);
	if (parentPath === undefined) {
		throw new Error("Cannot replace a child node with no parent pointer. Call setParent() on the node or updateParents() on an ancestor to add parent pointers to this node");
	}

	// A root node was passed in
	if (parentPath === null) {
		// TODO warn("Replacing a root node does change anything");
		return null;
	}

	const {property, index, node: parent} = parentPath;

	if (index !== undefined) {
		parent[property][index] = newChild;
	}
	else {
		parent[property] = newChild;
	}

	clearParent(child);
	setPath(newChild, parentPath, {force: true});
	return newChild;
}