const trees = [
	// binary tree
	{
		name: "1",
		left: {name: "2", left: {name: "4"}, right: {name: "5"}},
		right: {name: "3", left: {name: "6"}, right: {name: "7"}}
	},
    // tree with array children
	{
		type: "multi",
		children: [
			{type: "single", child: {type: "leaf", name: "1"}},
			{type: "single", child: {type: "leaf", name: "2"}},
			{type: "multi", children: [
				{type: "single", child: {type: "leaf", name: "3"}},
				{type: "single", child: {type: "leaf", name: "4"}}
			]}
		]
	}
];

export const stringifiedTrees = trees.map(JSON.stringify);

export default trees;
