function test(n1) {
	let longLongStr = new Array(n1)
		.fill()
		.map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)));

	let copyLongLongStr = longLongStr;

	let newLongLongStr = new Array(n1)
		.fill()
		.map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)));

	let start = Date.now();

	let count = 0;
	for (let i = 0; i < n1; i++) {
		if (longLongStr === copyLongLongStr) {
			count++;
		} else {
			count--;
		}
	}

	let end = Date.now();
	console.info("Time: ", end - start);
}

let listN = { "2^24": 2 ** 24, "2^25": 2 ** 25, "2^26": 2 ** 26 };

for (let n in listN) {
	console.info(`Length of string - ${n}`);
	test(listN[n]);
}
