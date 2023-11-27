function Heap(compare) {
	this.compare = compare;
	this.heap = [];
}

Heap.prototype.add = function (val) {
	let child = this.heap.length;
	let parent = (child - 1) >>> 1;
	this.heap.push(val);

	while (child > 0 && this.compare(this.heap[child], this.heap[parent])) {
		[this.heap[parent], this.heap[child]] = [
			this.heap[child],
			this.heap[parent],
		];

		child = parent;
		parent = (child - 1) >>> 1;
	}
};

Heap.prototype.pop = function () {
	let len = this.heap.length;

	if (!len) {
		return;
	}

	const ans = this.heap[0];
	let pos = 0;
	this.heap[0] = this.heap[len - 1];
	while (2 * pos + 2 < len) {
		let tempChild = 2 * pos + 1;
		if (!this.compare(this.heap[tempChild], this.heap[2 * pos + 2])) {
			tempChild = 2 * pos + 2;
		}

		if (this.compare(this.heap[tempChild], this.heap[pos])) {
			[this.heap[tempChild], this.heap[pos]] = [
				this.heap[pos],
				this.heap[tempChild],
			];

			pos = tempChild;
		} else {
			break;
		}
	}

	this.heap.pop();
	return ans;
};

Heap.prototype.len = function () {
	return this.heap.length;
};

function compare(a, b) {
	return a < b;
}

const heap = new Heap(compare);
const n = 10 ** 6;
const arr = new Array(n);

for (let i = 0; i < n; i++) {
	const val = Math.floor(Math.random() * 10000);
	heap.add(val);
	arr[i] = val;
}

console.info("Heap and arr have created.");

const timeHeap = Date.now();
for (let i = 0; i < n; i++) {
	const minHeap = heap.pop();
}
const endHeap = Date.now() - timeHeap;
console.info("Time to find min of heap:\t", endHeap);

const timeArr = Date.now();
for (let i = 0; i < n; i++) {
	let minArr = arr[0];
	for (let i = 1; i < n; i++) {
		minArr = Math.min(minArr, arr[i]);
	}
}
const endArr = Date.now() - timeArr;

// console.info(minHeap === minArr);
console.info("Time to find min of arr:\t", endArr);
