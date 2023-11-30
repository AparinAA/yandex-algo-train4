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

function dijkstra(adjs, visited, dist, n, m, weight) {
	const q = new Heap(compare);
	q.add([0, 1]);
	dist[1] = 0;

	while (q.len()) {
		const [fT, from] = q.pop();
		if (dist[from] < fT) {
			continue;
		}

		for (let [to, t, w] of adjs[from]) {
			if (w >= weight && t + fT <= 1440 && dist[to] > t + fT) {
				q.add([t + fT, to]);
				dist[to] = t + fT;
			}
		}
	}

	return isFinite(dist[n]);
}

function solution(data) {
	// parse data
	let [params, ...ways] = data.trim().split("\n");

	let [n, m] = params.trim().split(" ").map(Number);

	ways = ways.map((way) => way.trim().split(" ").map(Number));

	// 3 tons = 3 000 000 gramm;
	const adjs = new Array(n + 1).fill().map(() => []);
	const visited = new Array(n + 1).fill(0);
	const dist = new Array(n + 1).fill(Infinity);

	for (let [a, b, t, w] of ways) {
		adjs[a].push([b, t, w]);
		adjs[b].push([a, t, w]);
	}

	let l = 0;
	let r = 10000000;

	while (l < r) {
		const c = Math.floor((l + r + 1) * 0.5);
		visited.fill(0);
		dist.fill(Infinity);
		if (dijkstra(adjs, visited, dist, n, m, c * 100 + 3000000)) {
			l = c;
		} else {
			r = c - 1;
		}
	}

	return l;
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
