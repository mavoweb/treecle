import walkUp from "../src/walkUp.js";
import trees from "./utils/trees.js";
import updateParents from "../src/updateParents.js";
import copy from "./utils/copy.js"

const tree = copy(trees[0]);
updateParents(tree);

export default {
	name: "walkUp()",
	run (node, cb) {
		return walkUp(node, cb);
	},
	tests: [
		{
            name: "No callback",
			args: [tree.right, () => {}],
			expect: tree
		},
        {
            name: "Callback returns a value",
            args: [tree.right, n => n.name === "1" ? n : undefined],
            expect: tree
        }
	]
};
