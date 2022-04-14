# 流媒体处理器

通过传入媒体轨道, 生成媒体帧流


```js
const trackGenerator = new MediaStreamTrackProcessor({ track: videoTrack });
```

**属性**

+ readable 返回一个可读的媒体帧流


这个最大的作用就是解析媒体 track, 然后生成对应的 媒体帧流.

可以对这个媒体帧流直接进行读取, 并将帧绘制到canvas上