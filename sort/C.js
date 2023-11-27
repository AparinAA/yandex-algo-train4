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

function solution(data) {
	let [n1, nums1, n2, nums2] = data.trim().split("\n");

	n1 = +n1;
	n2 = +n2;

	if (!n1 && !n2) {
		return "";
	} else if (!n1) {
		return nums2;
	} else if (!n2) {
		return nums1;
	}

	nums1 = nums1.split(" ").map(Number);
	nums2 = nums2.split(" ").map(Number);
	const buf = new Array(n1 + n2).fill();

	merge(nums1.concat(nums2), buf, 0, n1 - 1, n1 + n2);
	return buf.join(" ");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
