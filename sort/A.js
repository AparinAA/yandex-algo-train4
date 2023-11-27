function partition(nums, left, right, x, part) {
	let g = -1;
	let e = -1;
	let low = 0;

	for (let i = left; i < right + 1; i++) {
		if (g === -1 && nums[i] > x) {
			g = i;
		} else if (e === -1 && nums[i] === x) {
			e = i;
			if (g !== -1 && e > g) {
				[nums[g], nums[e]] = [nums[e], nums[g]];
				e = g;
				g++;
			}
		} else if (nums[i] === x && g !== -1) {
			let tempG = nums[g];
			nums[g] = nums[i];
			nums[i] = tempG;
			g++;
		} else if (nums[i] < x) {
			if (e !== -1 && g !== -1) {
				let tempE = nums[e];
				let tempG = nums[g];
				nums[e] = nums[i];
				nums[g] = tempE;
				nums[i] = tempG;
				e++;
				g++;
			} else if (g !== -1) {
				[nums[g], nums[i]] = [nums[i], nums[g]];
				g++;
			} else if (e !== -1) {
				[nums[e], nums[i]] = [nums[i], nums[e]];
				e++;
			}
			low++;
		}
	}

	return [e, g, low];
}

function solution(data) {
	let [n, nums, x] = data.trim().split("\n");

	n = +n;
	x = +x;

	nums = nums.split(" ").map(Number);

	const [, , low] = partition(nums, 0, n - 1, x);

	return [low, n - low].join("\n");
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
