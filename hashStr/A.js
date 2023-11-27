function solution(data) {
	// parse data
	let [s, n, ...queries] = data.trim().split("\n");

	n = +n;
	queries = queries.map((q) => q.trim().split(" ").map(Number));
	k = s.length;

	const _x = 491n;
	const MOD = 100000000000007n;

	const h = new BigUint64Array(k + 1).fill(0n);
	const x = new BigUint64Array(k + 1).fill(0n);
	x[0] = 1n;

	for (let i = 1; i < k + 1; i++) {
		h[i] = (h[i - 1] * _x + BigInt(s[i - 1].charCodeAt(0) - 96)) % MOD;
		x[i] = (x[i - 1] * _x) % MOD;
	}

	function isEqual(a, b, len) {
		return (
			(h[a + len] + h[b] * x[len]) % MOD ===
			(h[b + len] + h[a] * x[len]) % MOD
		);
	}

	const res = [];
	for (let [l, a, b] of queries) {
		res.push(isEqual(a, b, l) ? "yes" : "no");
	}

	return res.join("\n");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
