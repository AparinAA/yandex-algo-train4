const MOD = 1000000000007n;
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
		(hash[a + len] + hashReverse[b] * x[len]) % MOD ===
		(hashReverse[b + len] + hash[a] * x[len]) % MOD
	);
}

function binSearch(i, hash, hashReverse) {
	let l = 1;
	let r = i + 1;

	while (l < r) {
		const c = (l + r + 1) >>> 1;

		if (isEqual(0, n - i - 1, c, hash, hashReverse)) {
			l = c;
		} else {
			r = c - 1;
		}
	}

	return l;
}

function solution(data) {
	// parse data
	let [n, str] = data.trim().split("\n");

	n = +n;

	//to do something, here code
	const hash = new BigUint64Array(n + 1).fill(0n);
	const hashReverse = new BigUint64Array(n + 1).fill(0n);

	const x = new BigUint64Array(n + 1).fill(0n);
	x[0] = 1n;

	calcHashOfStr(hash, hashReverse, x, str);

	const result = [];
	for (let i = 0; i < n; i++) {
		const index = binSearch(i, hash, hashReverse);
		const check = isEqual(0, n - i - 1, index, hash, hashReverse);

		if (!check) {
			result.push(0);
		} else {
			result.push(index);
		}
	}

	return result.join(" ");
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
