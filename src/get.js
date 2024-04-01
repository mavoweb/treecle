import { getContext } from "./context.js";

const wildcard = {};

/**
 * Get the value from a property path starting at the given node.
 * Paths can be strings, numbers, or an object with a `name` property.
 * The wildcard selector, represented by `"*"` or an empty object `{}` can be used to get all values at a given level.
 * @param {Node} node to start at
 * @param {(string | number | object)[]} path to get, including wildcards
 * @returns {any} The value (or values if any wildcard selectors used) at the given path (or `undefined` if the path does not exist)
 */
export default function get (node, path) {
	// Base case: If path is empty, return the current node
	if (path.length === 0) {
		return node;
	}

	const context = getContext(this);

	// Base case: If the node is not a node, return undefined since we can't traverse any further
	if (!context.isNode(node)) {
		return undefined;
	}

	// forces the value to be in the form {name: "key"} or {} for wildcard
	const current = formatPathValue(path[0]);
	const remainingPath = path.slice(1);

	// Handle wildcard selectors by checking if it's an empty object
	if (Object.keys(current).length === 0) {
		let children;
		if (Array.isArray(node)) {
			children = node;
		}
		else {
			const childProperties = context.getChildProperties(node) ?? Object.keys(node);
			children = childProperties.map(property => node[property]);
		}
		const result = [];
		children.forEach(child => {
			const childResult = get.call(this, child, remainingPath);
			if (Array.isArray(childResult)) {
				result.push(...childResult);
			}
			else if (childResult !== undefined) {
				result.push(childResult);
			}
			// don't push anything if the child result is undefined
		});
		return result;
	}
	// Normal case: single path value
	return get.call(this, node[current.name], remainingPath);
}

function formatPathValue (value) {
	// if it's already formatted like {name: "foo"}, we're good
	if (typeof value === "object") {
		return value;
	}
	// handle string cases
	if (value === "*") {
		return wildcard;
	}
	return {name: value};
}
