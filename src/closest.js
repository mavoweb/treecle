import { getParent } from "./parents.js";

export default function closest (node, callback) {
	let n = node;

	do {
		if (callback.call(this, n)) {
			return n;
		}
	} while (n = getParent.call(this, n));

	return null;
}
