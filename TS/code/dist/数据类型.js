/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-12 18:20:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-12 23:52:47
 * @Description:
 */
// Boolean
var bool = true;
// Number
var num = 123;
// String
var str = '我的世界';
// Array
var numAry = [1, 2, 3];
var numAry2 = [1, 2, 3];
// 元组
var ary = [1, '2'];
// 枚举
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLUE"] = 2] = "BLUE";
    Color[Color["black"] = 100] = "black";
})(Color || (Color = {}));
var c = Color.RED; // c => 0
var cStr = Color[2]; // => BLUE
// any
var anyValue = 'xxx';
anyValue = false;
var anyAry = [1, '2', false];
// void
function log(str) {
    console.log(str); // 不能有 return
}
// 联合类型
var str_num = 1;
str_num = '2';
function getLen(str) {
    return String(str).length;
}
// 类型推断
var str1;
str1 = 'xx';
str1 = 123;
// null 和 undefined
var other = '1';
other = null;
other = undefined;
