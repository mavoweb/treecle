import reduce from "../src/reduce.js";

const tree = {
	value: 1,
	left: {
		value: 2,
		left: {
			value: 4
		},
		right: {
			value: 5
		}
	},
	right: {
		value: 3,
	}
};

export default {
	name: "reduce()",
	run (...args) {
		return reduce(...args);
	},
	tests: [
		{
			name: "Summation",
			args: [tree, (acc, node) => acc + node.value, 0],
			expect: 15
		},
		{
			name: "String concatenation",
			args: [tree, (acc, node) => acc + node.value, ""],
			expect: "12453"
		}
	]
};
