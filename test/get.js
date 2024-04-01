import get from "../src/get.js";
import trees from "./utils/trees.js";
import Treecle from "../src/Treecle.js";

const treecle = new Treecle({
	isNode: node => typeof node === "object" && node !== null,
	getChildProperties: node => ["left", "right"]
});

export default {
	name: "get()",
	run (tree, path) {
		// call with the Treecle instance as the context
		return get.call(treecle, tree, path);
	},
	tests: [
		{
			name: "Empty path",
			args: [trees[0], []],
			expect: trees[0]
		},
		{
			name: "Non-existent path",
			args: [trees[0], ["foo"]],
			expect: undefined
		},
		{
			name: "Path length 1",
			args: [trees[0], ["left"]],
			expect: trees[0].left
		},
		{
			name: "Multi-step path",
			args: [trees[0], ["left", "left"]],
			expect: trees[0].left.left
		},
		{
			name: "Wildcard path",
			args: [trees[0], ["*"]],
			expect: [trees[0].left, trees[0].right]
		},
		{
			name: "Multi-step wildcard last",
			args: [trees[0], ["left", "*"]],
			expect: [trees[0].left.left, trees[0].left.right]
		},
		{
			name: "Multi-step wildcard first",
			args: [trees[0], ["*", "left"]],
			expect: [trees[0].left.left, trees[0].right.left]
		},
		{
			name: "Wildcard path with non-existent end",
			args: [trees[0], ["*", "foo"]],
			expect: []
		},
		{
			name: "Object path values",
			args: [trees[0], [{name: "left"}, {}]],
			expect: [trees[0].left.left, trees[0].left.right]
		},
		{
			name: "Mixed path values",
			args: [trees[0], ["left", {}]],
			expect: [trees[0].left.left, trees[0].left.right]
		},
	]
};
