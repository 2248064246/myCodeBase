/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-25 11:32:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-25 14:41:28
 * @Description:
 */

let toString = Object.prototype.toString;

function isArray(val) {
  return Array.isArray(val);
}

function isFunction() {
  return toString.call(val) === '[object Function]';
}

/**
 * 判断是否是Number, 且不能是 NaN
 * @param {Number} val 输入值
 * @returns {Boolean}
 */
function isNumber(val) {
  return typeof val === 'number' && val === val;
}

function isString(val) {
  return typeof val === 'string';
}

function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

function isUndefined() {
  return typeof val === 'undefined';
}

function isNull() {}

function isBuffer() {}

function isArrayBuffer() {

}

function isArrayBufferView() {}

function isFormData() {}

function isFile() {}

function isDate() {}

function isBold() {}

function isSteam() {}

function isStandardBrowserEnv() {}
