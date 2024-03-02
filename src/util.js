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