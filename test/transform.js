import transform from "../src/transform.js";
import trees, {stringifiedTrees} from "./utils/trees.js";
import copy from "./utils/copy.js";

const tree = trees[0];

export default {
	name: "transform()",
	run (tree, ...args) {
		tree = copy(tree);
		transform(tree, ...args);
		return JSON.stringify(tree);
	},
	tests: [
		{
			args: [tree, () => undefined],
			expect: stringifiedTrees[0],
			description: "Empty transform"
		},
		{
			args: [
				tree,
				(node) => {
					if (node.name !== "1") {
						return {...node, name: "foo"};
					}
				}
			],
			expect: stringifiedTrees[0].replace(/[2-9]/g, 'foo'),
			description: "Rewrite tree of size > 1"
		}
	]
};
