function solution(data) {
	// parse data
	let [params, ...edges] = data.trim().split("\n");

	let [n, m] = params.trim().split(" ").map(Number);

	let adjs = new Array(n + 1).fill(n).map(() => new Set());
	edges = edges.map((str) => str.trim().split(" ").map(Number));

	for (let [a, b] of edges) {
		adjs[a].add(b);
		adjs[b].add(a);
	}

	let otherVertex = -1;

	for (let i = 2; i < n + 1; i++) {
		if (!adjs[i].has(1)) {
			otherVertex = i;
			break;
		}
	}

	if (otherVertex === -1 || m === 0) {
		return -1;
	}

	let setA = new Set();
	let setB = new Set();
	setA.add(1);

	const l = adjs[1].size;

	for (let s of adjs[1]) {
		let count = 0;
		for (let c of adjs[s]) {
			if (adjs[1].has(c) || c === 1) {
				count++;
			}
		}

		if (count === l) {
			setA.add(s);
		}
	}

	for (let i = 1; i < n + 1; i++) {
		if (!setA.has(i)) {
			setB.add(i);
		}
	}

	if (setB.size === 0) {
		return -1;
	}

	let result = [setA.size, [...setA].join(" "), [...setB].join(" ")];

	return result.join("\n");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
