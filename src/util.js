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
