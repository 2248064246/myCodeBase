
# Storage

window 对象的 localStorage 和 sessionStorage 属性引用的是 Storage 对象

Storage对象与普通JS对象非常类似, 只不过
+ Storage 对象的属性值必须是字符串
+ Storage 对象中存储的属性是持久化的.

Storage 属性可以使用 delete 操作符删除

可以使用 for...in/Object.keys() 枚举Storage属性

```js
localStorage.name = 'tom' // 等同于 localStorage.setItem('name', 'tom')
```

## 生命周期和作用域

localStorage和sessionStorage的差异主要体现在生命周期和作用域上


localStorage 的作用域为文档来源(同协议, 同主机, 同端口). 所有同源文档可以互相访,修改问对方的数据(与访问localStorage的脚本来源无关), 非同源文档之间的数据完全隔离.

localStorage 作用域也受浏览器实现的限制(不同浏览器不能访问)

localStorage 的生命周期是永久的, 除非特意清除数据

sessionStorage 数据的生命周期与存储它的脚本所属的顶级窗口或浏览器标签页相同. 窗口或标签页永远关闭之后, sessionStorage存储的数据都会被删除

不过要注意: 现代浏览器能够再次打开最近意外关闭的标签, 并恢复用户上次浏览的回话, 因此sessionStorage的生命周期可能比看起来更长

sessionStorage 的作用域与localStorage类似, 都是文档来源, 但是sessionStorage在不同标签页之间并不能共享.

## 存储事件

存储在localStorage中的数据每次发生变化时, 浏览器都会在该数据可见的其他window对象(**不包括导致该变化的窗口**)上触发 `storage` 事件.

如果浏览器打开了两个标签页, 加载了两个同源页面, 其中一个页面在localStorage上存储了一个值, 则另一个标签会收到 `storage` 事件

