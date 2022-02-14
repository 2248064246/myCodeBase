/*
 * @Author: huangyingli
 * @Date: 2022-02-14 17:21:35
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-14 18:31:56
 * @Description:
 */

interface Minheap {
  heap: Array<number>;
  insert(value: number): void;
  /**
   * 用于插入时堆化
   * @param index
   */
  siftUp(index: number): void;

  /**
   * 堆下移(整体堆化)
   * @param index
   */
  siftDown(index: number): void;
}

class Minheap {
  constructor() {
    this.heap = [];
  }

  parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  leftIndex(index: number) {
    return 2 * index + 1;
  }
  rightIndex(index: number) {
    return 2 * index + 2;
  }

  insert(value: number) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  private compare(a: number, b: number): boolean {
    return a > b;
  }

  private swap(idxA: number, idxB: number) {
    [this.heap[idxA], this.heap[idxB]] = [this.heap[idxB], this.heap[idxA]];
  }

  siftUp(index: number) {
    let parentIdx = this.parentIndex(index);

    /* 将最小的节点向上移动 */
    while (index >= 0 && this.compare(this.heap[parentIdx], this.heap[index])) {
      this.swap(parentIdx, index);
      index = parentIdx;
      parentIdx = this.parentIndex(index);
    }
  }

  siftDown(index: number) {
    let targetIdx = index;

    let leftIdx = this.leftIndex(index);
    let rightIdx = this.rightIndex(index);

    let len = this.heap.length;

    /* 对比左右节点, 找出最小的idx */
    if (
      leftIdx < len &&
      this.compare(this.heap[targetIdx], this.heap[leftIdx])
    ) {
      targetIdx = leftIdx;
    }
    if (
      rightIdx < len &&
      this.compare(this.heap[targetIdx], this.heap[rightIdx])
    ) {
      targetIdx = rightIdx;
    }

    /* 存在比当前节点小的子节点, 进行交换 */
    if (targetIdx !== index) {
      this.swap(targetIdx, index);
      this.siftDown(targetIdx);
    }
  }

  extract() {
    let len = this.heap.length;
    if (len > 1) {
      let value = this.heap[0];
      /* 重新构建最堆 */
      this.heap[0] = this.heap.pop() as number;
      this.siftDown(0);
      return value;
    } else if (len == 1) {
      return this.heap[0];
    } else {
      return null;
    }
  }
}

let minH = new Minheap();

// let ary = [3, 6, 1, 8, 5, 0, 2, 5, 8, 6, 7];
let ary = new Array(10).fill(0);

ary.forEach((i, idx) => {
  ary[idx] = Math.floor(Math.random() * 1000);
});

ary.forEach((i) => {
  minH.insert(i);
});

console.time('minH sort');
ary.forEach(() => {
  console.log(minH.extract());
  // minH.extract();
});

console.timeEnd('minH sort');

console.time('sort');
ary.sort((a, b) => a - b);
console.timeEnd('sort');
