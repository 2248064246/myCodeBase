/*
 * @Author: huangyingli
 * @Date: 2022-07-26 21:20:32
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-26 22:52:34
 * @Description:
 */

let canvas = document.querySelector('canvas');

/**
 * 绘制图像
 * @param {HTMLCanvasElement} canvas
 */
function sketch(canvas) {
  let context = canvas.context;
  context.fillStyle = 'black';

  const width = canvas.width;
  let height = canvas.height;

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

sketch(canvas);
