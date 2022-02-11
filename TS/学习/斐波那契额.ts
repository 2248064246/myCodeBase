/*
 * @Author: huangyingli
 * @Date: 2022-02-11 15:45:18
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-11 15:52:06
 * @Description:
 */

/**
 * F(0) = F(1) = 1
 * F(n) = F(n-1) + F(n-2) n>=2
 * @param n
 */
function Fibonacci(n: number): number {
  if (n === 0 || n === 1) return 1;
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}


console.log(Fibonacci(4))