# canvas 流捕获

```js
/* 返回一个canvas实时的视频流 */
MediaStream = canvas.captureStream(frameRate);
```

frameRate: 一个双精度浮点值，表示每个帧的捕获速率。如果没有设置，每次画布改变时都会捕获一个新帧;如果设置为 0，帧将不会被自动捕获;相反，它们只会在返回的轨道的 requestFrame()方法被调用时被捕获。(注: 这个方法在 `CanvasCaptureMediaStreamTrack` 对象上)


requestFrame: 手动强制捕获帧并将其发送到流。这让希望直接指定帧捕获时间的应用程序可以这样做，如果它们在调用captureStream()时指定的帧速率为0。