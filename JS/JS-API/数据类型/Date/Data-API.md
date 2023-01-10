# Date-API

## 静态方法

- `Date.now() => Number`
  返回自 1970-1-1 00:00:00 UTC（世界标准时间）至今所经过的毫秒数。

* `Date.UTC(year, monthIndex, day, hour, minute, second, millisecond) => String`
  根据给定参数返回对应的`UTC`时间

## 原型方法

- `getTime() => Number`
  返回一个数值，表示从 1970 年 1 月 1 日 0 时 0 分 0 秒（UTC，即协调世界时）距离该 Date 对象所代表时间的毫秒数。（更早的时间会用负数表示）
- `valueOf() => Number`
  同`getTime()`
- `getFullYear() => Number`
  返回完整的年份
- `getMonth() => Number`
  返回月份 0~11
- `getDate()`
  返回日期
- `getDay()`
  返回星期, 0~6
- `getHours()`
  返回小时, 0~23
- `getMinutes()`
  返回分钟, 0~59
- `getSecondes()`
- `getMilliseconds()`
  返回毫秒, 0~999
- `setFullYear()`
- `setMonth()`
- `setDate()`
- ...

- `toString() => String`
  返回美式日期格式字符串
  ```js
  new Date().toString();
  // Wed Jun 01 2022 17:47:28 GMT+0800 (中国标准时间)
  ```
- toUTCString()
  返回 UTC 标准的时间格式(时区为 0 的时间)
  ```js
  new Date().toUTCString();
  // 'Wed, 01 Jun 2022 09:49:18 GMT'
  ```
- `toJSON() => String`
  返回时区为 0 的时间

  ```js
  new Date().toJSON();
  // '2022-06-01T09:52:32.931Z'
  ```

- `toLocaleString() => String`
  返回当地时间的格式

  ```js
  new Date().toLocaleString();
  // '2022/6/1 17:54:18'
  ```

- `toLocaleDateString() => String`
  返回本地形式的 年月日
- `toLocaleTimeString() => String`
  返回本地形式的 时分秒
