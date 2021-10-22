
# EventTarget

EventTarget 是一个 DOM 接口，由可以接收事件、并且可以创建侦听器的对象实现


`Element`, `document` 和 `window` 是最常见的 event targets. 但是其他对象也可以作为 event targets, 比如: `XMLHttpRequest`, `AudioNode` 等...

`XMLHttpRequest` 顶层继承自 `EventTarget`


## 构造函数

`EventTarget`


## 原型方法

+ `addEventListener(type, callBack)`
+ `removeEventListener(type, callback)`
+ `dispatchEvent(event)`


## 使用示例

```js
class MyEventTarget extends EventTarget {
  constructor(mySecret) {
    super();
    this._secret = mySecret;
  }

  get secret() { return this._secret; }
};

let myEventTarget = new MyEventTarget(5);
let value = myEventTarget.secret;  // == 5
myEventTarget.addEventListener("foo", function(e) {
  this._secret = e.detail;
});

let event = new CustomEvent("foo", { detail: 7 });
/* 通过自定义事件触发监听事件 */
myEventTarget.dispatchEvent(event); 
let newValue = myEventTarget.secret; // == 7

```


## EventTarget 的简单实现

```js
var EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if(!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if(!(type in this.listeners)) {
    return;
  }
  var stack = this.listeners[type];
  for(var i = 0, l = stack.length; i < l; i++) {
    if(stack[i] === callback){
      stack.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  if(!(event.type in this.listeners)) {
    return;
  }
  var stack = this.listeners[event.type];
  event.target = this;
  for(var i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event);
  }
};
```

