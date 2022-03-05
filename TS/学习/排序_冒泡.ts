/*
 * @Author: huangyingli
 * @Date: 2022-03-05 12:32:14
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-05 12:37:26
 * @Description:
 */

function bubbleSort(arr: Array<any>): Array<any> {
  let i: number, j: number, temp: number;
  for (i = 0; i < arr.length; i++) {
    for (j = arr.length - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
  }
  return arr;
}

let arr = [9, 7, 8, 3, 6, 1, 0, 2, 5];

console.log(bubbleSort(arr));
