import childPaths from "../src/childPaths.js";
import trees from "./utils/trees.js";
import Treecle from "../src/Treecle.js";

const basicTree = trees[0];
const complexTree = trees[2];

const treecle = new Treecle({
	isNode: node => node && node.type,
	getChildProperties: node => {
		if (node.type === "single") {
			return ["child"];
		}
		else if (node.type === "multi") {
			return [["children", "*"]];
		}
		return [];
	}
})

export default {
	name: "children",
	run (node, context) {
		if (context) {
			return childPaths.call(context, node);
		}
		return childPaths(node);
	},
	tests: [
		{
			name: "Root node",
			args: [basicTree],
			expect: [{node: basicTree.left, path: ["left"]}, {node: basicTree.right, path: ["right"]}]
		},
		{
			name: "Non-root node with children",
			args: [basicTree.right],
			expect: [{node: basicTree.right.left, path: ["left"]}, {node: basicTree.right.right, path: ["right"]}],
		},
		{
			name: "Leaf node",
			args: [basicTree.left.left],
			expect: [],
		},
		{
			name: "Custom settings root node",
			args: [complexTree, treecle],
			expect: [
				{node: complexTree.children.one, path: ["children", "one"]},
				{node: complexTree.children.two, path: ["children", "two"]},
				{node: complexTree.children.three, path: ["children", "three"]}
			]
		},
		{
			name: "Custom settings non-root node",
			args: [complexTree.children.two, treecle],
			expect: [
				{node: complexTree.children.two.child, path: ["child"]}
			]
		},
		{
			name: "Custom settings leaf node",
			args: [complexTree.children.three.one, treecle],
			expect: []
		}
	]
};
