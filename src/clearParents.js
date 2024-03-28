import walk from "./walk.js";
import { clearParent } from "./parents.js";

/**
 * Clear all parent references from a node and its descendants.
 * @param {Node} node the node to clear
 * @returns {void}
 */
export default function clearParents (node) {
	walk.call(this, node, (node) => clearParent.call(this, node));
}
