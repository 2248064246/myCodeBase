# 全屏事件

> 全屏 API 在 Document 和 Element 接口中增加了一些方法，可用于允许打开关闭全屏模式。

## Document 中方法

- Document.exitFullscreen()

## Element 中的方法

- Element.requestFullscreen()

请求浏览器（user agent）将特定元素（甚至延伸到它的后代元素）置为全屏模式，隐去屏幕上的浏览器所有 UI 元素，以及其它应用。返回一个 Promise，并会在全屏模式被激活的时候变成 resolved 状态。

**从 MDN 的描述看, 任意元素都可以进行全屏**

## 属性

- DocumentOrShadowRoot.fullscreenElement
  fullscreenElement 属性提供了当前在 DOM （或者 shadow DOM）里被展示为全屏模式的 Element，如果这个值为 null，文档不处于全屏模式。

- Document.fullscreenEnabled
  fullscreenEnabled 属性提供了启用全屏模式的可能性。当它的值是 false 的时候，表示全屏模式不可用（可能的原因有 "fullscreen" 特性不被允许，或全屏模式不被支持等 ）。

## 事件处理程序

- Document|Element.onfullscreenchange 当进入全屏或退出全屏时触发
- Document|Element.onfullscreenerror

## 事件

- fullscreenchange (en-US)
  当全屏或退出全屏时发送消息给（监听的）的 Document 或 Element 。

- fullscreenerror (en-US)
  当全屏或退出全屏是发生了错误时，将错误消息发送给（监听的）的 Document 或 Element 。

> 特别注意, 全屏事件只能由用户手动触发

## 兼容

> 这个 API 是比较新的标准, 以前的浏览器的全屏实现标准并不统一

```js
function requestFullScreen(element) {
  // 判断各种浏览器，找到正确的方法
  var requestMethod =
    element.requestFullScreen || //W3C
    element.webkitRequestFullScreen || //Chrome等
    element.mozRequestFullScreen || //FireFox
    element.msRequestFullScreen; //IE11

  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== 'undefined') {
    //for Internet Explorer

    var wscript = new ActiveXObject('WScript.Shell');

    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
}

function exitFull() {
  // 判断各种浏览器，找到正确的方法
  var exitMethod =
    document.exitFullscreen || //W3C
    document.mozCancelFullScreen || //Chrome等
    document.webkitExitFullscreen || //FireFox
    document.webkitExitFullscreen; //IE11
  if (exitMethod) {
    exitMethod.call(document);
  } else if (typeof window.ActiveXObject !== 'undefined') {
    //for Internet Explorer

    var wscript = new ActiveXObject('WScript.Shell');

    if (wscript !== null) {
      wscript.SendKeys('{F11}');
    }
  }
}
```
