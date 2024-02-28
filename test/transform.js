import jsep from "../node_modules/jsep/dist/jsep.min.js";
import transform from "../src/transform.js";

export default {
	name: "transform()",
	run(str, ...args) {
		const ast = jsep(str);
		transform(ast, ...args);
		return JSON.stringify(ast);
	},
	tests: [
		{
			args: ["foo + bar", () => undefined],
			expect: '{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"Identifier","name":"bar"}}',
			description: "Empty transform",
		},
		{
			args: ["foo", (node) => ({ ...node, name: "bar" })],
			expect: '{"type":"Identifier","name":"foo"}',
			description: "Does not modify root node",
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
			expect: '{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"type":"Identifier","name":"foo"}}',
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
			expect: '{"type":"BinaryExpression","operator":"+","left":{"type":"Identifier","name":"foo"},"right":{"name":"prod","type":"Identifier"}}',
			description: "Rewrite to different node type",
		},
	],
};
