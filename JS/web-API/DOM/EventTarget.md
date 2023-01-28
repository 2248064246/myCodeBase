# EventTarget

EventTarget 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现

`Element`, `document` 和 `window` 是最常见的 event targets. 但是其他对象也可以作为 event targets, 比如: `XMLHttpRequest`, `AudioNode` 等...

`XMLHttpRequest` 顶层继承自 `EventTarget`

## 构造函数

> 可以通过 new 关键字, 创建实例

`EventTarget`

## 原型方法

- `addEventListener(type, callBack[, options[, useCapture]])`
  **options: Object**

  - `capture: Boolean` 表示是否在事件捕获阶段触发回调
  - `once: Boolean` 表示是否只监听一次
  - `passive: Boolean` 表示永远不会调用`preventDefault()`, 即使调用了也会忽略. 浏览器设置这个属性在滚动事件时为 true, 一般事件上为 false, 主要目的是为了提高滚动的性能.-- (也就是说有些事件是无法阻止默认行为的)
  - `signal: AbortSignal` 该 AbortSignal 的`abort()` 方法调用的时候, 监听器会被移除

  **useCapture: Boolean**
  表示事件是否只在捕获阶段触发

- `removeEventListener(type, callback[, options[, useCapture]])`

  **options: Object**

  - `capture: Boolean` 指定需要移除的监听器是否是捕获阶段的监听器

  **useCapture: Boolean** 同 options 的 capture 参数作用

- `dispatchEvent(event)`
  - 向一个指定的事件目标派发一个事件, 并以合适的顺序(事件创建顺序)同步调用目标元素相关的事件处理函数.
  - 通过 dispatchEvent 方法派发的事件规则与标准时间规则一致(冒泡和捕获)
  - 与浏览器原生事件不同，原生事件是由 DOM 派发的，并通过`event loop异步调用事件处理程序`，而`dispatchEvent()则是同步调用事件处理程序`

## 使用示例

这个例子非常优秀

```js
class MyEventTarget extends EventTarget {
  constructor(mySecret) {
    super();
    this._secret = mySecret;
  }

  get secret() {
    return this._secret;
  }
}

let myEventTarget = new MyEventTarget(5);
let value = myEventTarget.secret; // == 5
myEventTarget.addEventListener('foo', function (e) {
  this._secret = e.detail;
});

let event = new CustomEvent('foo', { detail: 7 });
/* 通过自定义事件触发监听事件 */
myEventTarget.dispatchEvent(event);
let newValue = myEventTarget.secret; // == 7
```

## 事件移除

> Note: 如果同一个元素监听的事件注册了`捕获阶段`和`冒泡阶段`的事件, 则需要分别移除它们.

```js
function a(){}
ele.addEventListener('click', a)

...

ele.removeEventListener('click', a)
```

或者使用`Signal` 来移除

```js
function a() {}
let controller = new AbortController();
ele.addEventListener('click', a, {signal: controller.signal})

...

controller.abort();
```

## EventTarget 的简单实现

```js
var EventTarget = function () {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function (type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function (type, callback) {
  if (!(type in this.listeners)) {
    return;
  }
  var stack = this.listeners[type];
  for (var i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback) {
      stack.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }
};

EventTarget.prototype.dispatchEvent = function (event) {
  if (!(event.type in this.listeners)) {
    return;
  }
  var stack = this.listeners[event.type];
  event.target = this;
  for (var i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }
};
```
