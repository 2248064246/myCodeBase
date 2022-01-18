# 画中画 API

作用是能够将页面上的视频脱离文档显示(最长间的是位于右下角显示)

但是这个 API 的强大之处在于视频能够在任何地方显示, 而不会限制于单前浏览器标签页

> FireFox 居然不支持这个 API.....

## 使用

```js
function togglePictureInPicture() {
  /* 退出画中画, 此接口在 Document 上 */
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    /* 启用画中画, 此接口在 HTMLVideoElement 上 */
    if (document.pictureInPictureEnabled) {
      /* 这里返回 pictureInPictureWindow 对象 */
      video.requestPictureInPicture();
    }
  }
}
```

## 事件

- HTMLVideoElement.onenterpictureinpicture 进入画中画模式事件
- HTMLVideoElement.onleavepictureinpicture 离开画中画模式事件
- pictureInPictureWindow.onresize 用于监听画中画的大小改变

```js
const video = document.querySelector('#video');
const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');

function resize(evt) {
  heightOutput.textContent = evt.target.width;
  widthOutput.textContent = evt.target.width;
}

video.requestPictureInPicture().then((pictureInPictureWindow) => {
  pictureInPictureWindow.onresize = resize;
});
```
