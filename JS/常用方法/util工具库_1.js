/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-25 11:32:26
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-10-27 14:58:16
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

/**
 * 判断一个对象是否为简单对象
 * 即纯粹的对象（通过 "{}" 或者 "new Object" 创建的）
 */
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

function isUndefined(val) {
  return typeof val === 'undefined';
}

function isNull(val) {
  return val === null;
}

function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    typeof val.constructor.isBuffer === 'function' &&
    val.constructor.isBuffer(val)
  );
}

/**
 * 判断是否是 ArrayBuffer
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * 判断是否是 DataView
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;

  // return toString.call(val) === '[object DataView]';
}

function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function isFile(val) {
  return toString.call(val) === '[object File]';
}

function isDate(val) {
  return toString.call(val) === '[object Date]';
}

function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * 判断是否是一个流
 * 对于前端而言, 流的对象是 ReadableStream
 */
function isSteam(val) {
  return toString.call(val) === '[object ReadableStream]';
}

/**
 * 判断是否是一个 查询参数对象
 */
function isURLSearchParams(val) {
  return (
    typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
  );
}

/**
 * 判断是否是标准浏览器环境
 * 包括 web worker, react-native, nativescript
 *
 */
function isStandardBrowserEnv() {
  if (
    typeof navigator !== 'undefined' &&
    (navigator.product === 'ReactNative' ||
      navigator.product === 'NativeScript' ||
      navigator.product === 'NS')
  ) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
