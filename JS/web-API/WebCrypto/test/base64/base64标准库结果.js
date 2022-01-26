/*
 * @Author: huangyingli
 * @Date: 2022-01-26 22:41:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-26 22:56:29
 * @Description:
 */

console.log(
  'base64标准库: ',
  Base64.encode('☸☹☺☻☼☾☿'),
  Base64.decode(Base64.encode('☸☹☺☻☼☾☿'))
);

console.log(
  'base64标准库: ',
  Base64.encode('❤️😂😆👌'),
  Base64.decode(Base64.encode('❤️😂😆👌'))
);
console.log(
  'base64标准库: ',
  Base64.encode('Base 64 \u2014 Mozilla Developer Network'),
  Base64.decode(Base64.encode('Base 64 \u2014 Mozilla Developer Network'))
);

console.log(
  'CryptoJS标准库: ',
  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse('❤️😂😆👌'))
);
