import config from "./config.js";
import {
	clearParent,
	getPath,
	setPath,
} from "./parents.js";

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

	if (!config.isNode(node)) {
		return [];
	}

	const childProperties = config.getProperties(node);

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

	if (!config.isNode(node)) {
		return [];
	}

	const childProperties = config.getProperties(node);

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
				let childPaths = child.map((c, index) => (config.isNode(c) ? {node: c, property, index} : null)).filter(Boolean);
				children.push(...childPaths);
			}
			else if (config.isNode(child)) {
				children.push({node: child, property});
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
export function replace (child, newChild) {
	const parentPath = getPath(child);
	if (parentPath === undefined) {
		throw new Error("Cannot replace a child node with no parent pointer. Call setParent() on the node or updateParents() on an ancestor to add parent pointers to this node");
	}

	// A root node was passed in
	if (parentPath === null) {
		// TODO warn("Replacing a root node does change anything");
		return null;
	}

	const {property, index, node: parent} = parentPath;

	if (index !== undefined) {
		parent[property][index] = newChild;
	}
	else {
		parent[property] = newChild;
	}

	clearParent(child);
	setPath(newChild, parentPath, {force: true});
	return newChild;
}


