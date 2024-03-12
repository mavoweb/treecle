import * as parents from "./parents.js";

/**
 * Walk up the tree from the given node, calling the callback on each node.
 * @param {object} node 
 * @param {function} callback 
 * @returns {any} The first non-undefined value returned by the callback, or the highest ancestor node if no undefined value is ever returned.
 */
export default function walkUp (node, callback) {
    let previousNode;
    while (node) {
        const ret = callback(node);
        if (ret !== undefined) {
            return ret;
        }
        previousNode = node;
        const parent = parents.getParent.call(this, node);
        // TODO: what should happen if parent is undefined (meaning no parent pointers have been set?)
        node = parent;
    }
    return previousNode;
}