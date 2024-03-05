/**
 * Class to use Treecle with certain settings baked in.
 */
import * as treecle from "./index-fn.js";

export default class Treecle {
	constructor (root, config) {
		if (arguments.length === 1) {
			[config, root] = [root, ];
		}

		if (config) {
			for (let setting of settings) {
				if (config[setting]) {
					this[setting] = config[setting];
				}
			}
		}

		if (root) {
			this.root = root;
		}
	}
}

const settings = Object.keys(treecle.defaults);

for (let setting of settings) {
	Treecle.prototype[setting] = treecle.defaults[setting];
}

for (let method in treecle) {
	if (typeof treecle[method] === "function") {
		// Instance methods
		Treecle.prototype[method] = treecle[method];

		// Static methods that use the default config
		Treecle[method] = treecle[method].bind(treecle.defaults);
	}
}
