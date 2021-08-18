/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-18 14:21:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-18 16:26:37
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
  function tailRecurveFactorial(x, t = 1) {
    if (x === 1 || x === 0) {
      return t
    }
    return tailRecurveFactorial(x - 1, x * t)
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