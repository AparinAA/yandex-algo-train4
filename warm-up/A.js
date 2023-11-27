function solution(data) {
    let [params, nums, ...queries] = data.trim().split("\n");

    let [N, M] = params.trim().split(" ").map(Number);

    nums = nums.trim().split(" ").map(Number);

    queries = queries.map((pair) => pair.trim().split(" ").map(Number));

    let ans = [];

    for (let i = 0; i < M; i++) {
        const [l, r] = queries[i];
        let min = 10001;
        let max = -1;
        for (let j = l; j < r + 1; j++) {
            min = Math.min(nums[j], min);
            max = Math.max(nums[j], max);
        }

        if (min !== max) {
            ans.push(max);
        } else {
            ans.push("NOT FOUND");
        }
    }

    return ans.join("\n");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
