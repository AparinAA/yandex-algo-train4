function solution(data) {
	// parse data
	let [params, nums] = data.trim().split("\n");

	let [n, M] = params.trim().split(" ").map(Number);

	nums = [...new Set(nums.trim().split(" ").map(Number))];

	M = nums.length;

	let sum = -1;
	let result = [];

	let map = new Map();

	for (let mask = 0; mask < 1 << M; mask++) {
		let s = 0;
		let temp = [];
		for (let i = 0; i < M; i++) {
			if ((mask >> i) & 1) {
				s += nums[i];
				temp.push(nums[i]);
			}
		}

		const arr = map.get(s) ?? [];
		if (!arr.length || arr.length > temp.length) {
			map.set(s, temp);
		}
	}

	for (let [key, val] of map) {
		if ((n >>> 1) - key < 0) {
			sum = 0;
		}

		const mlist = map.get(n - key) ?? [];

		if (mlist.length) {
			if (!result.length || result.length > mlist.length + val.length) {
				sum = -1;
				result = [...mlist.concat(val)];
			}
		}
	}

	if (result.length) {
		return `${result.length}\n${result.join(" ")}`;
	}

	return sum;
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
