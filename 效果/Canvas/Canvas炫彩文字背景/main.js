"use strict";
/*
 * @Author: huangyingli
 * @Date: 2023-01-13 15:00:27
 * @LastEditors: huangyingli
 * @LastEditTime: 2023-01-13 17:23:24
 * @Description:
 */
// exports.__esModule = true;
/**
 *
 * @param {Number} width
 * @param {Number} height
 * @returns {CanvasIns}
 */
function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    return {
        canvas: canvas,
        context: context
    };
}
/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {String} text
 */
function writeText(canvas, context, text) {
    var size = 160;
    context.font = "".concat(size, "px serif");
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
}
function maskCanvas(c3, c2, c1) {
    c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
    c3.context.globalCompositeOperation = 'source-atop';
    c3.context.drawImage(c1.canvas, 0, 0);
}
function clear(c) {
    var canvas = c.context;
    canvas.globalAlpha = 0.05;
    canvas.fillStyle = '#000';
    canvas.fillRect(0, 0, c.canvas.width, c.canvas.height);
    canvas.globalAlpha = 1;
}
function update() {
    clear(c1);
    particles.forEach(function (p) { return p.move(); });
    maskCanvas(c3, c2, c1);
    requestAnimationFrame(update);
}
var Particle = /** @class */ (function () {
    function Particle(c, x, y) {
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
    Particle.prototype.render = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.lineWidth = 2;
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();
    };
    Particle.prototype.move = function () {
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
    };
    return Particle;
}());
var W = document.body.clientWidth;
var H = document.body.clientHeight;
var c1 = createCanvas(W, H);
var c2 = createCanvas(W, H);
var c3 = createCanvas(W, H);
var particles = [];
var particlesNum = 400;
for (var i = 0; i < particlesNum; i++) {
    particles.push(new Particle(c1, c1.canvas.width / 2, c1.canvas.height / 2));
}
writeText(c2.canvas, c2.context, '洛水赋神');
document.body.appendChild(c3.canvas);
update();
