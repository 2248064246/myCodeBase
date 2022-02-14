/*
 * @Author: huangyingli
 * @Date: 2022-02-14 22:40:56
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-14 23:08:13
 * @Description:
 */

function heapSort(ary: number[]): number[] {
  function minHeap(ary: number[], start: number, end: number) {
    let cur = Math.floor(start);
    let child = cur * 2 + 1;
    let temp: number;
    while (child <= end) {
      // 如果存在右子节点, 并且判断右节点是否大于左节点
      if (child + 1 <= end && ary[child + 1] < ary[child]) child++;
      if (ary[child] < ary[cur]) {
        temp = ary[cur];
        ary[cur] = ary[child];
        ary[child] = temp;
        cur = child;
        child = cur * 2 + 1;
      } else {
        return;
      }
    }
    // console.log(ary)
  }

  for (let i = ary.length / 2 - 1; i >= 0; i--) {
    // 构建堆  ary.length/2-1: 表示最后一个父节点
    minHeap(ary, i, ary.length - 1);
  }

  for (let i = ary.length - 1; i > 0; i--) {
    /* 将最后一个和第一个兑换, 起到筛选作用 */
    let temp = ary[0];
    ary[0] = ary[i];
    ary[i] = temp;
    // 剔除最后一个元素,并将其余值恢复为堆
    minHeap(ary, 0, i - 1);
  }
  return ary;
}

let ary1 = [7, 6, 8, 2, 9, 3, 4, 1, 5] as Array<number>;
console.time('sort');
console.log(heapSort(ary1));
console.timeEnd('sort');
