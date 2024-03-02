import { getType } from "./util.js";

/**
 * Default settings. Can be imported by calling code and modified.
 */
export const defaults = {
	/**
	 * Which properties of a node are child nodes?
	 * @type { function }
	 */
	getChildProperties: node => undefined,

	/**
	 * Which values are considered nodes?
	 * By default, all plain objects (i.e. not instances of a class)
	 * @type { function }
	 */
	isNode: node => node && typeof node === "object"
		&& Object.prototype.toString.call(node) === "[object Object]"
		&& Object.getPrototypeOf(o).constructor?.name === "Object",
};

export function getContext (context) {
	return !context || getType(context) === "Module" || context === globalThis ? defaults : context;
}
