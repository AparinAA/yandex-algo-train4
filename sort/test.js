/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
	const n = nums.length;

	function partition(nums, left, right, x, part) {
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

	let l = 0;
	let r = n - 1;
	while (l <= r) {
		const part = l + Math.floor(Math.random() * (r - l + 1));

		const [e, g] = partition(nums, l, r, nums[part]);
		console.info(e, g, k, l, r);
		if (e > k - 1) {
			r = e - 1;
		} else {
			if (g <= k - 1) {
				l = g;
			} else {
				return nums[k - 1];
			}
		}

		if (e === k - 1) {
			return nums[e];
		}
	}

	return nums[l];
};

function solution(data) {
	let [nums, k] = data.trim().split("\n");
	k = +k;
	nums = nums.split(" ").map(Number);
	let n = nums.length;
	k = n - k + 1;
	const nums1 = [...nums];
	nums1.sort((a, b) => a - b);
	const res = findKthLargest(nums, k);

	console.info(nums1, k, nums1[k] === res);

	return res;
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
// const file = fs
// 	.readFileSync("/Users/alexaparin/Downloads/18.file", "utf8")
// 	.trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
