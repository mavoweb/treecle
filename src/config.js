/**
 * Settings registry. Can be imported by calling code and modified.
 */
export default {
	/**
	 * Which properties of a node are child nodes?
	 * @type { function }
	 */
	getChildProperties: (node) => undefined,

	/**
	 * Which values are considered nodes?
	 * By default, all plain objects (i.e. not instances of a class)
	 * @type { function }
	 */
	isNode: (node) =>
		node &&
		typeof node === "object" &&
		Object.prototype.toString.call(node) === "[object Object]" &&
		Object.getPrototypeOf(node).constructor?.name === "Object",
};
