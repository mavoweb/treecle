import { getContext } from "./context.js";
import { enumerateChildPaths, getByPath } from "./util.js";

/**
 * Get a node's children and the corresponding properties and indices
 * @param {object | object[]} node or nodes
 * @returns {object | string | number | boolean | null[]}
 */
export default function childPaths (node) {
	if (Array.isArray(node)) {
		// when node is an array, flatten to avoid nested arrays of children
		return node.flatMap(node => childPaths(node));
	}

	let context = getContext(this);

	if (!context.isNode(node)) {
		return [];
	}

	const paths = enumerateChildPaths(node, context.getChildProperties);

	let children = [];

	for (const path of paths) {
		const child = getByPath(node, path);
		if (Array.isArray(child)) {
			const childPaths = child.map((c, index) => context.isNode(c) ? ({node: c, path: [...path, index]}) : null).filter(Boolean);
			children.push(...childPaths);
		}
		else if (context.isNode(child)) {
			children.push({node: child, path});
		}
	
	}

	return children;
}
