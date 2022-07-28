(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     * @Author: huangyingli
     * @Date: 2022-07-27 22:19:42
     * @LastEditors: huangyingli
     * @LastEditTime: 2022-07-28 14:58:19
     * @Description:
     */
    const canvasSketch = require('canvas-sketch');
    const settings = {
        dimensions: [800, 800],
    };
    const sketch = () => {
        return draw;
    };
    /* 角度转弧度 */
    function angleToRadian(angle) {
        return (angle / 180) * Math.PI;
    }
    function range(start, end) {
        return Math.random() * (end - start) + start;
    }
    /**
     * 整体思路就是在圆上画长条
     * 让后随机宽高
     * 再给每个对应长条对应 圆弧
     * 随机半径, 弧长
     * 效果很奶思
     */
    function draw(canvas) {
        const { context, width, height } = canvas;
        /* center point */
        const cx = width / 2;
        const cy = height / 2;
        const w = width * 0.01;
        const h = width * 0.1;
        const r = width * 0.2;
        const amount = 40;
        context.fillStyle = 'black';
        context.translate(cx, cy);
        for (let i = 0; i < amount; i++) {
            let slice = angleToRadian(360 / amount);
            let radian = slice * i;
            let x = r * Math.sin(radian);
            let y = r * Math.cos(radian);
            context.save();
            context.translate(x, y);
            context.rotate(-radian);
            context.beginPath();
            context.scale(range(0.1, 2), range(0.2, 0.5));
            context.rect(-w / 2, -h / 2, w, h);
            context.fill();
            context.restore();
            context.save();
            context.beginPath();
            context.lineWidth = range(5, 15);
            context.rotate(-radian);
            context.arc(0, 0, r * range(0.7, 1.7), slice * range(-8, 0), slice * range(0, 5));
            context.stroke();
            context.restore();
        }
    }
    canvasSketch(sketch, settings);
});
