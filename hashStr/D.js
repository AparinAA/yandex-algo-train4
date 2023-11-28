const MOD = 1000000000007n;
const _x = 257n;

function calcHashOfStr(hash, hashReverse, x, nums) {
	const n = nums.length;
	for (let i = 1; i < n + 1; i++) {
		hash[i] = (hash[i - 1] * _x + nums[i - 1]) % MOD;
		hashReverse[i] = (hashReverse[i - 1] * _x + nums[n - i]) % MOD;
		x[i] = (x[i - 1] * _x) % MOD;
	}
}

function isEqual(a, b, len, hash, hashReverse, x) {
	return (
		(hash[a + len] + hashReverse[b] * x[len]) % MOD ===
		(hashReverse[b + len] + hash[a] * x[len]) % MOD
	);
}

function solution(data) {
	// parse data
	let [params, nums] = data.trim().split("\n");

	let [n, m] = params.trim().split(" ").map(Number);
	n = +n;
	m = +m;

	nums = nums
		.trim()
		.split(" ")
		.map((a) => BigInt(a));

	const hash = new BigUint64Array(n + 1).fill(0n);
	const hashReverse = new BigUint64Array(n + 1).fill(0n);

	const x = new BigUint64Array(n + 1).fill(0n);
	x[0] = 1n;

	let result = [];

	calcHashOfStr(hash, hashReverse, x, nums);

	for (let i = n >>> 1; i > -1; i--) {
		if (isEqual(0, n - 2 * i, i, hash, hashReverse, x)) {
			result.push(n - i);
		}
	}

	return result.join(" ");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
