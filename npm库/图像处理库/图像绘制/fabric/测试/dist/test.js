/*
 * @Author: huangyingli
 * @Date: 2022-01-14 10:10:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 15:59:09
 * @Description:
 */
define(["require", "exports", "fabric"], function (require, exports, fabric_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log(fabric_1.fabric);
    var canvas = new fabric_1.fabric.Canvas('canvas');
    var rect = new fabric_1.fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 70,
        fill: 'red',
    });
    canvas.add(rect);
});
