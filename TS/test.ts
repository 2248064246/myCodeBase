/*
 * @Author: huangyingli
 * @Date: 2022-05-16 10:07:13
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-16 10:41:47
 * @Description:
 */
interface SearchFunc {
  (source: string, substring: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, substring: string): boolean {
  return source.search(substring) !== -1;
};

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

console.log(swap([3, '5']));

interface Lengthwise {
  length: number;
}

function logging<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

/* 输入的参数必须拥有 length 属性 */
console.log(logging([1, 2]));
