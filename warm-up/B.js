function solution(data) {
	let [a, b, c, d] = data.trim().split(" ");

	a = +a;
	b = +b;
	c = +c;
	d = +d;

	const primeNumber = [
		2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67,
		71, 73, 79, 83, 89, 97,
	];
	let numerator = a * d + b * c;
	let denominator = b * d;

	for (let prime of primeNumber) {
		while (!(numerator % prime) && !(denominator % prime)) {
			numerator /= prime;
			denominator /= prime;
		}
	}

	return `${numerator} ${denominator}`;
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
