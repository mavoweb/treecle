import jsep from "../node_modules/jsep/dist/jsep.min.js";
import * as children from "../src/children.js";

const ast = jsep("1 + foo(bar.baz, 2)");

export default {
	name: "children",
	run(node) {
		return children.paths(node);
	},
	tests: [
		{
			name: "Root node",
			args: [ast],
			expect: [
				{ node: ast.left, path: ["left"] },
				{ node: ast.right, path: ["right"] },
			],
		},
		{
			name: "Non-root node with children",
			args: [ast.right],
			expect: [
				{ node: ast.right.arguments[0], path: ["arguments", 0] },
				{ node: ast.right.arguments[1], path: ["arguments", 1] },
				{ node: ast.right.callee, path: ["callee"] },
			],
		},
		{
			name: "Leaf node",
			args: [ast.left],
			expect: [],
		},
	],
};
