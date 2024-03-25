import {
	clearParent,
	getPath,
	setPath,
} from "./parents.js";
import { checkParentPointers, setByPath } from "./util.js";

/**
 * Replaces a child node with a new node, and updates the parent node and parent pointers
 * @param {Node} child
 * @param {Node} newChild
 * @throws {Error} If the child node does not have a parent node set
 * @returns {Node | null} The new child node or null if the child node was a root node
 */
export default function replace (child, newChild) {
	const parentPath = getPath.call(this, child);
	checkParentPointers.call(this, child);

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
