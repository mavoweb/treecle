import find from "../src/find.js";
import trees from "./utils/trees.js";

const tree = trees[0];

export default {
	name: "find()",
	run (tree, cb) {
		return JSON.stringify(find(tree, cb));
	},
	tests: [
		{
			args: [tree, node => node.name === "7"],
			expect: '{"name":"7"}'
		}
	]
};
