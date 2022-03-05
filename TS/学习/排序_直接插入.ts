/*
 * @Author: huangyingli
 * @Date: 2022-03-05 12:38:43
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-05 12:46:27
 * @Description:
 */

function insertionSort(arr: Array<any>): Array<any> {
  let i: number, j: number, temp: number;
  for (i = 0; i < arr.length; i++) {
    for (j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

let arr1 = [9, 7, 8, 3, 6, 1, 0, 2, 5];

console.log(insertionSort(arr1));
