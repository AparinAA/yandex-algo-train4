function solution(data) {
	// parse data
	let [n, fromTo, R, ...paths] = data.trim().split("\n");

	let [s, f] = fromTo.split(" ");
	s = +s;
	f = +f;
	n = +n;
	R = +R;

	if (!R) {
		return s === f;
	}

	paths = paths.map((path) => path.split(" ").map(Number));

	let visited = new Array(n + 1).fill(0);
	let adjs = new Array(n + 1).fill().map(() => []);
	let dist = new Array(n + 1).fill(Infinity);
	dist[s] = 0;

	for (let [a, ta, b, tb] of paths) {
		adjs[a].push([ta, b, tb]);
	}

	let q = [[s, 0]];
	let deleted = new Map();

	while (q.length) {
		const [temp, time] = q.shift();
		visited[temp] = 1;

		for (let [ta, b, tb] of adjs[temp]) {
			if (ta >= time) {
				if (dist[b] > tb) {
					dist[b] = tb;
					let i = 0;
					for (; i < q.length; i++) {
						if (q[i][0] === b && q[i][1] > tb) {
							q[i] = [b, tb];
						}
					}

					if (i === q.length) {
						q.push([b, tb]);
					}
				}
			}
		}
	}

	if (isFinite(dist[f])) {
		return dist[f];
	}

	return -1;
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
