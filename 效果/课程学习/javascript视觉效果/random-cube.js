/*
 * @Author: huangyingli
 * @Date: 2022-07-26 22:45:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-26 22:57:48
 * @Description:
 */

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [760, 800],
};

/**
 * 绘制图像
 * @param {HTMLCanvasElement} canvas
 */
function draw({ context, width, height }) {
  context.fillStyle = 'black';
  context.lineWidth = 0.01 * width;

  // context.lineWidth = width * 0.005

  const row = 5;
  const col = 5;

  const w = width * 0.1;
  const h = height * 0.1;
  const gap = width * 0.03;

  const bX = width * 0.165;
  const bY = height * 0.165;

  const off = width * 0.02;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let x = i * (w + gap) + bX;
      let y = j * (h + gap) + bY;
      context.save();
      context.beginPath();
      context.rect(x, y, w, h);
      context.closePath();
      context.stroke();
      context.restore();
      if (Math.random() > 0.5) {
        context.save();
        context.beginPath();
        context.rect(x + off / 2, y + off / 2, w - off, h - off);
        context.closePath();
        context.stroke();
        context.restore();
        // context.fill();
      }
    }
  }
}

const sketch = () => {
  /**
   * @params {HTMLCanvasElement} canvas
   */
  return draw;
};
canvasSketch(sketch, settings);
