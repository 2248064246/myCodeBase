/*
 * @Author: huangyingli
 * @Date: 2022-08-01 10:25:57
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-01 14:32:34
 * @Description:
 */

const canvasSketch = require('canvas-sketch');

const random = require('canvas-sketch-util/random');

import { floor } from 'lodash';
import { Pane } from 'tweakpane';

type MCanvas = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  frame: number;
};

const width = 1000;
const height = 1000;

const settings = {
  dimensions: [width, height],
  animation: true,
};

const PARAMS = {
  Row: 20,
  Col: 20,
  Scale: 30,
  // noise 频率
  freq: 0.001,
  // 振幅
  amp: 0.2,
  animation: true,
  frame: 0,
};

/* 创建交互式UI */
const createPane = () => {
  const pane = new Pane();
  let folder = pane.addFolder({ title: 'Grid' });
  pane.addInput(PARAMS, 'Row', {
    min: 1,
    max: 100,
    step: 1,
  });
  pane.addInput(PARAMS, 'Col', {
    min: 1,
    max: 100,
    step: 1,
  });
  pane.addInput(PARAMS, 'Scale', {
    min: 1,
    max: 100,
  });

  folder = pane.addFolder({ title: 'Noise' });

  folder.addInput(PARAMS, 'freq', {
    min: -0.01,
    max: 0.01,
  });

  folder.addInput(PARAMS, 'amp', {
    min: 0,
    max: 1,
  });

  folder.addInput(PARAMS, 'animation')
  folder.addInput(PARAMS, 'frame', {
    min: 0,
    step: 10,
    max: 1000
  })
};

const sketch = () => {
  return (canvas: MCanvas) => {
    /* frame 是 requestAnimation 的调用计数 */
    let { context, width, height, frame } = canvas;

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const Col = PARAMS.Col;
    const Row = PARAMS.Row;
    const CellNum = Col * Row;
    const GridW = width * 0.8;
    const GridH = height * 0.8;
    const CellW = GridW / Col;
    const CellH = GridH / Row;
    const MarginX = width - GridW;
    const MarginY = height - GridH;

    for (let i = 0; i < CellNum; i++) {
      /* 当前列 */
      let col = i % Col;
      /* 当前行 */
      let row = Math.floor(i / Col);

      let x = col * CellW;
      let y = row * CellH;
      let w = CellW * 0.8;
      let h = CellH * 0.8;
      let mx = CellW - w;
      let my = CellH - h;


      /* 利用噪声算法生成随机值 */
      /* 通过 frame 来达到每次调用都更新 n 的目的 */
      let f = PARAMS.animation ? frame : PARAMS.frame;
      const n = random.noise2D(x + f * 10, y, PARAMS.freq);
      const angle = n * Math.PI * PARAMS.amp;
      /* 设置线条宽度 (将噪点随机值[-1, 1] 映射到 [0, 1] =>  (n + 1) /2 ) */
      const scale = ((n + 1) / 2) * PARAMS.Scale;

      // 这是另一种方法, 和上面没有区别
      // const scale = (n * 0.5 + 0.5) * 30

      // console.log('x, y', x, y);

      context.save();
      context.beginPath();
      /* 这里是方块左上角 */
      context.translate(x, y);
      /* 外边距 */
      context.translate(MarginX * 0.5, MarginY * 0.5);
      /* 内边距, 使得整体居中 */
      context.translate(mx / 2, my / 2);
      /* 起始点移动到方块中心 */
      context.translate(w * 0.5, h * 0.5);

      context.rotate(angle);

      context.lineWidth = scale;
      /* 移动到盒子最左边 */
      context.moveTo(-w / 2, 0);
      /* 相当于沿着盒子中间划线 */
      context.lineTo(w / 2, 0);
      context.stroke();
      context.restore();
    }
  };
};

createPane();
canvasSketch(sketch, settings);

export {};
