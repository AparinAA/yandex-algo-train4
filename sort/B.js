let nums;

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
	let [n, arr] = data.trim().split("\n");
	nums = arr;
	n = +n;

	if (!n) {
		return "";
	}

	nums = nums.split(" ").map(Number);
	let nums1 = [...nums];

	let start1 = Date.now();
	sort(nums, 0, n - 1);
	let end1 = Date.now();

	let start2 = Date.now();
	nums1.sort((a, b) => a - b);
	let end2 = Date.now();

	console.info(`Time 1: ${(end1 - start1) / 1000}`);
	console.info(`Time 2: ${(end2 - start2) / 1000}`);

	return nums.join(" ");
}

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
