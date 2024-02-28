import jsep from "../node_modules/jsep/dist/jsep.min.js";
import walk from "../src/walk.js";

const ast = jsep("1 + foo * 2");

export default {
	name: "walk()",
	run (str) {
		const ret = [];
		walk(ast, (node) => {
			ret.push(node);
		});
		return ret;
	},
	tests: [
		{
			args: [],
			expect: [ast, ast.left, ast.right, ast.right.left, ast.right.right],
		},
	],
};
