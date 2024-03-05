export function matches (node, filter) {
	if (!filter) {
		return true;
	}

	if (Array.isArray(filter)) {
		// Multiple filters: OR
		return filter.some(f => matches(node, f));
	}

	if (typeof filter === "function") {
		return filter(node);
	}

	return false;
}


/**
 * Returns the [[Class]] of an object in its original case (eg. Array, Date, RegExp, String etc).
 * Detects NaN and returns NaN instead of Number.
 * @param {any} obj
 * @returns {string} See description.
 */
export function getType (obj) {
	let ret = Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)?.[1];

	if (ret == "Number" && isNaN(obj)) {
		return "NaN";
	}

	return ret;
}

/**
 * Get the value of a property path from an object
 * @param {object} obj
 * @param {(string | number | Symbol)[]} path
 * @returns {any} The value of the property at the given path (or `undefined` if the path does not exist)
 */
export function getByPath (obj, path) {
	return path.reduce((acc, key) => acc?.[key], obj);
}

/**
 * Set the value of a property path on an object
 * TODO what happens when the path does not exist? a) create it, b) throw an error, c) return undefined
 * @param {object} obj
 * @param {(string | number | Symbol)[]} path
 * @param {any} value
 * @returns {any} The value that was set
 */
export function setByPath (obj, path, value) {
	let parentPath = path.slice();
	let lastKey = parentPath.pop();
	const parent = getByPath(obj, parentPath);

	return parent && (parent[lastKey] = value);
}