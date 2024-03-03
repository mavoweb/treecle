import walk from "./walk.js";
import { clearParent } from "./parents.js";

/**
 * Clear all parent references from a node and its descendants.
 * @param {object} node
 */
export default function clearParents (node) {
	walk(node, (node) => clearParent(node));
}
