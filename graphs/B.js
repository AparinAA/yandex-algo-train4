function dijkstra(paths, dist, prev, visited, v, s) {
	let q = [s - 1];
	while (q.length) {
		const temp = q.pop();
		for (let i = 0; i < v; i++) {
			if (i !== temp && paths[temp][i] > -1) {
				if (dist[i] > dist[temp] + paths[temp][i]) {
					dist[i] = dist[temp] + paths[temp][i];
					prev[i] = temp;
				}
			}
			if (!visited[i]) {
				q.push(i);
			}
		}

		visited[temp] = 1;
	}
}

function solution(data) {
	// parse data
	let [parms, ...paths] = data.trim().split("\n");

	let [v, s, f] = parms.split(" ");
	v = +v;
	s = +s;
	f = +f;

	paths = paths.map((path) => path.split(" ").map(Number));

	let visited = new Array(v).fill(0);
	let dist = new Array(v).fill(Infinity);
	let prev = new Array(v).fill(0);

	dist[s - 1] = 0;
	visited[s - 1] = 1;
	prev[s - 1] = -1;

	dijkstra(paths, dist, prev, visited, v, s);

	if (!isFinite(dist[f - 1])) {
		return -1;
	}

	let q = f - 1;

	let result = [];

	while (q !== -1) {
		result.push(q + 1);
		q = prev[q];
	}

	result.reverse();

	return result.join(" ");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
