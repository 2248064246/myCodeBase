/*
 * @Author: huangyingli
 * @Date: 2022-06-13 17:02:23
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-06-13 17:13:30
 * @Description:
 */

function a() {
  try {
    return 'a';
  } catch (e) {}
  return 'b';
}

console.log(a());

let a1 = [1, 2, 3, 4, 5];

for (let v of a1) {
  if (v == 2) {
    continue;
  }
  console.log(v);
}
