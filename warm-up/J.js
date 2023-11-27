function solution(data) {
    let [n, ...queries] = data.trim().split("\n");

    n = +n;
    queries = queries.map((q) =>
        q
            .trim()
            .split(" ")
            .map((item) => Number(item.trim()))
            .filter((i) => i)
    );

    // a_1 * x_1 + a_2 * x_2 + ... + a_k * x_k = n
    // a_1 < a_2 < a_3 < ...
    // x_1 > x_2 > x_3 > ...
    function optimize(n, left, right) {
        let low = Math.floor(n / right);
        let up = Math.floor(n / left);
        return n % right === 0 || n % left == 0 || low != up;
    }

    const ans = [];

    for (let i = 0; i < n; i++) {
        ans.push(optimize(...queries[i]) ? "YES" : "NO");
    }

    return ans.join("\n");
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
