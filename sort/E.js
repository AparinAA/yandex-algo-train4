function solution(data) {
	let [n, ...strs] = data.trim().split("\n");

	n = +n;

	strs = strs;

	let m = strs[0].length;
	let backets = new Array(10).fill(0).map(() => []);

	let stream = ["Initial array:"];
	stream.push(strs.join(", "));

	for (let p = m - 1; p > -1; p--) {
		stream.push("**********", `Phase ${m - p}`);

		for (let i = 0; i < n; i++) {
			backets[+strs[i][p]].push(strs[i]);
		}

		for (let i = 0; i < 10; i++) {
			stream.push(
				`Bucket ${i}: ${
					backets[i].length ? backets[i].join(", ") : "empty"
				}`
			);
		}

		let inL = 0;

		for (let i = 0; i < 10; i++) {
			const lenB = backets[i].length;
			for (let j = 0; j < lenB; j++) {
				strs[inL] = backets[i][j];
				inL++;
			}
			backets[i].length = 0;
		}
	}

	stream.push("**********", "Sorted array:");

	stream.push(strs.join(", "));

	return stream.join("\n");
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
