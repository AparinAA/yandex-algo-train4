function solution(data) {
    let [str] = data.trim().split("\n");

    const pairs = {
        "}": "{",
        "]": "[",
        ")": "(",
    };

    const opens = new Set(Object.values(pairs));

    const q = [];
    const n = str.length;

    for (let i = 0; i < n; i++) {
        const char = str[i];
        if (opens.has(char)) {
            q.push(char);
        } else if (pairs.hasOwnProperty(char)) {
            if (q.length && pairs[char] === q[q.length - 1]) {
                q.pop();
            } else {
                return "no";
            }
        }
    }

    return q.length ? "no" : "yes";
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
