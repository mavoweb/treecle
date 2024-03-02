import jsep from "../node_modules/jsep/dist/jsep.min.js";
import * as path from "../src/path.js";

const ast = jsep("1 + foo(bar.baz, 2)");

export default {
	name: "path()",
	run(start, p) {
		return JSON.stringify(path.get(start, p));
	},
	tests: [
		{
			name: "Root with empty path",
			args: [ast, []],
			expect: JSON.stringify(ast),
		},
		{
			name: "Non-root with single path",
			args: [ast.right, ["callee"]],
			expect: JSON.stringify(ast.right.callee),
		},
		{
			name: "Root with multi path",
			args: [ast, ["right", "arguments", 0, "object"]],
			expect: JSON.stringify(ast.right.arguments[0].object),
		},
	],
};
