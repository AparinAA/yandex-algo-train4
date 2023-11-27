function solution(data) {
	// parse data
	let [x] = data.trim().split("\n");
	x = +x;

	let l = 1;
	let r = 1;
	let index = 1;
	let last = 0;

	while (l <= x && r <= x && index <= x) {
		if (l ** 2 < r ** 3) {
			last = 1;
			l++;
		} else if (l ** 2 > r ** 3) {
			last = 0;
			r++;
		} else {
			last = 1;
			l++;
			r++;
		}
		index++;
	}

	if (last === 1) {
		return (l - 1) ** 2;
	} else {
		return (r - 1) ** 3;
	}
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
