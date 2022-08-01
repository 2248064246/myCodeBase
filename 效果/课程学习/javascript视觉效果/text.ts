import { type } from 'os';

/*
 * @Author: huangyingli
 * @Date: 2022-08-01 20:44:08
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-01 23:52:48
 * @Description:
 */
const canvasSketch = require('canvas-sketch');
type MCanvas = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
};
const width = 1000;
const height = 1000;

const settings = {
  dimensions: [width, height],
};

let text = 'A';
let fontSize = 1000;
// let fontFamily = 'Book Antiqua';
let fontFamily = 'Algerian';

let typeCanvas = document.createElement('canvas');
let typeContext = typeCanvas.getContext('2d') as CanvasRenderingContext2D;

const sketch = () => {
  return (canvas: MCanvas) => {
    let { context, width, height } = canvas;

    /* 方块大小 */
    let cell = 10;
    /* 列 */
    let cols = Math.floor(width / cell);
    /* 行 */
    let rows = Math.floor(height / cell);

    let numberCell = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;

    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.fillStyle = 'white';
    fontSize = cols;
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';

    const metrics = typeContext.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (cols - mw) / 2 - mx;
    const y = (rows - mh) / 2 - my;

    typeContext.save();
    typeContext.translate(x, y);
    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);

    typeContext.restore();

    let typeData = typeContext.getImageData(0, 0, cols, rows).data;

    // context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < numberCell; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.font = `${
        (Math.random() < 0.1 ? cell * range(2, 4) : cell) * 2
      }px ${fontFamily}`;
      context.save();
      // context.beginPath();
      context.translate(x, y);
      // context.fillRect(0, 0, cell, cell);
      context.fillText(getGlyph(r), 0, 0);
      context.restore();
    }
  };
};
let manager: any;

const start = async () => {
  manager = await canvasSketch(sketch, settings);
};

const range = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

function getGlyph(v: any) {
  if (v < 50) return '';
  if (v < 100) return '.';
  if (v < 150) return '-';
  if (v < 200) return '+';

  const glyphs = '_/ ='.split('');
  return glyphs[range(0, glyphs.length)];
}

start();

document.addEventListener('keydown', (event) => {
  text = event.key.toUpperCase();
  manager.render();
  event.stopPropagation();
  event.preventDefault();
  event.cancelBubble = false;
});

export {};
