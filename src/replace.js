import {
	clearParent,
	getPath,
	setPath,
} from "./parents.js";
import { setByPath } from "./util.js";

/**
 * Replaces a child node with a new node, and updates the parent node and parent pointers
 * @param {object} child
 * @param {object} newChild
 * @throws {Error} If the child node does not have a parent node set
 * @returns {object | null} The new child node or null if the child node was a root node
 */
export default function replace (child, newChild) {
	const parentPath = getPath.call(this, child);
	if (parentPath === undefined) {
		throw new Error("Cannot replace a child node with no parent pointer. Call setParent() on the node or updateParents() on an ancestor to add parent pointers to this node");
	}

	// A root node was passed in
	if (parentPath === null) {
		// TODO warn("Replacing a root node does change anything");
		return null;
	}

	const {path, node: parent} = parentPath;

	setByPath(parent, path, newChild);
	clearParent.call(this, child);
	setPath.call(this, newChild, parentPath, {force: true});
	return newChild;
}
