import walk from "./walk.js";
import { setPath } from "./parents.js";

/**
 * Set properties on each node pointing to its parent node.
 * Required for many Treecle functions, e.g. `closest()`.
 * By default it will skip nodes that already have a parent entirely, but you can set force = true to prevent that.
 * @param {*} node
 * @param {object} [options]
 * @param {boolean} [options.force] Overwrite existing `parent` properties
 */
export default function updateParents (node, options) {
	walk.call(this, node, (node, parentPath) => {
		// Make sure to pass in null as the parentPath if the node is the root
		let ret = setPath.call(this, node, parentPath ?? null, options);

		if (ret === false) {
			// We assume that if the node already has a parent, its subtree will also have parents
			return false;
		}
	});
}
