# WebWorkers

通过使用 WebWorkers, web 应用程序可以在独立于主线程的后台线程中, 运行一个脚本操作.**这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是 UI 线程）不会因此被阻塞/放慢。**

## 概念和用法

使用构造函数（例如,Worker()）创建一个 worker 对象, 构造函数接受一个 JavaScript 文件 URL — 这个文件包含了将在 worker 线程中运行的代码。worker 将运行在与当前 window 不同的另一个全局上下文中，这个上下文由一个对象表示，标准情况下为 DedicatedWorkerGlobalScope （标准 workers 由单个脚本使用; 共享 workers 使用 SharedWorkerGlobalScope (en-US)）。

> 这一标注 worker 和共享 worker

- 不能直接在 worker 中操作 DOM 元素
- 某些 window 上的对象无法使用
- 某些 API 无法使用

[参见 Functions and classes available to workers ](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers)

主线程和 worker 线程互相使用 `postMessage()`方法来发送西悉尼, 并且通过`onmessage`这个事件来接收信息. 数据的交互方式为传递副本, 而不是直接共享数据

## 不同的 worker

- Shared Workers 可被不同的窗体的多个脚本运行，例如 IFrames 等，只要这些 workers 处于同一主域。共享 worker 比专用 worker 稍微复杂一点 — 脚本必须通过活动端口进行通讯。详情请见 SharedWorker。
- Service Workers 一般作为 web 应用程序、浏览器和网络（如果可用）之间的代理服务。他们旨在（除开其他方面）创建有效的离线体验，拦截网络请求，以及根据网络是否可用采取合适的行动，更新驻留在服务器上的资源。他们还将允许访问推送通知和后台同步 API。
- Chrome Workers 是一种仅适用于 firefox 的 worker。如果您正在开发附加组件，希望在扩展程序中使用 worker 且可以访问 js-ctypes，那么可以使用 Chrome Workers。详情请见 ChromeWorker
- 音频 Workers 可以在网络 worker 上下文中直接完成脚本化音频处理.

> 根据网络 worker 规范， worker 错误事件不应该冒泡

## 事件

- onerror
- onmessage
- onmessageerror

## 方法

- postMessage()
- terminate() 立即终止 worker

## 关于共享 worker

> 最大的特点是两边会共用一个 worker(包括作用域)

SharedWorker 接口代表一种特定类型的 worker，可以从几个浏览上下文中访问，例如几个窗口、iframe 或其他 worker。

**个人认为共享 worker 的作用就是在 iframe 中能够使用父级页面的共享 worker**

> 要使用共享 worker, 这些页面必须是同源的
