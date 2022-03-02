/*
 * @Author: huangyingli
 * @Date: 2022-03-02 17:38:22
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-02 18:03:28
 * @Description:
 */

/**
 * 求两个正数的最大公约数
 * 辗转相除法
 * @param m
 * @param n
 * @returns
 */
function divisor(m: number, n: number): number {
  let r: number;
  do {
    r = m % n;
    m = n;
    n = r;
  } while (r !== 0);

  return m;
}

console.log(divisor(8251, 6105));
console.log(divisor(125, 73));