# 地理位置 API

此 API 允许用于向 web 程序提供他们的位置 (会先弹出弹框请求获取许可)

```js
if ('geolocation' in navigator) {
  /* 地理位置服务可用 */
} else {
  /* 地理位置服务不可用 */
}
```

## 获取当前定位

```js
navigator.geolocation.getCurrentPosition(function (position) {});
```

position 信息

- coords
  - latitude 维度
  - longitude 经度
  - accuracy 定位精度(单位米)
  - speed 设备速度信息, 允许为 null(单位米)
  - heading 设备方向, 允许 null(以度数表示, 0 度代表北)
  - altitude 海拔高度
  - altitudeAccuracy 海拔高度精度
- timestamp 获取位置的时间戳

> 默认情况下，getCurrentPosition() 会尽快返回一个低精度结果，这在您不关心准确度只关心快速获取结果的情况下很有用。有 GPS 的设备可能需要一分钟或更久来获取 GPS 定位，在这种情况下 getCurrentPosition() 会返回低精度数据（基于 IP 的定位或 Wi-Fi 定位）

## 监视定位或获取高精度定位

```js
var watchID = navigator.geolocation.watchPosition(function (position) {
  console.log(position);
});
```

在位置改变的时候都会触发回调函数

可以通过 `navigator.geolocation.clearWatch(watchID);` 清除这个监听

## 更加详细的调用

```js
function geo_success(position) {
  console.log(position)
}

function geo_error() {
  alert('Sorry, no position available.');
}

var geo_options = {
  enableHighAccuracy: true, // 使用高精度, 更加耗电
  maximumAge: 30000,        // 它表明的是设备必须在多长时间（单位毫秒）内返回一个位置
  timeout: 27000,           // 它表明可以返回多长时间（即最长年龄，单位毫秒）内的可获取的缓存位置。如果设置为 0, 说明设备不能使用一个缓存位置，而且必须去获取一个真实的当前位置。如果设置为 Infinity ，那么不管设置的最长年龄是多少，设备都必须返回一个缓存位置。默认值：0。
};

var wpid = navigator.geolocation.watchPosition(
  geo_success,
  geo_error,
  geo_options
);
```
