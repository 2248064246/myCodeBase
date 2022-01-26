/*
 * @Author: huangyingli
 * @Date: 2022-01-26 22:37:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-26 23:00:01
 * @Description:
 */

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return window.btoa(
    encodeURIComponent(str).replace(
      /%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }
    )
  );
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    window
      .atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

console.log(
  '第4种方法: ',
  b64EncodeUnicode('hello world'),
  b64DecodeUnicode(b64EncodeUnicode('hello world'))
);

console.log(
  '第4种方法: ',
  b64EncodeUnicode('☸☹☺☻☼☾☿'),
  b64DecodeUnicode(b64EncodeUnicode('☸☹☺☻☼☾☿'))
);

console.log(
  '第4种方法: ',
  b64EncodeUnicode('❤️😂😆👌'),
  b64DecodeUnicode(b64EncodeUnicode('❤️😂😆👌'))
);

console.log(
  '第4种方法: ',
  b64EncodeUnicode('Base 64 \u2014 Mozilla Developer Network'),
  b64DecodeUnicode(b64EncodeUnicode('Base 64 \u2014 Mozilla Developer Network'))
);
