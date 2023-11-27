function solution(data) {
	// parse data
	let [n] = data.trim().split(" ");
	n = +n;

	let cols = 0;
	let hills = 0;
	let dales = 0;

	const isSafePlace = (row, col) =>
		!(
			cols & (1 << col) ||
			hills & (1 << (32 - (row - col))) ||
			dales & (1 << (row + col))
		);

	const addPlaceQueen = (row, col) => {
		cols |= 1 << col;
		hills |= 1 << (32 - (row - col));
		dales |= 1 << (row + col);
	};

	const removeQueen = (row, col) => {
		cols ^= 1 << col;
		hills ^= 1 << (32 - (row - col));
		dales ^= 1 << (row + col);
	};

	const backtrackQueen = (row, count) => {
		if (row === n) {
			return ++count;
		}

		for (let col = 0; col < n; col++) {
			if (isSafePlace(row, col)) {
				addPlaceQueen(row, col);
				count = backtrackQueen(row + 1, count);
				removeQueen(row, col);
			}
		}
		return count;
	};

	return backtrackQueen(0, 0);
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
