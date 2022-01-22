# MediaDevices

MediaDevices 接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。它可以使你取得任何硬件资源的媒体数据。MediaDevices 接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。它可以使你取得任何硬件资源的媒体数据。

> 此接口没构造函数, 通过 navigator.mediaDevices 访问它的实例

## 方法

- enumerateDevices() 获取本机上所有的摄像头, 麦克风, 耳机信息, 返回 promise
- getDisplayMedia() 用于捕获屏幕 (具体看 ScreenCapture API)
- getUserMedia() 在用户通过提示允许的情况下，打开系统上的相机或屏幕共享和/或麦克风，并提供 MediaStream 包含视频轨道和/或音频轨道的输入。

## 事件

- devicechange 每当媒体设备（例如相机，麦克风或扬声器）连接到系统或从系统中移除时，devicechange 事件就会被发送到 MediaDevices 实例。

## 示例

```js
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log('不支持 enumerateDevices() .');
} else {
  // 列出相机和麦克风。

  navigator.mediaDevices
    .enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (device) {
        /* 没有 deviceId 信息, 它是空的 */
        console.log(
          device.kind + ': ' + device.label + ' id = ' + device.deviceId
        );
      });
    })
    .catch(function (err) {
      console.log(err.name + ': ' + err.message);
    });
}
```

### 获取视频和音频流

```js
// 想要获取一个最接近 1280x720 的相机分辨率
/* constraints 参数属性参见 https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia */
var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (mediaStream) {
    var video = document.querySelector('video');
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
  })
  .catch(function (err) {
    console.log(err.name + ': ' + err.message);
  }); // 总是在最后检查错误
```

更多信息查看mdn介绍(低版本处理, 前后摄像头处理, 帧率处理) [参见](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia )