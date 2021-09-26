/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-12 18:20:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-27 18:25:17
 * @Description:
 */
// Boolean
let bool = true;
// Number
let num = 123;
// String
let str = '我的世界';
// Array
let numAry = [1, 2, 3];
let numAry2 = [1, 2, 3];
// 元组
let ary = [1, '2'];
// 枚举
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLUE"] = 2] = "BLUE";
    Color[Color["black"] = 100] = "black";
})(Color || (Color = {}));
let c = Color.RED; // c => 0
let cStr = Color[2]; // => BLUE
// any
let anyValue = 'xxx';
anyValue = false;
let anyAry = [1, '2', false];
// void
function log(str) {
    console.log(str); // 不能有 return
}
// 联合类型
let str_num = 1;
str_num = '2';
function getLen(str) {
    return String(str).length;
}
// 类型推断
let str1;
str1 = 'xx';
str1 = 123;
// null 和 undefined
let other = '1';
other = null;
other = undefined;
function errors(msg) {
    throw new Error(msg);
}
