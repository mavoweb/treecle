import jsep from "../node_modules/jsep/dist/jsep.min.js";
import map from "../src/map.js";

export default {
	name: "map()",
	run(str, ...args) {
		const ast = jsep(str);
		const mappedAst = map(ast, ...args);
		return [JSON.stringify(ast), JSON.stringify(mappedAst)];
	},
	// Tests expect an array of the form [serialized input AST, expected output AST]
	// This is to ensure the original AST was not mutated during mapping.
	tests: [
		{
			args: ["foo + bar", () => undefined],
			expect: [
				'{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"Identifier","name":"bar"}}',
				'{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"Identifier","name":"bar"}}',
			],
			description: "Empty callback",
		},
		{
			args: [
				"foo + bar",
				(node) => {
					if (node.type === "Identifier" && node.name !== "foo") {
						return { ...node, name: "foo" };
					}
				},
			],
			expect: [
				'{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"Identifier","name":"bar"}}',
				'{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"Identifier","name":"foo"}}',
			],
			description: "Rewrite tree of size > 1",
		},
		{
			args: [
				"foo + bar * baz",
				(node) => {
					if (
						node.type === "BinaryExpression" &&
						node.operator === "*"
					) {
						return { name: "prod", type: "Identifier" };
					}
				},
			],
			expect: [
				'{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"BinaryExpression","operator":"*","left":{"type":"Identifier","name":"bar"},"right":{"type":"Identifier","name":"baz"}}}',
				'{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"name":"prod","type":"Identifier"}}',
			],
			description: "Rewrite to different node type",
		},
	],
};
