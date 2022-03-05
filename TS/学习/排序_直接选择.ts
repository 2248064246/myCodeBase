/*
 * @Author: huangyingli
 * @Date: 2022-03-05 12:47:46
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-05 12:54:59
 * @Description:
 */
function selectSort(arr: Array<any>): Array<any> {
  let i: number, j: number, temp: number, min: number, minIdx: number;

  for (i = 0; i < arr.length; i++) {
    min = arr[i];
    minIdx = i;
    for (j = i + 1; j < arr.length; j++) {
      if (min > arr[j]) {
        min = arr[j];
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      temp = arr[i];
      arr[i] = min;
      arr[minIdx] = temp;
    }
  }
  return arr;
}
let arr2 = [9, 7, 8, 3, 6, 1, 0, 2, 5];

console.log(selectSort(arr2));
