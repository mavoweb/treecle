/**
 * Get the node at the end of the given path starting at a node
 * @param {object} node to start at
 * @param {(string | number)[]} path
 */
export function get(node, path) {
	let current = node;
	for (const key of path) {
		current = current[key];
	}
	return current;
}
