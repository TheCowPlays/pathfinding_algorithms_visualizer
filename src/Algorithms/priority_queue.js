export class PriorityQueue {
    constructor(comparator = (a, b) => a.distance - b.distance) {
        this.heap = [null]; // We store keys starting from index 1 for easier math in the `bubbleUp` and `sinkDown` methods.
        this.comparator = comparator;
    }

    enqueue(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    dequeue() {
        const min = this.heap[1];
        this.heap[1] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.sinkDown();
        return min;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 1 && this.comparator(this.heap[Math.floor(index / 2)], this.heap[index]) > 0) {
            [this.heap[Math.floor(index / 2)], this.heap[index]] = [this.heap[index], this.heap[Math.floor(index / 2)]];
            index = Math.floor(index / 2);
        }
    }

    sinkDown() {
        let index = 1;
        while (index * 2 < this.heap.length) {
            let smallerIndex = index * 2;
            if (index * 2 + 1 < this.heap.length && this.comparator(this.heap[index * 2 + 1], this.heap[index * 2]) < 0) {
                smallerIndex = index * 2 + 1;
            }
            if (this.comparator(this.heap[smallerIndex], this.heap[index]) < 0) {
                [this.heap[smallerIndex], this.heap[index]] = [this.heap[index], this.heap[smallerIndex]];
                index = smallerIndex;
            } else {
                break;
            }
        }
    }

    decreaseKey(node, newDistance) {
        let index = this.heap.findIndex((element) => element === node);
        if (index === -1) return;
        this.heap[index].distance = newDistance;
        this.bubbleUp();
        this.sinkDown();
    }

    contains(node) {
        return this.heap.includes(node);
    }

    isEmpty() {
        return this.heap.length === 1;
    }
}
