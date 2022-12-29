# 取色器 API

目前没有任何浏览器支持

> 在最新的 Edge 和 Chrome 上已经存在 EyeDropper 构造函数, 只是还没有任何方法

这是一个可以在页面上进行取色的 API

- 用户只能通过点击 UI 界面触发 API(类似全屏事件)
- 不能在用户没有注意到的情况下在后台使用
- 通过 `esc` 按键退出取色模式
- 取色时鼠标所在区域会是类似放大镜模式

## 使用

```js
let eyeDropper = new EyeDropper();

// 一个终止控制器
let abortControl = new AbortController();

btn.onClick = () => {
  // 可以传入一个终止信标, 用于通过代码终止取色器
  eyeDropper.open({ signal: abortControl.signal }).then((sRgbHex) => {
    // 返回一个promise, 值是一个16进制的sRGB格式字符串
    console.log(sRgbHex);
  });
};

// 通过代码控制结束取色器
// abortControl.abort();
```
