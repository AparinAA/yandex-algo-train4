function solution(data) {
	let [n, ...matrix] = data.trim().split("\n");

	n = +n;

	matrix = matrix.map((m) => m.trim().split(" ").map(Number));

	//to do something, here code
	//comming soon...
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
