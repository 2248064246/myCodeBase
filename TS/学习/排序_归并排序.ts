/*
 * @Author: huangyingli
 * @Date: 2022-03-05 13:27:05
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-05 14:58:33
 * @Description:
 */

function mergerSort(arr: Array<any>): Array<any> {
  if (arr.length <= 1) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);

  return sort(mergerSort(left), mergerSort(right));
}

function sort(left: Array<any>, right: Array<any>): Array<any> {
  let result: Array<any> = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  result = result.concat(left, right);
  return result;
}
let arr4 = [5, 9, 7, 8, 3, 6, 1, 0, 2, 4];

console.log(mergerSort(arr4));
