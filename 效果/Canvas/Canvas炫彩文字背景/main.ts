/*
 * @Author: huangyingli
 * @Date: 2023-01-13 15:00:27
 * @LastEditors: huangyingli
 * @LastEditTime: 2023-01-13 17:33:06
 * @Description:
 */

interface CanvasIns {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

/**
 *
 * @param {Number} width
 * @param {Number} height
 * @returns {CanvasIns}
 */
function createCanvas(width: number, height: number): CanvasIns {
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  let context = canvas.getContext('2d');
  return {
    canvas,
    context,
  } as CanvasIns;
}

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {String} text
 */
function writeText(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  text: string
) {
  let size = 160;
  context.font = `${size}px serif`;
  context.fillStyle = '#000';
  context.textAlign = 'center';
  context.fillText(text, canvas.width / 2, canvas.height / 2);
}

function maskCanvas(c3: CanvasIns, c2: CanvasIns, c1: CanvasIns) {
  c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
  /* 实现此效果最终要的属性 -- 新形状只在与现有画布内容重叠的地方绘制。*/
  c3.context.globalCompositeOperation = 'source-atop';
  c3.context.drawImage(c1.canvas, 0, 0);
}

function clear(c: CanvasIns) {
  const canvas = c.context;
  canvas.globalAlpha = 0.05;
  canvas.fillStyle = '#000';
  canvas.fillRect(0, 0, c.canvas.width, c.canvas.height);
  canvas.globalAlpha = 1;
}

function update() {
  /**
   * 会产生一个拖尾的效果
   * 实现原理通过一个低透明度的正方形不断画到画布上覆盖原来的画布, 最终之前的画布透明度会越来越低, 从而达到一种拖尾效果
   */
  clear(c1);
  /* 粒子移动 */
  particles.forEach((p) => p.move());
  maskCanvas(c3, c2, c1);
  requestAnimationFrame(update);
}

class Particle {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  a: number;
  radius: number;
  color: string;
  constructor(c: CanvasIns, x: number, y: number) {
    this.context = c.context;
    this.x = x;
    this.y = y;
    this.w = W;
    this.h = H;
    this.radius = 0.5 + Math.random() * 20;
    this.s = 3 + Math.random();
    this.a = 0;
    this.color = this.radius > 5 ? '#1164cc' : '#0053dd';
  }

  render() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.lineWidth = 2;
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  move() {
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;
    this.a += Math.random() * 0.8 - 0.4;

    if (this.x < 0 || this.x > this.w - this.radius) {
      this.x = W / 2;
    }

    if (this.y < 0 || this.y > this.h - this.radius) {
      this.y = H / 2;
    }
    this.render();
    return true;
  }
}

const W = document.body.clientWidth;
const H = document.body.clientHeight;

let c1 = createCanvas(W, H);
let c2 = createCanvas(W, H);
let c3 = createCanvas(W, H);

let particles: Array<Particle> = [];
let particlesNum = 400;

for (let i = 0; i < particlesNum; i++) {
  particles.push(new Particle(c1, c1.canvas.width / 2, c1.canvas.height / 2));
}

writeText(c2.canvas, c2.context, '洛水赋神');
document.body.appendChild(c3.canvas);

update();

export {};
