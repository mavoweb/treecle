import updateParents from "../src/updateParents.js";
import * as parents from "../src/parents.js";
import trees from "./utils/trees.js";
import copy from "./utils/copy.js";

const tree = copy(trees[0]);
updateParents(tree);

export default {
	name: "parents",
	run (node) {
		return parents.getPath(node);
	},
	tests: [
		{
			name: "Root node",
			args: [tree],
			expect: null
		},
		{
			name: "Non-root node",
			args: [tree.left],
			expect: {node: tree, path: ["left"]}
		},
		{
			name: "Leaf node",
			args: [tree.left.right],
			expect: {node: tree.left, path: ["right"]}
		}
	]
};
