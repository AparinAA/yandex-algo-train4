function solution(data, stream) {
	// parse data
	let [n] = data.trim().split("\n");
	n = +n;

	if (n === 0) {
		return "";
	}

	const result = [];

	const permutation = function (n, max, temp, cur) {
		if (temp >= max) {
			result.push(temp);
			if (result.length === 200) {
				//записываем ответ в файл через поток
				// и очишаем буфер result, чтобы в списке не накапливать больше 200 элементов
				stream.write(result.join("\n"));
				stream.write("\n");
				result.length = 0;
			}
			return;
		}

		for (let i = 0; i < n; i++) {
			if ((cur & (1 << (i + 1))) === 0) {
				temp = temp * 10 + i + 1;
				cur |= 1 << (i + 1);
				permutation(n, max, temp, cur);
				cur ^= 1 << (i + 1);
				temp = (temp * 0.1) >>> 0;
			}
		}

		return;
	};

	permutation(n, 10 ** (n - 1), 0, 0);
	stream.write(result.join("\n"));
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
var stream;
stream = fs.createWriteStream("output.txt");
result = solution(file, stream);
stream.close();
// fs.writeFileSync("output.txt", `${result}`);
