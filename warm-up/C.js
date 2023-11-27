function solution(data) {
    let [Xa, Ya, Xb, Yb] = data.trim().split(" ");

    Xa = +Xa;
    Ya = +Ya;
    Xb = +Xb;
    Yb = +Yb;

    const r = Math.sqrt(Xa ** 2 + Ya ** 2);
    const d = Math.sqrt(Xb ** 2 + Yb ** 2);
    const a = Math.sqrt((Xb - Xa) ** 2 + (Yb - Ya) ** 2);

    let a1 = Math.atan2(Ya, Xa);
    let a2 = Math.atan2(Yb, Xb);
    let absolutA1 = Math.abs(a1);
    let absolutA2 = Math.abs(a2);

    let alpha = 0;

    if (a1 * a2 >= 0) {
        alpha = Math.max(absolutA1, absolutA2) - Math.min(absolutA1, absolutA2);
    } else {
        const sum = absolutA1 + absolutA2;
        alpha = Math.min(2 * Math.PI - sum, sum);
    }

    if (alpha < 0.0000001 || alpha >= Math.PI) {
        return a;
    }
    const l = Math.min(r, d) * alpha;

    return Math.min(r + d, l + Math.max(r, d) - Math.min(r, d));
}
const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
fs.writeFileSync("output.txt", `${result}`);
