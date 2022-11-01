/*
 * @Author: huangyingli
 * @Date: 2022-11-01 19:22:19
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-11-01 19:22:36
 * @Description: 
 */

let a = {0: 0, 1: 1, 3: 3, length: 3}

// 需要注意 idx 和 length 相关, 超出 length 不会获取
Array.prototype.at.call(a, 2) // => undefined
Array.prototype.at.call(a, 3) // => undefined

// 如果增加 length
a.length = 4;
// 现在能够获取到对应数据
Array.prototype.at.call(a, 3) // => 3