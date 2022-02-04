# 震动 API

此 API 提供了访问设备震动硬件的功能

## 震动描述

振动被抽象成【开-关】脉冲的模式，且可以具有变化的长度。参数可以是单个整数，表示持续振动的毫秒数 (ms)；或可由多个整数组成的数组，达到振动和暂停循环的效果。只要单一 window.navigator.vibrate() 函式即可控制振动。

```js
/* 这两个效果相同, 都是震动 200ms */
window.navigator.vibrate(200);
window.navigator.vibrate([200]);
```

```js
/* 先震动200ms, 停止100ms, 再震动200ms */
window.navigator.vibrate([200, 100, 200]);
```

```js
/* 参数为0, 或者为空数组时停止震动 */
window.navigator.vibrate(0);
```

> 注意: 为了防止被滥用, 此 API 只能由用户操作触发