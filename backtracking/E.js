//проверка является ли скобочная последовательность правильной
function check(str) {
	const q = [];
	const n = str.length;

	for (let i = 0; i < n; i++) {
		const c = str[i];
		if (c[0] == ")" || c[0] == "]") {
			if (!q.length) {
				return false;
			}

			if (
				(c[0] == ")" && q.at(-1) == "(") ||
				(c[0] == "]" && q.at(-1) == "[")
			) {
				q.pop();
			} else {
				return false;
			}
		} else {
			q.push(c);
		}
	}

	return !q.length;
}

function solution(data, stream) {
	// parse data
	let [n] = data.trim().split(" ");
	n = +n;

	if (n === 0) {
		return "";
	}

	const result = [];

	function subgen(result, cur, openC, closedC, openS, closedS) {
		if (cur.length === n) {
			//можно обойтись без проверки check(cur),
			// если чуть-чуть поправить последовательность добавления скобок ")" "]"
			if (check(cur)) {
				const str = cur.join("");
				result.push(str);
				if (result.length === 200) {
					stream.write(result.join("\n"));
					stream.write("\n");
					result.length = 0;
				}
			}
			return;
		}

		if (openC + openS < n >>> 1) {
			cur.push("(");
			subgen(result, cur, openC + 1, closedC, openS, closedS);
			cur.pop();
		}

		if (openS + openC < n >>> 1) {
			cur.push("[");
			subgen(result, cur, openC, closedC, openS + 1, closedS);
			cur.pop();
		}

		if (cur.length && closedS < openS && cur.at(-1) !== "(") {
			cur.push("]");
			subgen(result, cur, openC, closedC, openS, closedS + 1);
			cur.pop();
		}

		if (cur.length && closedC < openC && cur.at(-1) !== "[") {
			cur.push(")");
			subgen(result, cur, openC, closedC + 1, openS, closedS);
			cur.pop();
		}
	}

	subgen(result, [], 0, 0, 0, 0);

	stream.write(result.join("\n"));
	return result;
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
let stream = fs.createWriteStream("output.txt");
result = solution(file, stream);
