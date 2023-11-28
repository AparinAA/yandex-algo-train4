const MOD = 10000000000000007n;
const _x = 881n;

function calcHashOfStr(h, x, s) {
	const k = s.length;

	for (let i = 1; i < k + 1; i++) {
		h[i] = (h[i - 1] * _x + BigInt(s[i - 1].charCodeAt(0) - 96)) % MOD;
		x[i] = (x[i - 1] * _x) % MOD;
	}
}

function isEqual(a, b, len, h, x) {
	return (
		(h[a + len] + h[b] * x[len]) % MOD ===
		(h[b + len] + h[a] * x[len]) % MOD
	);
}

function solution(data) {
	// parse data
	let [str] = data.trim().split(" ");

	const n = str.length;

	const hash = new BigUint64Array(n + 1).fill(0n);
	const x = new BigUint64Array(n + 1).fill(0n);
	x[0] = 1n;

	// create hash of the string
	calcHashOfStr(hash, x, str);

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
