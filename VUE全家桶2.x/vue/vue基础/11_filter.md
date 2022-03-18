# filter

过滤器可以实现 Vue 中对插值数据和绑定数据的过滤操作

常用的操作是格式化一些数据, 例如时间, 金额等

## filter 参数

第一个参数是 `|` 前面的数值, 后面可以传入自己的参数

```js
{{msg | filter(bb, cc)}}


filter(aa, bb, cc) {
  // aa 是 msg
}
```
