/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-18 14:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-20 17:36:56
 * @Description: 
 */

{

  // 阶乘 0!=1，n!=(n-1)!×n
  // 一个正整数的阶乘（factorial）是所有小于及等于该数的正整数的积，并且0的阶乘为1

  // 1. 使用迭代计算阶乘

  function iterateFactorial(x) {
    let n = 1;
    for (let i = 1; i <= x; i++) {
      n *= i
    }
    return n
  }


  // 2. 递归阶乘
  function recurveFactorial(x) {
    if (x === 1 || x === 0) {
      return 1
    }
    return x * recurveFactorial(x - 1)
  }

  // 3. 递归阶乘--尾递归优化 (然而大部分浏览器并没有实现这种优化)
  function tailRecurveFactorial(x, t = 1n) {
    if (x === 1n || x === 0n) {
      return t
    }
    return tailRecurveFactorial(x - 1n, x * t)
  }

  // 上面这种写法可能会让让迷惑, 为什么计算阶乘还要传入 1
  // 可以用其他方法该写下

  // 1. 在使用一个函数进行封装
  function factorial(n) {
    return tailRecurveFactorial(n, 1)
  }

  // 2. 使用科里化函数
  function corey(fn, t) {
    return function (n) {
      return fn.call(null, n, t)
    }
  }

  let coreyFactorial = corey(tailRecurveFactorial, 1)
  // console.log(coreyFactorial(5))
}

{
  // 斐波那契数列
  // 位置为0的数是0, 1和2是1, n>2是 (n-1) + (n-2)

  // 求第n个斐波那契数
  function iterateFibonacci(n) {
    if (n < 1) return 0
    if (n <= 2) return 1
    let fib1 = 0,
      fib2 = 1,
      fibN = 0
    for (let i = 2; i <= n; i++) {
      fibN = fib2 + fib1 // f(n-1) + f(n-2)
      fib1 = fib2
      fib2 = fibN
    }
    return fibN
  }

  // 递归在数据比较大的时候, 速度会非常慢, 但是递归在某些时候处理问题会比较简单
  function recurveFibonacci(n) {
    if (n < 1) return 0
    if (n <= 2) return 1
    return recurveFibonacci(n - 1) + recurveFibonacci(n - 2)
  }
}

{
  // 汉诺塔问题
  /**
   * 相传在古印度圣庙中，有一种被称为汉诺塔(Hanoi)的游戏。
   * 该游戏是在一块铜板装置上，有三根杆(编号A、B、C)，在A杆自下而上、由大到小按顺序放置64个金盘(如图1)。
   * 游戏的目标：把A杆上的金盘全部移到C杆上，并仍保持原有顺序叠好。
   * 操作规则：
   *    每次只能移动一个盘子，并且在移动过程中三根杆上都始终保持大盘在下，小盘在上，
   *    操作过程中盘子可以置于A、B、C任一杆上。
   */

  /**
   * 汉诺塔问题
   * @param {Number} n 要移动的盘子个数
   * @param {Array} a a柱子
   * @param {Array} b b柱子
   * @param {Array} c c柱子
   * @returns 
   */

  function hanoiTower(n, a = [], b = [], c = []) {
    if (n == 1) {
      // 如果a柱子只有一个盘子, 则直接移动到c盘
      move(a, c)
      return
    }
    // 如果a柱子有多个盘子, 先将其余盘子移动到b柱子
    hanoiTower(n - 1, a, c, b)
    // 然后将a柱子最后一个自动到c柱子
    move(a, c)
    // 最后将b柱子的所有盘子移动到c
    hanoiTower(n - 1, b, a, c)
  }

  let count = 0

  function move(start, end) {
    // 计算move调用次数就能得到移动次数
    count++
    end.push(start.pop())
  }

  let a = [],
    b = [],
    c = [];
  a = [9, 8, 7, 6, 5, 4, 3, 2, 1]

  hanoiTower(a.length, a, b, c)
  console.log('count', count)
  console.log(a, b, c)
}