# 屏幕捕获 API

屏幕捕获 API 对现有的媒体捕获和流 API 进行了补充，让用户选择一个屏幕或屏幕的一部分（如一个窗口）作为媒体流进行捕获。然后，该流可以被记录或通过网络与他人共享。

## 使用

```js
captureStream = await navigator.mediaDevices.getDisplayMedia(
  displayMediaOptions
);
```

`getDisplayMedia()` 方法返回一个 Promise, 值是 `MediaStream` 类型数据, 包含一个视频轨道。 视频轨道的内容来自用户选择的屏幕区域以及一个可选的音频轨道。

> 浏览器对音频的支持程度各不相同，既取决于是否支持，也取决于音频源. 点击 compatibility table 来查看各个浏览器的支持性.

> 屏幕捕捉 API 没有自己的任何接口，而是在现有的 MediaDevices 接口上添加了一个方法。

displayMediaOptions 参数: 分为 audio 和 video 两类

```js
{
  audio: false, // 是否捕获音频
  video: {
    /* 鼠标捕获设置 https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/cursor */
    /* 目前所有浏览器都不支持这个设置, 默认都会捕获鼠标 */
    cursor: 'always',
    /* 视频约束  https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia*/
    width: {
      ideal: 1280
    },
    height: {
      ideal: 720
    }
  }
}

```
