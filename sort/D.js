function merge(nums, buf, left, c, right) {
	let l1 = left;
	let l2 = c + 1;
	let order = left;

	while (l1 < c + 1 && l2 < right) {
		if (nums[l1] <= nums[l2]) {
			buf[order++] = nums[l1];
			l1++;
		} else {
			buf[order++] = nums[l2];
			l2++;
		}
	}

	if (l1 === c + 1) {
		while (l2 < right) {
			buf[order++] = nums[l2];
			l2++;
		}
	} else if (l2 === right) {
		while (l1 < c + 1) {
			buf[order++] = nums[l1];
			l1++;
		}
	}

	return;
}

function sortMerge(nums, buf, l, r) {
	if (l === r) {
		return;
	}

	const c = (l + r) >>> 1;

	sortMerge(nums, buf, l, c);
	sortMerge(nums, buf, c + 1, r);

	merge(nums, buf, l, c, r + 1);

	for (let i = l; i < r + 1; i++) {
		nums[i] = buf[i];
	}

	return;
}

function solution(data) {
	let [n, nums] = data.trim().split("\n");

	n = +n;

	if (!n) {
		return "";
	}

	nums = nums.split(" ").map(Number);
	const buf = new Array(n).fill();

	sortMerge(nums, buf, 0, n - 1);

	return nums.join(" ");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
