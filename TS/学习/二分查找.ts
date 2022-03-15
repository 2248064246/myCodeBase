/*
 * @Author: huangyingli
 * @Date: 2022-03-15 22:51:35
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-15 23:45:42
 * @Description: 
 */
function search(nums: Array<number>, target: number): number {
  // write code here
  let mid,
    index = -1;
  if (nums.length === 0) return index;
  let start = 0;
  let end = nums.length;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (nums[mid] > target) {
      end = mid - 1;
    } else if (nums[mid] < target) {
      start = mid + 1;
    } else {
      index = mid;
      break;
    }
  }
  return index;
}

console.log(search([1, 2, 3, 4], 2));
