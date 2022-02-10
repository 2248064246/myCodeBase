/*
 * @Author: huangyingli
 * @Date: 2022-02-10 10:03:10
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-10 10:40:52
 * @Description:
 */

/* 高阶函数的一个典型特点是, 可以通过给某个聚合函数传入不同执行函数和实现不同操作 */

/**
 * 求和函数
 * @param  {...Number} args
 * @returns {Number}
 */
function sum(...args) {
  return args.reduce((x, y) => x + y);
}

/**
 * 求平方
 * @param {Number} num
 * @returns {Number}
 */
function square(num) {
  return num * num;
}

/**
 * 组合两个函数, 返回一个聚合函数, 注意函数是单个值或者是数组
 * @param {Function} f
 * @param {Function} g
 * @returns {Function}
 */
function compose(f, g) {
  return function (...args) {
    if (typeof g === 'function') {
      let fn = g.apply(this, args);
      if (Array.isArray()) {
        return f.apply(this, fn);
      } else {
        return f.call(this, fn);
      }
    } else {
      return f.apply(this, ...args);
    }
  };
}

/**
 * 聚合多个函数
 * @param  {...Function} args 需要聚合的函数
 * @returns
 */
function composeAll(...args) {
  return args.reverse().reduce((g, f) => compose(f, g));
}

let fn = compose(square, sum);
console.log(fn(1, 2, 3, 4));

let fns = composeAll(
  Math.log10,
  square,
  (args) => {
    return Math.max(...args);
  },
  (...args) => {
    return args.sort();
  }
);

console.log(fns(1, 2, 3));
