function solution(data) {
    let [params, ...matrix] = data.trim().split("\n");

    matrix = matrix.map((row) => {
        return row.trim().split(" ").map(Number);
    });

    const [rows, cols] = params.trim().split(" ").map(Number);

    let max = 0;
    let prev = 0;

    let dp = new Array(cols + 1).fill(0);

    for (let i = 1; i < rows + 1; i++) {
        for (let j = 1; j < cols + 1; j++) {
            const temp = dp[j];
            if (matrix[i - 1][j - 1]) {
                dp[j] = Math.min(dp[j - 1], dp[j], prev) + 1;
                max = Math.max(max, dp[j]);
            } else {
                dp[j] = 0;
            }
            prev = temp;
        }
    }

    return max;
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
