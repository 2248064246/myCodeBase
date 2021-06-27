/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-12 18:20:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 18:25:17
 * @Description:
 */

// Boolean
let bool: boolean = true;

// Number
let num: number = 123;

// String
let str: string = '我的世界';

// Array
let numAry: number[] = [1, 2, 3];

let numAry2: Array<number> = [1, 2, 3];

// 元组
let ary: [number, string] = [1, '2'];

// 枚举
enum Color {
  RED,
  GREEN,
  BLUE,
  black = 100,
}
let c: Color = Color.RED; // c => 0

let cStr: String = Color[2]; // => BLUE

// any
let anyValue: any = 'xxx';
anyValue = false;
let anyAry: any[] = [1, '2', false];

// void
function log(str: string): void {
  console.log(str); // 不能有 return
}

// 联合类型
let str_num: string | number = 1;
str_num = '2';
function getLen(str: string | number): Number {
  return String(str).length;
}

// 类型推断
let str1;
str1 = 'xx';
str1 = 123;

// null 和 undefined
let other: string = '1'
other = null
other = undefined


function errors(msg: string):never {
  throw new Error(msg)
}
