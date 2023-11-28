const MOD = 100000000000007n;
const _x = 257n;

function calcHashOfStr(hash, hashReverse, x, str) {
	const n = str.length;

	for (let i = 1; i < n + 1; i++) {
		hash[i] = (hash[i - 1] * _x + BigInt(str[i - 1].charCodeAt(0))) % MOD;
		hashReverse[i] =
			(hashReverse[i - 1] * _x + BigInt(str[n - i].charCodeAt(0))) % MOD;
		x[i] = (x[i - 1] * _x) % MOD;
	}
}

function isEqual(a, b, len, hash, hashReverse) {
	return (
		(hash[a] * x[len] + hashReverse[b + len]) % MOD ===
		(hashReverse[b] * x[len] + hash[a + len]) % MOD
	);
}

function binSearch(left, right, n, hash, hashReverse) {
	let l = 0;
	let r = Math.min(n - right - 1, left);
	while (l < r) {
		const c = (l + r + 1) >>> 1;
		if (isEqual(left - c, n - right - 1 - c, c, hash, hashReverse)) {
			l = c;
		} else {
			r = c - 1;
		}
	}

	return l;
}

function solution(data) {
	// parse data
	let [str] = data.trim().split("\n");

	const n = str.length;
	const hash = new BigUint64Array(n + 1);
	const x = new BigUint64Array(n + 1);
	const hashReverse = new BigUint64Array(n + 1).fill(0n);

	x[0] = 1n;

	calcHashOfStr(hash, hashReverse, x, str);

	let count = 0;
	for (let i = 0; i < n - 1; i++) {
		count += binSearch(i, i, n, hash, hashReverse);
		if (str[i] === str[i + 1]) {
			count += binSearch(i, i + 1, n, hash, hashReverse) + 1;
		}
	}

	return count + n;
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
