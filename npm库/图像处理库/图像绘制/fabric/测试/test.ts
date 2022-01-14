/*
 * @Author: huangyingli
 * @Date: 2022-01-14 10:10:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 15:59:09
 * @Description:
 */

// 这里修改了 fabric.js 中的 amd 导出

// 由于这里使用的amd规范导出, 所以在dist下面必须要有一个 fabric 文件
import { fabric } from 'fabric';
console.log(fabric);
var canvas = new fabric.Canvas('canvas');
var rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 60,
  height: 70,
  fill: 'red',
});

canvas.add(rect);
