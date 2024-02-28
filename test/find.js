import jsep from "../node_modules/jsep/dist/jsep.min.js";
import find from "../src/find.js";

const ast = jsep("1 + foo * 2");

export default {
	name: "find()",
	run (cb) {
		return find(ast, cb);
	},
	tests: [
		{
			args: [(node) => node.type === "Identifier" && node.name === "foo"],
			expect: ast.right.left,
		},
	],
};
