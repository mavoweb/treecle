import map from "../src/map.js";
import trees, {stringifiedTrees} from "./utils/trees.js";

const tree = trees[0];

export default {
	name: "map()",
	run (tree, ...args) {
		const mapped = map(tree, ...args);
		return [JSON.stringify(tree), JSON.stringify(mapped)];
	},
	// Tests expect an array of the form [serialized input AST, expected output AST]
	// This is to ensure the original AST was not mutated during mapping.
	tests: [
		{
			args: [tree, () => undefined],
			expect: [stringifiedTrees[0], stringifiedTrees[0]],
			description: "Empty transform"
		},
		{
			args: [
				tree,
				(node) => {
					if (node.name !== "foo") {
						return {...node, name: "foo"};
					}
				}
			],
			expect: [stringifiedTrees[0], stringifiedTrees[0].replace(/[0-9]/g, "foo")],
			description: "Rewrite tree of size > 1"
		}
	]
};
