/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-25 14:04:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 14:22:33
 * @Description:
 */

function trim() {}

/**
 * 如果是数组, 则fn参数和数组forEach一致
 * 如果是对象, 则fn参数是value, key, obj
 * @param {Object|Array} obj
 * @param {Function} fn
 */
function forEach(obj, fn) {
  if (obj === null || typeof obj === 'undefined') {
    return;
  }
  // 如果不是对象, 则使用数组包装
  if (typeof obj !== 'object') {
    obj = [obj];
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 功能类似 Object.assign
 * @returns {Object} 合并后的对象
 */
function merge() {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * 将 b 对象扩展到 a 对象上
 * 如果属性值是函数, 可以指定需要绑定的this
 * @param {Object} thisArg 扩展是需要绑定的this
 * @returns 
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

function getfilesize(size) {
  if (!size) return '0K';

  var num = 1024.0; //byte

  if (size < num) return size + 'B';
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'K'; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + 'M'; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
  return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
}
