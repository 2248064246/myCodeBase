/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 21:42:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 22:20:31
 * @Description:
 */

/**
 * 求数组最小值(防止数组过大的越界)
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 * @param {Array} arr
 * @returns {Number}
 */
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

/**
 * 求数组最大值
 * @param {Array} arr
 * @returns {Number}
 */
function maxOfArray(arr) {
  var max = -Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.max.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    max = Math.max(submin, max);
  }

  return max;
}

/**
 * 将传入的类数组值转为数组
 * @returns {Array}
 */
function toArray(arg) {
  let unboundSlice = Array.prototype.slice;
  let slice = Function.prototype.call.bind(unboundSlice);
  return slice(arg);
}
