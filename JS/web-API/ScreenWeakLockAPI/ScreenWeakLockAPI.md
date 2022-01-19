# 屏幕唤醒锁 API

用来阻止息屏

通过调用 navigator.wakeLock.request（）基于 Promise 的方法获取 WakeLockSentinel 对象，该方法在平台允许的情况下进行解析。请求可能由于多种原因被拒绝，包括系统设置（如省电模式或电池电量低）或文档未处于活动状态或不可见。

> 如果电池电量过低或文档不活动或不可见，系统可以释放它。它也可以通过 WakeLockSentinel.release（）方法手动释放。最好存储对哨点对象的引用，以便以后控制释放，并在需要时重新获取锁。

## 使用

特征检测

```js
if ('wakeLock' in navigator) {
  // 'Screen Wake Lock API supported!';
} else {
  //'Wake lock is not supported by this browser.';
}
```

请求唤醒锁

```js
// Create a reference for the Wake Lock.
let wakeLock = null;

// create an async function to request a wake lock
try {
  wakeLock = await navigator.wakeLock.request('screen');
  // 'Wake Lock is active!';
} catch (err) {
  // The Wake Lock request has failed - usually system related, such as battery.
  statusElem.textContent = `${err.name}, ${err.message}`;
}
```

释放唤醒锁

```js
wakeLock.release().then(() => {
  wakeLock = null;
});
```

侦听唤醒锁释放

```js
wakeLock.addEventListener('release', () => {
  // the wake lock has been released
  statusElem.textContent = 'Wake Lock has been released';
});
```

重新获取唤醒锁

```js
/* 页面可见时重新锁定 */
document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    wakeLock = await navigator.wakeLock.request('screen');
  }
});
```


