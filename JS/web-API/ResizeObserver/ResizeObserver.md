# ResizeObserver

用于监听元素的大小变化

在此之前, 我们监听浏览器窗口的大小变化, 通过 `resize` 事件

而现在, web 能够直接监听指定元素的大小变化

## 使用

通过 `ResizeObserver` 构造函数创建监听器

监听器有三个方法

- observe(element) 用于指定监听元素
- disconnect(element) 取消目标监听监听
- unobserve() 结束所有监听

```js
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    /* 这里返回的是一个数据, 因为监听的DOM可能是一个集合 */
    /* entry 是一个 ResizeObserverEntry 对象*/
    /* 包含 target 和 contentRect 两个属性 */
    /* target: 指向当前元素 */
    /* contentRect: 是当前元素 Rect 属性 */
  }
});
```
