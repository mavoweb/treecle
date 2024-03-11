import childPaths from "./childPaths.js";

/**
 * Get a node’s children as an array
 * @param {object | object[]} node or nodes
 * @returns {(object | string | number | boolean | null)[]}
 */
export default function children (node) {
	return childPaths.call(this, node).map(({node}) => node);
}
