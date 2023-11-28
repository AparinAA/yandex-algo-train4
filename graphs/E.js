function Heap(compare) {
	this.compare = compare;
	this.heap = [];
}

Heap.prototype.add = function (val) {
	let child = this.heap.length;
	let parent = (child - 1) >>> 1;
	this.heap.push(val);

	while (child > 0 && this.compare(this.heap[child], this.heap[parent])) {
		[this.heap[parent], this.heap[child]] = [
			this.heap[child],
			this.heap[parent],
		];

		child = parent;
		parent = (child - 1) >>> 1;
	}
};

Heap.prototype.pop = function () {
	let len = this.heap.length;

	if (!len) {
		return;
	}

	const ans = this.heap[0];
	let pos = 0;
	this.heap[0] = this.heap[len - 1];

	while (2 * pos + 2 < len) {
		let tempChild = 2 * pos + 1;
		if (!this.compare(this.heap[tempChild], this.heap[2 * pos + 2])) {
			tempChild = 2 * pos + 2;
		}

		if (this.compare(this.heap[tempChild], this.heap[pos])) {
			[this.heap[tempChild], this.heap[pos]] = [
				this.heap[pos],
				this.heap[tempChild],
			];

			pos = tempChild;
		} else {
			break;
		}
	}

	this.heap.pop();
	return ans;
};

Heap.prototype.len = function () {
	return this.heap.length;
};

function compare(a, b) {
	return a[0] < b[0];
}

function BFS(start, v, paths, dist, visited, prev) {
	let q = [start];

	dist[start] = 0;

	while (q.length) {
		const temp = q.pop();

		for (let [to, d] of paths[temp]) {
			if (dist[to] > dist[temp] + d / v) {
				dist[to] = dist[temp] + d / v;
				prev[to] = temp;
				if (!visited[to]) {
					q.push(to);
				}
			}
		}

		visited[temp] = 1;
	}
}

function dijkstraToDist(start, paths, dist, visited) {
	const heap = new Heap(compare);
	dist[start] = 0;
	heap.add([0, start]);

	while (heap.len()) {
		const [c, temp] = heap.pop();
		if (visited[temp] || dist[temp] < c) {
			continue;
		}

		visited[temp] = 1;
		for (let [to, cost] of paths[temp]) {
			if (dist[to] > dist[temp] + cost) {
				dist[to] = dist[temp] + cost;
				heap.add([dist[to], to]);
			}
		}
	}
}

function solution(data) {
	// parse data
	let [N, ...queries] = data.trim().split("\n");

	N = +N;

	let drivers = new Array(N + 1).fill([-1, -1, -1]);
	let paths = new Array(N + 1).fill().map(() => []);

	for (let i = 0; i < N; i++) {
		drivers[i + 1] = [i + 1, ...queries[i].split(" ").map(Number)];
	}

	for (let i = N; i < queries.length; i++) {
		const [a, b, s] = queries[i].split(" ").map(Number);

		paths[a].push([b, s]);
		paths[b].push([a, s]);
	}

	let globalGlobalDist = new Array(N + 1).fill(Infinity);

	let dist = new Array(N + 1).fill(Infinity);
	let visited = new Array(N + 1).fill(0);
	let prev = new Array(N).fill();

	globalGlobalDist[1] = 0;

	dijkstraToDist(1, paths, globalGlobalDist, visited);

	const fastest = new Array(N + 1).fill(null);
	fastest[0] = [-1, -1];
	fastest[1] = [1, 0];

	for (let i = 2; i < N + 1; i++) {
		fastest[i] = [i, drivers[i][1] + globalGlobalDist[i] / drivers[i][2]];
	}

	let times = fastest.map((i) => i[1]);
	fastest.sort((a, b) => a[1] - b[1]);

	let maxTime = 0;
	let allPaths = new Array(N + 1).fill().map(() => []);
	allPaths[1] = [];
	let vis = [];
	let index = 1;

	drivers.sort((a, b) => {
		if (b[2] > a[2]) {
			return 1;
		} else if (b[2] < a[2]) {
			return -1;
		}

		if (b[1] < a[1]) {
			return 1;
		}
		return -1;
	});

	for (let i = 0; i < N; i++) {
		dist.fill(Infinity);
		prev.fill(0);
		visited.fill(0);
		let minArr = 1;

		const [u, t, v] = drivers[i];
		prev[u] = -1;
		dist[u] = 0;

		BFS(u, v, paths, dist, visited, prev);

		for (let [vi] of vis) {
			if (times[vi] + dist[vi] < dist[minArr] + times[minArr]) {
				minArr = vi;
			}
		}

		if (times[u] > t + dist[minArr] + times[minArr]) {
			times[u] = t + dist[minArr] + times[minArr];
		}

		if (u !== 1) {
			allPaths[u] = [...allPaths[minArr], u];
		}

		if (maxTime < times[u]) {
			maxTime = times[u];
			index = u;
		}

		vis.push([u, times[u]]);
	}

	allPaths[index].reverse();
	allPaths[index].push(1);
	return `${maxTime}\n${allPaths[index].join(" ")}`;
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);

// const fs = require("fs");
// for (let i = 1; i < 34; i++) {
// 	const file = fs
// 		.readFileSync(
// 			`/Users/alexaparin/Downloads/tests-2/G/${i > 9 ? i : "0" + i}`,
// 			"utf8"
// 		)
// 		.trim();
// 	const start = Date.now();
// 	result = solution(file);
// 	const resultTime = (Date.now() - start) / 1000;
// 	console.info("TEST", i, " Time: ", resultTime, " s");
// 	// console.info("-ANSWER: ", result);
// 	const out = fs
// 		.readFileSync(
// 			`/Users/alexaparin/Downloads/tests-2/G/${i > 9 ? i : "0" + i}.a`,
// 			"utf8"
// 		)
// 		.trim();
// 	if (
// 		!(
// 			parseFloat(result.split("\n")[0]).toFixed(4) ===
// 			parseFloat(out.split("\n")[0]).toFixed(4)
// 		)
// 	) {
// 		console.info(
// 			"-------Fail",
// 			parseFloat(result.split("\n")[0], 4).toFixed(4),
// 			parseFloat(out.split("\n")[0], 4).toFixed(4),
// 			parseFloat(result.split("\n")[0], 4).toFixed(4) ===
// 				parseFloat(out.split("\n")[0], 4).toFixed(4)
// 		);
// 	}
// }
