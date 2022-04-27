/*
 * @Author: huangyingli
 * @Date: 2022-04-26 16:49:14
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-27 14:47:54
 * @Description:
 */

class myCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.mouseX = 0;
    this.mouseY = 0;
    this.isSupportMouseMove = true;
    this.initEvent();
  }

  /**
   * 绘制canvas中心坐标轴
   *
   */
  drawCanvasCoordCenter() {
    if (!this.ctx) {
      return;
    }

    let halfW = this.canvas.width / 2;
    let halfH = this.canvas.height / 2;
    this.ctx.save();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    this.strokeLine(0, halfH, this.canvas.width, halfH);
    this.ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    this.strokeLine(halfW, 0, halfW, this.canvas.height);
    this.ctx.restore();
    this.fillCircle(halfW, halfH, 5, 'rgba(0, 0, 0, 0.5');
  }

  /**
   * 绘制线条
   * @param {number} beginX 起点x
   * @param {number} beginY 起点y
   * @param {number} targetX 终点x
   * @param {number} targetY 终点y
   */
  strokeLine(beginX, beginY, targetX, targetY) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(beginX, beginY);
    this.ctx.lineTo(targetX, targetY);
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * 绘制填充圆
   * @param {number} x 圆心x坐标
   * @param {number} y 圆心y坐标
   * @param {number} r 圆半径
   * @param {string} color 填充颜色
   */
  fillCircle(x, y, r, color) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  strokeCircle(x, y, r, color) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
  }

  fillRect(x, y, width, height, color = '#888') {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.rect(x, y, width, height);
    this.ctx.fill();
    this.ctx.restore();
  }

  stokeRect(x, y, width, height, color = 'black') {
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
    this.ctx.restore();
  }

  rect(width, height, position = 'center', stoke = false, color = '#666') {
    let x = 0;
    let y = 0;
    switch (position) {
      case 'center':
        x = -width / 2;
        y = -height / 2;
        break;
      case 'top-center':
        x = -width / 2;
        break;
      case 'bottom-center':
        y = -height;
        x = -width / 2;
        break;
      case 'left-center':
        y = -height / 2;
        break;
      case 'right-center':
        x = -width;
        y = -height / 2;
        break;
      case 'top-left':
        break;
      case 'top-right':
        x = -width;
        break;
      case 'bottom-left':
        y = -height;
        break;
      case 'bottom-right':
        x = -width;
        y = -height;
        break;
      default:
    }
    if (stoke) {
      this.stokeRect(x, y, width, height, color);
    } else {
      this.fillRect(x, y, width, height, color);
    }
  }

  fillRectWidthTitle(x, y, width, height, text) {
    this.fillRect(x, y, width, height);
    this.fillText(width / 2, height / 2, text);
  }

  /**
   * 绘制文本
   * @param {number} x 起点x坐标
   * @param {number} y 起点y坐标
   * @param {string} text 文本字符
   * @param {string} [color=black] 文本颜色
   * @param {string} [align=center] 文本对齐方式
   * @param {string} [baseLine=bottom]
   */
  fillText(x, y, text, color = 'black', align = 'center', baseLine = 'middle') {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseLine;
    this.ctx.fillText(text, x, y);
    this.ctx.restore();
  }

  drawCoordInfo(x, y, text) {
    this.fillText(x, y, text);
  }

  /**
   * 绘制网格背景
   * @param {string} [color=grey] 网格颜色
   * @param {number} [interval=10] 网格间隔
   * @param {number} [lineWidth=0.5] 网线宽度
   */
  strokeGrid(color = 'grey', interval = 10, lineWidth = 0.5) {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      for (let i = interval + lineWidth; i < this.canvas.width; i += interval) {
        this.strokeLine(i, 0, i, this.canvas.height);
      }
      for (
        let i = interval + lineWidth;
        i < this.canvas.height;
        i += interval
      ) {
        this.strokeLine(0, i, this.canvas.width, i);
      }
      this.ctx.restore();
      this.fillCircle(0, 0, 5, 'green');
      this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  /**
   * 绘制该点的坐标系
   * @param {number} x 起点x坐标
   * @param {number} y 起点y坐标
   * @param {number} width 横向线段长度
   * @param {number} height 纵向线段长度
   */
  strokeCoord(x, y, width, height) {
    if (this.ctx) {
      this.ctx.save();
      this.ctx.strokeStyle = 'red';
      this.strokeLine(x, y, x + width, y);
      this.ctx.strokeStyle = 'blue';
      this.strokeLine(x, y, x, y + height);
      this.ctx.restore();
    }
  }

  doTransform() {
    let width = 100;
    let height = 60;
    let halfX = this.canvas.width / 2;
    let halfY = this.canvas.height / 2;
    this.ctx.save();
    this.ctx.translate(halfX, halfY);
    // this.fillRectWidthTitle(0, 0, width, height, '0度旋转');
    this.rect(60, 40, 'center', true)
    this.ctx.restore();
  }

  dispatchMouseMove(evt) {
    this.mouseX = evt.offsetX;
    this.mouseY = evt.offsetY;
  }

  distance(x1, y1, x2, y2) {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(x * x + y * y);
  }
  render() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.strokeGrid();
      this.drawCanvasCoordCenter();
      this.drawCoordInfo(this.mouseX, this.mouseY, '鼠标位置');
      this.doTransform();
      window.requestAnimationFrame(this.render.bind(this));
    }
  }

  initEvent() {
    if (this.isSupportMouseMove) {
      this.canvas.addEventListener('mousemove', (e) => {
        this.dispatchMouseMove(e);
      });
    }
  }
}
