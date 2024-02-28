import { paths as childPaths } from "./children.js";
import { matches } from "./util.js";
import * as parents from "./parents.js";

/**
 * Recursively execute a callback on this node and all its children.
 * If the callback returns a non-undefined value, it will overwrite the node.
 * This function will not modify the root node of the input tree.
 *
 * @param {object | object[]} node Node or array of nodes
 * @param {Object.<string, function> | function(object, string, object?, object) | (Object.<string, function> | function(object, string, object?, object))[]} transformations A map of node types to callbacks, or a single callback that will be called for all node types, or a list of either, which will be applied in order
 * @param {object} [o]
 * @param { function | function[] } [o.only] Only walk nodes of this type
 * @param { function | function[] } [o.except] Ignore walking nodes of these types
 * @returns {object | object[]} The transformation's return value on the root node(s) of the input tree, or the root node(s) if the transformation did not return a value
 */
export default function transform(node, transformations, o) {
	if (!Array.isArray(transformations)) {
		transformations = [transformations];
	}
	parents.clearAll(node);
	const transformedNode = _transform(node, transformations, o);
	parents.update(transformedNode);
	return transformedNode;
}

function _transform(node, transformations, o = {}, property, parent) {
	if (Array.isArray(node)) {
		return node.map((n) =>
			_transform(n, transformations, o, property, parent)
		);
	}

	const ignore = o.except && matches(node, o.except);
	const explore = !ignore && matches(node, o.only);

	if (explore) {
		let transformedNode = node;

		for (const transformation of transformations) {
			transformedNode = transformation?.(
				transformedNode,
				property,
				parent,
				node
			);

			if (transformedNode === undefined) {
				transformedNode = node;
			}
		}

		node = transformedNode;

		childPaths(node).forEach((path) => {
			node[path.property] = _transform(
				node[path.property],
				transformations,
				o,
				path.property,
				node
			);
		});
	}

	return node;
}
