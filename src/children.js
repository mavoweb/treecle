import { getContext } from "./context.js";

/**
 * Get a node’s children as an array
 * @param {Node | Node[]} node or nodes
 * @returns {Node[]} array of children
 */
export default function children (node) {
	if (Array.isArray(node)) {
		// when node is an array, flatten to avoid nested arrays of children
		return node.flatMap(node => children(node));
	}

	let context = getContext(this);

	if (!context.isNode(node)) {
		return [];
	}

	const childProperties = context.getChildProperties(node);

	if (childProperties) {
		return childProperties.flatMap(property => node[property] ?? []);
	}
	else {
		return Object.values(node).flat();
	}
}
