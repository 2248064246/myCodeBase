/*
 * @Author: huangyingli
 * @Date: 2022-01-26 22:27:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-26 22:59:42
 * @Description:
 */
'use strict';

/*\
|*|
|*|  Base64 / binary data / UTF-8 strings utilities (#3)
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
|*|
|*|  Author: madmurphy
|*|
\*/

function base64Encode(sString) {
  var aUTF16CodeUnits = new Uint16Array(sString.length);
  Array.prototype.forEach.call(aUTF16CodeUnits, function (el, idx, arr) {
    arr[idx] = sString.charCodeAt(idx);
  });
  return window.btoa(
    String.fromCharCode.apply(null, new Uint8Array(aUTF16CodeUnits.buffer))
  );
}

function base64Decode(sBase64) {
  var sBinaryString = atob(sBase64),
    aBinaryView = new Uint8Array(sBinaryString.length);
  Array.prototype.forEach.call(aBinaryView, function (el, idx, arr) {
    arr[idx] = sBinaryString.charCodeAt(idx);
  });
  return String.fromCharCode.apply(null, new Uint16Array(aBinaryView.buffer));
}

console.log(
  '第3种方法: ',
  base64Encode('hello world'),
  base64Decode(base64Encode('hello world'))
);

console.log(
  '第3种方法: ',
  base64Encode('☸☹☺☻☼☾☿'),
  base64Decode(base64Encode('☸☹☺☻☼☾☿'))
);

console.log(
  '第3种方法: ',
  base64Encode('❤️😂😆👌'),
  base64Decode(base64Encode('❤️😂😆👌'))
);
console.log(
  '第3种方法: ',
  base64Encode('Base 64 \u2014 Mozilla Developer Network'),
  base64Decode(base64Encode('Base 64 \u2014 Mozilla Developer Network'))
);
