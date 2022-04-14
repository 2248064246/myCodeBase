# ImageCapture

提供了从相机或其影像中获图像的方法.

```js
/* f返回一个 ImageCapture 实例,可用于从指定的视频轨道捕获静止帧 */
new ImageCapture(videoTrack);
```

**方法**

- takePhoto(options) 拍照并返回包含图像数据的 blob promise

  - options
    - fillLightMode: 捕获设备的闪光灯设置, `auto`, `off`, `flash`

  ```js
  var takePhotoButton = document.querySelector('button#takePhoto');
  var canvas = document.querySelector('canvas');

  takePhotoButton.onclick = takePhoto;

  function takePhoto() {
    imageCapture
      .takePhoto()
      .then(function (blob) {
        console.log('Took photo:', blob);
        img.classList.remove('hidden');
        img.src = URL.createObjectURL(blob);
      })
      .catch(function (error) {
        console.log('takePhoto() error: ', error);
      });
  }
  ```

- grabFrame() 捕获一个帧

  ```js
  var grabFrameButton = document.querySelector('button#grabFrame');
  var canvas = document.querySelector('canvas');

  grabFrameButton.onclick = grabFrame;

  function grabFrame() {
    imageCapture
      .grabFrame()
      .then(function (imageBitmap) {
        console.log('Grabbed frame:', imageBitmap);
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
        canvas.classList.remove('hidden');
      })
      .catch(function (error) {
        console.log('grabFrame() error: ', error);
      });
  }
  ```
- getPhotoCapabilities() 返回设备拍照设置(promise)
  - redEyeReduction: 返回 `never`, `always`, `controllable` 中的一个, 表示设备的红眼消除是否可由用户控制
  - imageHeight: 返回一个对象, 指示用户代理支持的图像高度范围
  - imageWidth: 返回一个对象, 表示用户代理支持的图像宽度范围
  - fillLightMode: 返回可用的闪光灯选项数组, `auto`, `off`, `flash`
- getPhotoSetting() 返回当前拍照的设置, 就是 `options` 的值


## 使用 createImageBitmap

这是一个全局方法, 可以将 `img 元素` `canvas 元素` `video 元素` `Blob 数据` `ImageData` 转为 `ImageBitmap` 对象

通过 `canvas`元素上的 `drawCanvas` || `drawImage` 方法, 可以将`ImageBitmap` 绘制到画布上

