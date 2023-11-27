function solution(data) {
	// parse data
	let [parms, ...paths] = data.trim().split("\n");

	let [v, s, f] = parms.split(" ");
	v = +v;
	s = +s;
	f = +f;

	paths = paths.map((path) => path.split(" ").map(Number));

	// let adjs = new Array(v).fill().map(() => []);
	let visited = new Array(v).fill(0);
	let dist = new Array(v).fill(Infinity);
	let prev = new Array(v).fill(0);
	// для развернутого графа
	//dist2 = new Array(v).fill(Infinity);
	//dist2[0] = 0;
	dist[s - 1] = 0;
	visited[s - 1] = 1;
	prev[s - 1] = -1;

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

	console.info(dist);
	if (!isFinite(dist[f - 1])) {
		return -1;
	}

	return dist[f - 1];
	// for (let [a, b] of paths) {
	// 	adjs[a].push([b, cost]);
	// 	adjs[b].push([a, cost]);
	// }

	//to do something, here code
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
