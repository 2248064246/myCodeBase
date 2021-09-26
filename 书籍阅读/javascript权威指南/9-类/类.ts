class Point {
  private _x: number;
  private _y: number;
  public size: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
    this.size = 0;
  }

  @configurable(false)
  get x() {
    return this._x;
  }

  @configurable(false)
  get y() {
    return this._y;
  }
}

function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(target, propertyKey, descriptor);
    descriptor.configurable = value;
  };
}

let p = new Point(1, 2);
