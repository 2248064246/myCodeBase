/*
 * @Author: huangyingli
 * @Date: 2022-03-02 17:38:22
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-03-20 13:18:01
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

/**
 * 最小公倍数 == a * b / 最大公约数
 */

console.log(divisor(8251, 6105));
console.log(divisor(125, 73));