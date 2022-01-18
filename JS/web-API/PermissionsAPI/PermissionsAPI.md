# PermissionsAPI

这个 API 目前主要用于查询当前 client 是否拥有给定的浏览器权限(例如: 地理位置, 剪贴板等)

目前有一些权限无法通过此 API 查询

API 中还显示可以通过此接口获取权限(但是目前没有浏览器支持)

> 用于简化, 规范化浏览器权限的获取

## 使用

```js
navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
  if (result.state === 'granted') {
    /* 允许 */
  } else if (result.state === 'prompt') {
    /* 未申请权限 */
  }
  // Don't do anything if the permission was denied.
});
```

result 中 state 有三个值 `granted: 用户授予了权限`, `denied: 用户拒绝授予权限`, `prompt: 用户未申请权限`


[权限列表参见](https://w3c.github.io/permissions/#dom-permissiondescriptor)


上述列表中的全向并不是所有的浏览器都支持

一般来说, 浏览器基本支持的有: `geolocation` `notifications` `persistent-storage`

一般来说, chrome内核的浏览器支持的类型更多