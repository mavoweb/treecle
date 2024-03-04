import childPaths from "../src/childPaths.js";
import trees from "./utils/trees.js";

const tree = trees[0];

export default {
	name: "children",
	run (node) {
		return childPaths(node);
	},
	tests: [
		{
			name: "Root node",
			args: [tree],
			expect: [{node: tree.left, property: "left"}, {node: tree.right, property: "right"}]
		},
		{
			name: "Non-root node with children",
			args: [tree.right],
			expect: [{node: tree.right.left, property: "left"}, {node: tree.right.right, property: "right"}],
		},
		{
			name: "Leaf node",
			args: [tree.left.left],
			expect: [],
		}
	]
};
