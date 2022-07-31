import { Verify } from 'crypto';

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
  animation: true,
};

interface Vector {
  x: number;
  y: number;
}

class Vector implements Vector {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Agent {
  radius: number;
  point: Vector;
  dir: Vector;
  draw(ctx: CanvasRenderingContext2D): void;
  update(): void;
  bounce(): void;
}

class Agent implements Agent {
  constructor(x: number, y: number, radius: number) {
    this.point = new Vector(x, y);
    this.dir = new Vector(range(-0.75, 0.75), range(-0.75, 0.75));
    this.radius = radius;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // ctx.fillStyle = 'white';
    // ctx.arc(this.point.x, this.point.y, this.radius - 1 0, Math.PI * 2);
    // ctx.fill();
    ctx.translate(this.point.x, this.point.y);
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill()
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.bounce();
    this.point.x += this.dir.x;
    this.point.y += this.dir.y;
  }

  getDistance(pos: Vector) {
    let dx = this.point.x - pos.x;
    let dy = this.point.y - pos.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  bounce() {
    if (this.point.x <= 0 || this.point.x >= width) {
      this.dir.x *= -1;
    }
    if (this.point.y <= 0 || this.point.y >= height) {
      this.dir.y *= -1;
    }
  }
}

let agents: Array<Agent> = [];
const particleNum = 50;

const range = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};

for (let i = 0; i < particleNum; i++) {
  let agent = new Agent(range(0, width), range(0, height), range(4, 6));
  agents.push(agent);
}

const sketch = () => {
  return (canvas: MCanvas) => {
    let ctx = canvas.context;
    let w = canvas.width;
    let h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < agents.length; i++) {
      let agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        let other = agents[j];
        if (agent.getDistance(other.point) > 120) continue;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(agent.point.x, agent.point.y);
        ctx.lineTo(other.point.x, other.point.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    agents.forEach((agent) => {
      agent.draw(ctx);
      agent.update();
    });
  };
};

canvasSketch(sketch, settings);

export {};
