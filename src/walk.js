import * as children from "./children.js";
import { matches } from "./util.js";

/**
 * Recursively execute a callback on this node and all its children.
 * If the callback returns a non-undefined value, walking ends and the value is returned
 * @param {object} node
 * @param {function(object, object?)} callback
 * @param {object} [o]
 * @param { function | function[] } [o.only] Only walk nodes that match this
 * @param { function | function[] } [o.except] Ignore nodes that match this
 */
export default function walk(node, callback, o) {
	return _walk(node, callback, o);
}

function _walk(node, callback, o = {}, parentPath) {
	let ignored = o.except && matches(node, o.except);

	if (!ignored && matches(node, o.only)) {
		let ret = callback(node, parentPath);

		if (ret !== undefined) {
			// Callback returned a value, stop walking and return it
			return ret;
		}

		for (let childPath of children.paths(node)) {
			const { node: child, path } = childPath;
			const childResult = _walk(child, callback, o, {
				node,
				path,
			});
			if (childResult !== undefined) {
				return childResult;
			}
		}
	}
}
