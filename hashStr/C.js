// !!! Z-функция без использования hash строки и бинпоиска
// !!! потому что непроходит по времени из-за BigInt. (в файле Сbin.c решение где используется hash строки)

function solution(data) {
	// parse data
	let [str] = data.trim().split("\n");
	const n = str.length;

	const z = new Array(n).fill(0);

	let l = 0;
	let r = 0;

	for (let i = 1; i < n; i++) {
		z[i] = Math.max(0, Math.min(z[i - l], r - i));
		while (i + z[i] < n && str[z[i]] === str[i + z[i]]) {
			z[i]++;
		}

		if (i + z[i] > r) {
			l = i;
			r = i + z[i];
		}
	}

	return z.join(" ");
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
// const start = Date.now();
// const file = fs
// 	.readFileSync("/Users/alexaparin/Downloads/84.file", "utf8")
// 	.trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
// console.info("Time out: ", (Date.now() - start) / 1000);
