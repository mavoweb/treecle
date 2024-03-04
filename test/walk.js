import walk from "../src/walk.js";
import trees from "./utils/trees.js";

const tree = trees[0];

export default {
	name: "walk()",
	run () {
		let ret = [];
		walk(tree, node => {
			ret.push(node);
		});
		return ret;
	},
	tests: [
		{
			args: [],
			expect: []
		}
	]
};
