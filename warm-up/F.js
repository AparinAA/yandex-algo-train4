function solution(data) {
    let [k, n, ...nums] = data.trim().split("\n");
    k = +k;
    n = +n;

    nums = nums.map(Number);

    n = nums.length;
    let ans = 0n;
    let fill = 0;
    let last = n - 1;

    while (last > -1 && nums[last] === 0) {
        last--;
    }

    let len = last;
    let i = len;
    for (let i = len; i > -1; i--) {
        if (fill + nums[i] === k) {
            ans += 2n * BigInt(last + 1);
            nums[i] = 0;
            fill = 0;

            while (i > -1 && nums[i] === 0) {
                i--;
            }

            last = i++;
        } else if (fill + nums[i] > k) {
            if (fill) {
                ans += 2n * BigInt(last + 1);
                nums[i] -= k - fill;
            }
            ans += 2n * BigInt(Math.floor(nums[i] / k) * (i + 1));
            fill = nums[i] - Math.floor(nums[i] / k) * k;
            nums[i] = 0;

            while (!fill && i > -1 && nums[i] === 0) {
                i--;
            }

            last = i++;
        } else {
            fill += nums[i];
            nums[i] = 0;
        }

        if (i === 0 && fill) {
            ans += 2n * BigInt(last + 1);
        }
    }

    return ans;
}

const solutionWorked = (input) => {
    let [count, _, ...floors] = input.trim().split("\n");
    count = Number(count);
    floors = floors.map((f) => +f);
    let time = 0;

    while (floors.at(-1) === 0) {
        floors.pop();
    }

    while (floors.length > 0) {
        const height = floors.length;

        let x = count;
        while (x > 0 && floors.length > 0) {
            if (floors.at(-1) !== 0) {
                floors[floors.length - 1]--;
                x--;
            }
            if (floors.at(-1) === 0) {
                floors.pop();
            }
        }
        while (floors.at(-1) === 0) {
            floors.pop();
        }
        time += height * 2;
    }

    return time;
};

const fs = require("fs");
const file = fs.readFileSync("input.txt", "utf8").trim();
result = solution(file);
console.info(solutionWorked(file) === result, solutionWorked(file), result);
fs.writeFileSync("output.txt", `${result}`);
