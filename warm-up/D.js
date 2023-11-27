function solution(data) {
    let [str1, str2] = data.trim().split("\n");

    str1 = str1.trim();
    str2 = str2.trim();

    let letters1 = new Array(26).fill(0);
    let letters2 = new Array(26).fill(0);

    let n1 = str1.length;

    if (str2.length !== n1) {
        return "NO";
    }

    for (let i = 0; i < n1; i++) {
        letters1[str1[i].charCodeAt(0) - 97]++;
        letters2[str2[i].charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < 26; i++) {
        if (letters1[i] !== letters2[i]) {
            return "NO";
        }
    }

    return "YES";
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
