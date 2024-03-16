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

const wildcard = "*";

// handles all the ugly details of getting the child paths, including wildcards
export function enumerateChildPaths (node, getChildProperties) {
	const propertyPaths = Array.isArray(getChildProperties) ? getChildProperties : getChildProperties(node);
	// if no properties are specified, return the keys of the object by default
	if (!propertyPaths) {
		return Object.keys(node).map(key => [key]);
	}
	const paths = [];
	console.log(propertyPaths);
	for (let propertyPath of propertyPaths) {
		// if it's a flat single property, wrap it in an array
		propertyPath = Array.isArray(propertyPath) ? propertyPath : [propertyPath];
		// check for wildcard
		if (propertyPath[propertyPath.length - 1] === wildcard) {
			console.log("in here!", propertyPath)
			// remove the wildcard
			propertyPath.pop();
			// get the value of the property path
			const value = getByPath(node, propertyPath);
			// if the value is an array, enumerate its items
			if (Array.isArray(value)) {
				value.forEach((_, index) => {
					paths.push([...propertyPath, index]);
				});
			}
			else {
				// if the value is an object, enumerate its keys
				paths.push(...Object.keys(value).map(key => [...propertyPath, key]));
			}
		}
		else {
			paths.push(propertyPath);
		}
	}
	return paths;
}