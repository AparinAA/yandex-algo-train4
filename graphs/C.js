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

function solution(data) {
	// parse data
	let [parms, ...paths] = data.trim().split("\n");

	let [n, k] = parms.split(" ");
	n = +n;
	k = +k;

	paths = paths.map((path) => path.split(" ").map(Number));

	let [s, f] = paths.pop();

	let adjs = new Array(n + 1).fill().map(() => []);

	for (let [a, b, cost] of paths) {
		adjs[a].push([b, cost]);
		adjs[b].push([a, cost]);
	}

	let visited = new Array(n + 1).fill(0);
	let dist = new Array(n + 1).fill(Infinity);
	let heap = new Heap(compare);

	dist[s] = 0;
	heap.add([0, s]);

	while (heap.len()) {
		const [c, temp] = heap.pop();

		if (visited[temp] || dist[temp] < c) {
			continue;
		}

		visited[temp] = 1;
		for (let [to, cost] of adjs[temp]) {
			if (dist[to] > dist[temp] + cost) {
				dist[to] = dist[temp] + cost;
				heap.add([dist[to], to]);
			}
		}
	}

	if (!isFinite(dist[f])) {
		return -1;
	}

	return dist[f];

	//to do something, here code
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
