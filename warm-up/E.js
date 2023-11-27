function solution(data) {
    let [n, nums] = data.trim().split("\n");

    nums = nums.trim().split(" ").map(Number);
    n = nums.length;

    let leftSum = 0;
    let rightSum = nums.reduce((acc, c) => acc + c, 0);
    let result = [];

    for (let i = 0; i < n; i++) {
        const rightPart = rightSum - nums[i] * (n - i);
        const leftPart = nums[i] * i - leftSum;

        rightSum -= nums[i];
        leftSum += nums[i];

        result.push(rightPart + leftPart);
    }

    return result.join(" ");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
