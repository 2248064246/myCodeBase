/*
 * @Author: huangyingli
 * @Date: 2022-01-14 11:11:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 16:09:26
 * @Description:
 */

// 这里同时需要 uri.all.d.ts 文件, 不然这里会有错误提示, 而且不会有代码提示功能
// 源码中没有默认的导出, 通过 * 获取所有导出并命名为 uri
import * as uri from '../uri.all.js';

import { parse } from '../uri.all.js';

console.log(uri);
console.log(parse);
// console.log(mime.lookup('json'));

console.log(uri.parse('http://www.baidu.com'));
