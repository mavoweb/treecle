import {
	clearParent,
	getPath,
	setPath,
} from "./parents.js";
import { assertParentPointers, setByPath } from "./util.js";

/**
 * Replaces the subtree rooted at a given node with a new node.
 * The function updates parent pointers accordingly.
 * @param {Node} child The node to replace
 * @param {Node} newChild The new node to replace the old node with
 * @throws {Error} If the child node does not have a parent node set
 * @returns {Node | null} The new child node or null if the child node was a root node
 */
export default function replace (child, newChild) {
	const parentPath = getPath.call(this, child);
	assertParentPointers.call(this, child, "Cannot replace a child node with no parent pointer.");

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
