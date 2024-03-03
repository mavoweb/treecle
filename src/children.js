import { getContext } from "./context.js";

/**
 * Get a node’s children as an array
 * @param {object | object[]} node or nodes
 * @returns {(object | string | number | boolean | null)[]}
 */
export function children (node) {
	if (Array.isArray(node)) {
		// when node is an array, flatten to avoid nested arrays of children
		return node.flatMap(node => children(node));
	}

	let context = getContext(this);

	if (!context.isNode(node)) {
		return [];
	}

	const childProperties = context.getProperties(node);

	if (childProperties) {
		return childProperties.flatMap(property => node[property] ?? []);
	}
	else {
		return Object.values(node).flat();
	}
}
