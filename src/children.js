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

/**
 * Get a node's children and the corresponding properties and indices
 * @param {object | object[]} node or nodes
 * @returns {object | string | number | boolean | null[]}
 */
export function childPaths (node) {
	if (Array.isArray(node)) {
		// when node is an array, flatten to avoid nested arrays of children
		return node.flatMap(node => childPaths(node));
	}

	let context = getContext(this);

	if (!context.isNode(node)) {
		return [];
	}

	const childProperties = context.getProperties(node);

	let children = [];

	if (childProperties) {
		for (const property of childProperties) {
			const child = node[property];
			// When the node is an array, we want to include the index in the result
			if (Array.isArray(child)) {
				let childPaths = child.map((c, index) => ({node: c, property, index}));
				children.push(...childPaths);
			}
			else {
				children.push({node: child, property});
			}
		}
	}
	else {
		for (let property in node) {
			const child = node[property];

			if (Array.isArray(child)) {
				// Why not filter first? That would affect the index.
				let childPaths = child.map((c, index) => (context.isNode(c) ? {node: c, property, index} : null)).filter(Boolean);
				children.push(...childPaths);
			}
			else if (context.isNode(child)) {
				children.push({node: child, property});
			}
		}
	}

	return children;
}




