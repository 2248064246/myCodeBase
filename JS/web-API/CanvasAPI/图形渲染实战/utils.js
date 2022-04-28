/*
 * @Author: huangyingli
 * @Date: 2022-04-28 11:33:53
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-04-28 14:06:30
 * @Description:
 */

/**
 * 二维向量
 */
class vec2 {
  constructor(x, y) {
    this.values = new Float32Array([x, y]);
  }

  static create(x, y) {
    return new vec2(x, y);
  }
  toString() {
    return [...this.values];
  }

  get x() {
    return this.values[0];
  }
  get y() {
    return this.values[1];
  }

  set x(x) {
    this.values[0] = x;
  }
  set y(y) {
    this.values[1] = y;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(vector) {
    if (Math.abs(this.x - vector.x) > Number.EPSILON) {
      return false;
    }
    if (Math.abs(this.y - vector.y) > Number.EPSILON) {
      return false;
    }
    return true;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    if (this.length == 0) {
      this.x = 0;
      this.y = 0;
      return 0;
    }
    if (this.length == 1) {
      return 1.0;
    }

    this.x /= this.length;
    this.y /= this.length;
    return this.length;
  }

  static xAxis = new vec2(1, 0);
  static yAxis = new vec2(0, 1);
  static nXAxis = new vec2(-1, 0);
  static nYAxis = new vec2(0, -1);

  static sum(left, right) {
    let result = new vec2();
    result.x = left.x + right.x;
    result.y = left.y + right.y;
    return result;
  }

  static difference(left, right) {
    let result = new vec2();
    result.x = left.x - right.x;
    result.y = left.y - right.y;
    return result;
  }

  add(right) {
    let result = vec2.sum(this, right);
    this.x = result.x;
    this.y = result.y;
  }

  subtract(right) {
    let result = vec2.difference(this, right);
    this.x = result.x;
    this.y = result.y;
  }

  negative() {
    this.x = -this.x;
    this.y = -this.y;
  }

  static scale(direction, scalar) {
    let result = new vec2();
    result.x = direction.x * scalar;
    result.y = direction.y * scalar;
    return result;
  }

  static scaleAdd(start, direction, scalar) {
    let result = new vec2();
    result = vec2.scale(direction, scalar);
    return vec2.sum(start, result);
  }
}
