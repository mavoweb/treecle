import updateParents from "../src/updateParents.js";
import * as parents from "../src/parents.js";
import trees from "./utils/trees.js";

const tree = trees[0];
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
			expect: {node: tree, property: "left"}
		},
		{
			name: "Leaf node",
			args: [tree.left.right],
			expect: {node: tree.left, property: "right"}
		}
	]
};
