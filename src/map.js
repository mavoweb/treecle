import transform from "./transform.js";

/**
 * Recursively execute a series of mapping callbacks on this node and all its children.
 * If the callback returns a non-undefined value, it will overwrite the node,
 * otherwise it will return a shallow clone.
 * @param {Node | Node[]} node or array of nodes
 * @param {((node: Node, property: string, parent: Node, originalNode: Node) => Node) | ((node: Node, property: string, parent: Node, originalNode: Node) => Node)[]} mappings One or more transformation functions.
 * @param {object} [o]
 * @param {string | string[] | function} [o.only] Only walk nodes of this type
 * @param {string | string[] | function} [o.except] Ignore walking nodes of these types
 * @returns {Node | Node[]} the transformed node or array of nodes
 */
export default function map (node, mappings, o) {
	const cloneFn = (node, property, parent, originalNode) => node === originalNode ? {...node} : node;
	mappings = [mappings, cloneFn].flat();
	return transform.call(this, node, mappings, o);
}
