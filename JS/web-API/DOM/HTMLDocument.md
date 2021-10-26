
# HTMLDocument

此接口可以通过 `window.HTMLDocument` 获取


## 属性

+ `cookie`
  + 返回或者设置cookie
+ `defaultView`
  + 返回一个对当前window对象的引用
+ `designMode`
  + 获取或者设置编辑整个文档的能力(off: 不能编辑, on: 允许编辑)
+ `dir`
  + 获取或者设置文档的文字方向 (rtl , ltr)
+ `domain`
  + 获取或者设置当前文档的域名(host)
+ `lastModified`
  + 返回当前文档的最后修改时间
+ `location`
  + 返回一个 `Location` 对象
+ `readyState`
  + 返回当前文档的加载状态
  + 可能值
    + loading: document 仍在加载
    + interactive: 文档已被解析, 但是图像 或 样式表仍在加载
    + complete: 文档和所有子资源已完成加载, `load` 事件即将被触发
  + 此值的改变会在 `document` 上触发 `readstatechange` 事件
+ `referrer`
  + 返回一个URI字符串, 表示当前页面是从这个URI跳转或打开的
  + 如果页面是直接通过地址栏或者书签打开, 则返回空字符串

## 方法
+ `close()`
+ `write()`
+ `open()`
  + 以上三个方法用来打开一个文档, 写入数据, 关闭文档的方法
  + open方法会导致先优文档被清空
+ `getElementsByName()`
+ `queryCommandEnabled(command)`
  + 返回一个Boolean值, 表示该指令是否在当前浏览器可用
  + **该方法在部分浏览器返回的结果是不可预料的。因此，建议使用execCommand的返回值直接判断，或通过其它方式嗅探，而非使用该方法。**
+ `execCommand(command)`
  + 此特性已经被废弃, 虽然现在大部分浏览器依旧支持(MDN 推荐不要使用, 但是那些富文本编辑器该怎么办??)
