import { cwd } from 'process';

/*
 * @Author: huangyingli
 * @Date: 2022-07-27 22:19:42
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-27 23:45:06
 * @Description:
 */
const canvasSketch = require('canvas-sketch');

type MCanvas = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
};

const settings = {
  dimensions: [760, 800],
};

const sketch = () => {
  return draw;
};

/* 角度转弧度 */
function angleToRadian(angle: number) {
  return (angle / 180) * Math.PI;
}

function draw(canvas: MCanvas) {
  const { context, width, height } = canvas;
  /* center point */
  const cx = width / 2;
  const cy = height / 2;

  const w = width * 0.01;
  const h = width * 0.1;
  const r = width * 0.2;

  const amount = 12;

  context.fillStyle = 'black';
  context.translate(cx, cy);
  context.beginPath();
  context.arc(0, 0, 3, 0, Math.PI * 2);
  context.fill();
  context.closePath();

  for (let i = 0; i < amount; i++) {
    let radian = angleToRadian((360 / amount) * i);

    let x = r * Math.sin(radian);
    let y = r * Math.cos(radian);
    context.save();
    context.translate(x, y);
    context.rotate(-radian);
    context.beginPath();
    context.rect(-w / 2, -h / 2, w, h);
    context.fill();

    context.restore();
  }
}

canvasSketch(sketch, settings);
