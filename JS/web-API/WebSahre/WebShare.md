# 网络共享

Web 共享 API 提供了一种将文本, 链接, 文件和其他内容共享到用户选择的任意共享目标的机制

> 安全上下文
> web worker 中不可用
> 不应将此 API 与 [Web 共享目标 API](https://w3c.github.io/web-share-target/) 混淆, 后面这个允许网站将自身指定为共享目标(不理解, 似乎还处于文档阶段)

## 概念和用法

Web 共享 API 允许站点利用基础操作系统的共享机制，将文本、链接、文件和其他内容共享到用户选择的共享目标。这些共享目标通常包括系统剪贴板、电子邮件、联系人或消息传递应用程序以及蓝牙或 WiFi 通道。

> 重点: 共享文件, 剪贴板, 蓝牙, wifi 通道

该 API 只有两种方法。`navigator.canShare（）` 方法可用于先验证某些数据是否“可共享”，然后再将其传递给 `navigator.share（）` 进行发送。

`navigator.share（）` 方法调用基础操作系统的本机共享机制并传递指定的数据。它需要暂时激活，因此必须从 UI 事件（如按钮单击）触发。此外，该方法必须指定本机实现支持共享的有效数据。

Web 共享 API 受 Web 共享权限策略的约束。如果策略受支持但尚未授予，则这两种方法都将指示数据不可共享。

> 这个策略指的是 `http 功能策略 -- Feature-Policy 标头`. 主要限制嵌套窗口中(iframe)能够进行共享. **目前这个方案还在讨论阶段, 没有浏览器实现**

`Feature-Policy: web-share *`

## 接口

- **navigator.canShare(data)**
  返回一个 Boolean, 用于判断数据是否能够共享

- **navigator.share(data)**
  返回一个 promise, 表示传递的数据是否已经成功发送到共享目标(这个`成功`是如何定义的). 方法必须由用户激活(也被称为暂时性激活)

**data 数据**

- url: [USVString](https://developer.mozilla.org/en-US/docs/Web/API/USVString)
- text: USVString
- title: USVString
- files: `Array<File>`

> 暂时性激活: 是一种窗口状态，指示用户最近按下按钮、移动鼠标、使用菜单或执行了某些其他用户交互。此状态有时用作一种机制，用于确保 Web API 仅在由用户交互触发时才能运行。

## 异常

共享可能失败

- `NotAllowedError` 没有授予 Web 共享权限, 或者不是安全环境共享被阻止
- `TypeError` 无法验证指定的共享数据(数据格式不对, 不支持的数据)
- `AbortError` 用户取消操作
- `DataError` 数据传输时出现问题

## 支持文件

[参见](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#shareable_file_types)

## 使用中的一些问题

1. 成功和失败时无法获取的(除非是数据不支持导致的失败). 用户取消发送和发送之后的成功状态这个没法获取
2. 在不同的系统上, 不同浏览器上共享的弹窗 UI 都是不一样的(目前在 Edge 上是支持度最高的)
3. 在文件共享和文本共享的时候, 浏览器的 UI 是不一样的...(在 Edge 中)


