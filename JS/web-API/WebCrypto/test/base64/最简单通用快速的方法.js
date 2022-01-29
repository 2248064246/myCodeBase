/*
 * @Author: huangyingli
 * @Date: 2022-01-27 19:29:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-27 19:38:44
 * @Description:
 */

function strToUTF8Arr(str, encodeType = 'utf-8') {
  return new TextEncoder(encodeType).encode(str);
}

function bufferToStr(buffer, decodeType = 'utf-8') {
  return new TextDecoder(decodeType).decode(buffer);
}

function base64Encode(str) {
  let unit8Ary = strToUTF8Arr(str);
  return window.btoa(String.fromCharCode.apply(null, unit8Ary));
}

function base64Decode(base64) {
  let str = window.atob(base64);
  let unit8Ary = new Uint8Array(str.length);
  Array.prototype.forEach.call(unit8Ary, function (el, idx, arr) {
    arr[idx] = str.charCodeAt(idx);
  });
  return bufferToStr(unit8Ary.buffer);
}

console.log(
  '简易方法: ',
  base64Encode('hello world'),
  base64Decode(base64Encode('hello world'))
);

console.log(
  '简易方法: ',
  base64Encode('☸☹☺☻☼☾☿'),
  base64Decode(base64Encode('☸☹☺☻☼☾☿'))
);

console.log(
  '简易方法: ',
  base64Encode('❤️😂😆👌'),
  base64Decode(base64Encode('❤️😂😆👌'))
);
console.log(
  '简易方法: ',
  base64Encode('Base 64 \u2014 Mozilla Developer Network'),
  base64Decode(base64Encode('Base 64 \u2014 Mozilla Developer Network'))
);
