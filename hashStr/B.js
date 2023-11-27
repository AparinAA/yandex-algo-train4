function solution(data) {
	// parse data
	let [str] = data.trim().split(" ");

	const n = str.length;

	const MOD = 10000000000000007n;
	const _x = 881n;

	const hash = new BigUint64Array(n + 1).fill(0n);
	const x = new BigUint64Array(n + 1).fill(0n);
	x[0] = 1n;
	// create hash of the string
	for (let i = 1; i < n + 1; i++) {
		hash[i] = (hash[i - 1] * _x + BigInt(str[i - 1].charCodeAt(0))) % MOD;
		x[i] = (x[i - 1] * _x) % MOD;
	}

	function isEqual(a, b, len, hash, x) {
		return (
			(hash[a + len] + hash[b] * x[len]) % MOD ===
			(hash[b + len] + hash[a] * x[len]) % MOD
		);
	}

	let max = 0;

	for (let i = 0; i < n; i++) {
		if (isEqual(0, n - i, i, hash, x)) {
			max = Math.max(i, max);
		}
	}

	return n - max;
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
