/*
 * @Author: huangyingli
 * @Date: 2022-02-08 19:35:19
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-08 21:12:47
 * @Description:
 */

/**
 * @file 这个示意注释规范的示例文件
 * @author 这个文件的作者 <xxx@qq.com>
 * @copyright GGbone 2022 这是当前文件的版权信息
 * @license MIT 文件的许可证信息
 * @version 1.2.2 可以用来描述当前文件的版本, 或者函数版本
 */

/**
 * @function 第一行是函数描述
 * @summary 一个简短描述
 * @param {Number} num 普通数值
 * @param {Object} obj 一个对象参数
 * @param {String} obj.name 对象的每一个参数信息
 * @param {String} obj.id
 * 可以指明数组内容的类型, [] 表示不是必须项, 此时可以说明参数的默认值是什么,
 * @param {Array<Number>} [obj.friends=[]] 这是一个Number数组
 * @param {TheCallback} cb 这是一个回调函数
 * @see http://xxx.com
 * @returns {String} 返回值
 */
function fnc(num, obj, cb) {}

// fnc(1, { name }, function());

/**
 * 函数回调
 * @callback TheCallback
 * @param {String} a 参数a
 * @param {String} b
 */
function callback(a, b) {}

/**
 * 这是一个新对象
 * @type {Object}
 */
let newObj = {};

/**
 * 常量
 * @constant {Number}
 * */
const FOO = 1;

/**
 * 人类构造器
 * @class
 */
class People {}
