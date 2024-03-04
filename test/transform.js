import transform from "../src/transform.js";
import trees, {stringifiedTrees} from "./utils/trees.js";
import copy from "./utils/copy.js";

const tree = trees[0];

export default {
	name: "transform()",
	run (t, ...args) {
		transform(t, ...args);
		console.log(t);
		return JSON.stringify(t);
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
					if (node.name !== "foo") {
						return {...node, name: "foo"};
					}
				}
			],
			expect: stringifiedTrees[0].replace(/[0-9]/g, 'foo'),
			description: "Rewrite tree of size > 1"
		}
	]
};
