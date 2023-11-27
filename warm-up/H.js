function solution(data) {
    let [a, b, n] = data.trim().split("\n");

    for (let i = n; i > 0; i--) {
        const persB = Math.floor(b / n) + (b % n ? 1 : 0);
        if (persB < a) {
            return "Yes";
        }
    }

    return "No";
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
