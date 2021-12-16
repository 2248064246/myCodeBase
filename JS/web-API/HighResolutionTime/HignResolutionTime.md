# 高时间采样率 API

此 API 定义了 Performance 接口, 可以记录应用的各种时间. 其精确度可达千分之一毫秒（受硬件或软件限制）

## 方法

- performance.now() 放回当前窗口的打开时间, 单位是毫秒, 但是可以精确到微秒

```js
performance.now(); // 242113.30000001192
```

- toJSON() 返回 Performance 的序列化结果, 也是一个对象

```js
performance.toJSON()

// 返回结果
{
    "timeOrigin": 1639634459028.8,
    "timing": {
        "connectStart": 1639634459036,
        "navigationStart": 1639634459028,
        "loadEventEnd": 1639634460581,
        "domLoading": 1639634459785,
        "secureConnectionStart": 0,
        "fetchStart": 1639634459036,
        "domContentLoadedEventStart": 1639634460426,
        "responseStart": 1639634459757,
        "responseEnd": 1639634460384,
        "domInteractive": 1639634460386,
        "domainLookupEnd": 1639634459036,
        "redirectStart": 0,
        "requestStart": 1639634459052,
        "unloadEventEnd": 1639634459781,
        "unloadEventStart": 1639634459781,
        "domComplete": 1639634460579,
        "domainLookupStart": 1639634459036,
        "loadEventStart": 1639634460579,
        "domContentLoadedEventEnd": 1639634460427,
        "redirectEnd": 0,
        "connectEnd": 1639634459036
    },
    "navigation": {
        "type": 1,
        "redirectCount": 0
    }
}
```
