function partion(nums, left, right, x) {
	let g = -1;
	let e = -1;

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
		}
	}

	if (g === -1) {
		g = right;
	}

	return [e, g];
}

function sort(nums, left, right) {
	if (left >= right) {
		return;
	}

	let part = left + Math.floor(Math.random() * (right - left + 1));
	let x = nums[part];

	let [e, g] = partion(nums, left, right, x);

	sort(nums, left, e - 1);
	sort(nums, g, right);

	return;
}
function solution(data) {
	let [n, nums] = data.trim().split("\n");

	n = +n;

	if (!n) {
		return "";
	}

	nums = nums.split(" ").map(Number);

	sort(nums, 0, n - 1);

	return nums.join(" ");
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
