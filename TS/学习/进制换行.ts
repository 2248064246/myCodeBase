/*
 * @Author: huangyingli
 * @Date: 2022-02-13 14:20:12
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-13 15:12:22
 * @Description:
 */

function decToAny(n: number, base: number) {
  if (base > 36 || base < 2) throw Error('必须是2~36进制之间');

  let stack = [],
    compatable = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let remain = n;

  while (remain > 0) {
    stack.push(remain % base);
    remain = Math.floor(remain / base);
  }

  let str = '';
  while (stack.length > 0) {
    str += compatable[stack.pop() as number];
  }

  return str;
}

console.log(decToAny(10, 16));

