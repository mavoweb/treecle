import config from "./config.js";
import * as parents from "./parents.js";

/**
 * Get a node’s children as an array
 * @param {object | object[]} node or nodes
 * @returns {(object | string | number | boolean | null)[]}
 */
export default function children(node) {
	if (Array.isArray(node)) {
		// when node is an array, flatten to avoid nested arrays of children
		return node.flatMap((node) => children(node));
	}

	if (!config.isNode(node)) {
		return [];
	}

	const childProperties = config.getChildProperties(node);

	if (childProperties) {
		return childProperties.flatMap((property) => node[property] ?? []);
	} else {
		return Object.values(node).flat();
	}
}

/**
 * Alias of children() to better facilitate `import * as children` patterns.
 * @alias children
 */
export { children as of };

/**
 * Get a node's children and the corresponding properties and indices
 * @param {object | object[]} node or nodes
 * @returns {object | string | number | boolean | null[]}
 */
export function paths(node) {
	if (Array.isArray(node)) {
		// when node is an array, flatten to avoid nested arrays of children
		return node.flatMap((node) => paths(node));
	}

	if (!config.isNode(node)) {
		return [];
	}

	const childProperties = config.getChildProperties(node);

	const children = [];

	if (childProperties) {
		for (const property of childProperties) {
			const child = node[property];
			// When the node is an array, we want to include the index in the result
			if (Array.isArray(child)) {
				const childPaths = child.map((c, index) => ({
					node: c,
					path: [property, index],
				}));
				children.push(...childPaths);
			} else {
				children.push({ node: child, path: [property] });
			}
		}
	} else {
		for (const property in node) {
			const child = node[property];

			if (Array.isArray(child)) {
				// Why not filter first? That would affect the index.
				const childPaths = child
					.map((c, index) =>
						config.isNode(c)
							? { node: c, path: [property, index] }
							: null
					)
					.filter(Boolean);
				children.push(...childPaths);
			} else if (config.isNode(child)) {
				children.push({ node: child, path: [property] });
			}
		}
	}

	return children;
}

/**
 * Replaces a child node with a new node, and updates the parent node and parent pointers
 * @param {object} child
 * @param {object} newChild
 * @throws {Error} If the child node does not have a parent node set
 * @returns {object | null} The new child node or null if the child node was a root node
 */
export function replace(child, newChild) {
	const parentPath = parents.path(child);
	if (parentPath === undefined) {
		throw new Error(
			"Cannot replace a child node with no parent pointer. Call parents.set() on the node or parents.update() on an ancestor to add parent pointers to this node"
		);
	}

	// A root node was passed in
	if (parentPath === null) {
		// TODO warn("Replacing a root node does change anything");
		return null;
	}

	const { path, node: parent } = parentPath;
	const [property, index] = path;

	if (index !== undefined) {
		parent[property][index] = newChild;
	} else {
		parent[property] = newChild;
	}

	parents.clear(child);
	parents.set(newChild, parentPath, { force: true });
	return newChild;
}
