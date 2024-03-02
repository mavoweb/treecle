import { getParent } from "./parents.js";

export default function closest (node, callback) {
	let n = node;

	do {
		if (callback(n)) {
			return n;
		}
	} while (n = getParent(n));

	return null;
}
