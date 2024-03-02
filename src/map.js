import transform from "./transform.js";

/**
 * Recursively execute a callback on this node and all its children.
 * If the callback returns a non-undefined value, it will overwrite the node,
 * otherwise it will return a shallow clone.
 * @param {object | object[]} node Node or array of nodes
 * @param {function(object, string, object?) | function(object, string, object?)[]} mappings One or more transformation functions.
 * @param {object} [o]
 * @param {string | string[] | function} [o.only] Only walk nodes of this type
 * @param {string | string[] | function} [o.except] Ignore walking nodes of these types
 */
export default function map (node, mappings, o) {
	const cloneFn = (node, property, parent, originalNode) => node === originalNode ? {...node} : node;
	mappings = [mappings, cloneFn].flat();
	return transform(node, mappings, o);
}
