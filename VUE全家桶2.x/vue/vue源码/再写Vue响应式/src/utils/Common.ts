/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:54:42
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 16:08:30
 * @Description:
 */

function getType(v: any): string {
  let type = Object.prototype.toString.call(v) as string;
  return type.replace(/\[|\]/g, '').split(' ')[1];
}

export function isObject(v: any) {
  let t = getType(v);

  return t === 'Object';
}
