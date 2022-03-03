/*
 * @Author: huangyingli
 * @Date: 2022-03-03 16:57:12
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-03 17:32:55
 * @Description:
 */

/**
 * 使用割圆术求圆周率
 * @param n
 * @returns
 */
function computePI(n: number): any {
  if (n % 2 !== 0) {
    return new Error('请输入偶数边');
  }
  if (n < 6) {
    return new Error('边数不能小于6');
  }
  if (n == 6) {
    return (6 * Math.sqrt(3)) / 4;
  }
  n = n / 2;
  let deg = (2 * Math.PI) / n;
  let x = Math.sin(deg / 2) * 2;
  return computePI(n) + (n / 2) * x * (1 - Math.sqrt(1 - (x / 2) * (x / 2)));
}

console.log(computePI(192 * 2 * 2 * 2 * 2 * 2 * 2 * 2));
