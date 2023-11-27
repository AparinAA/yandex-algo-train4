function solution(data) {
	// parse data
	// let [...] = data.trim().split(" ");
	//to do something, here code
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
