/**
 * Class to use Treecle with certain settings baked in.
 */
import * as treecle from "./index-fn.js";

export default class Treecle {
	constructor (config) {
		Object.assign(this, config);
	}
}

for (let method in treecle) {
	if (typeof treecle[method] === "function") {
		// Instance methods
		Treecle.prototype[method] = treecle[method];

		// Static methods that use the default config
		Treecle[method] = treecle[method].bind(treecle.defaults);
	}
}