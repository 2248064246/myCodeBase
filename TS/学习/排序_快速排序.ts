/*
 * @Author: huangyingli
 * @Date: 2022-03-05 13:06:21
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-05 13:23:19
 * @Description:
 */

function quickSort(arr: Array<any>): Array<any> {
  function sort(start: number, end: number) {
    if (start >= end) return arr;
    let key = arr[start];
    let i = start,
      j = end,
      temp: number;

    while (true) {
      while (i++ && i < end) {
        if (arr[i] > key) break;
      }
      while (j-- && j > start) {
        if (arr[j] < key) break;
      }
      if (i < j) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      } else {
        break;
      }
    }
    if (j > start) {
      temp = arr[j];
      arr[j] = arr[start];
      arr[start] = temp;
    }
    sort(start, j);
    sort(j + 1, end);
    return arr;
  }
  return sort(0, arr.length);
}

let arr3 = [5, 9, 7, 8, 3, 6, 1, 0, 2, 4];

console.log(quickSort(arr3));
