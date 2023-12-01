function solution(data) {
	// parse data
	let [x] = data.trim().split("\n");
	x = +x;

	if (x === 1) {
		return 1;
	}

	let l = 1;
	let r = x * x;

	while (l < r) {
		const c = Math.floor((l + r + 1) * 0.5);

		let a1 = Math.floor(Math.pow(c, 1 / 2));
		let a2 = Math.floor(Math.pow(c, 1 / 3));
		let a3 = Math.floor(Math.pow(c, 1 / 6));

		if (a1 + a2 - a3 < x) {
			l = c;
		} else {
			r = c - 1;
		}
	}

	if (
		l - (Math.floor(Math.pow(l, 1 / 2)) + 1) ** 2 <
		l - (Math.floor(Math.pow(l, 1 / 3)) + 1) ** 3
	) {
		return (Math.floor(Math.pow(l, 1 / 3)) + 1) ** 3;
	} else {
		return (Math.floor(Math.pow(l, 1 / 2)) + 1) ** 2;
	}
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
