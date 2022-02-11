/*
 * @Author: huangyingli
 * @Date: 2022-02-11 15:21:08
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-11 15:37:26
 * @Description:
 */

/**
 * !n = n * !(n-1)
 * @param n
 * @returns
 */
function Iterate(n: number): number {
  if (n === 1 || n === 0) return 1;
  return n * Iterate(n - 1);
}

/* 尾调用优化 */
function TailedIterate(n: number, t: number = 1): number {
  if (n === 1 || n === 0) return t;
  return TailedIterate(n - 1, n * t);
}

// console.log(TailedIterate(1000))
