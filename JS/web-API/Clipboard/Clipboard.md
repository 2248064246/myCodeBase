# Clipboard

> 安全上下文可用

剪贴板 Clipboard API 提供了响应剪贴板命令（剪切、复制和粘贴）与异步读写系统剪贴板的能力。从权限 Permissions API 获取权限之后，才能访问剪贴板内容；如果用户没有授予权限，则不允许读取或更改剪贴板内容。

**这里在调用剪贴板API的时候, 会自动弹出授权窗口**

该 API 被设计用来取代使用 document.execCommand() 的剪贴板访问方式。 (我认为不可行, 如果只是写入剪贴板都要授权, 那么也太麻烦了)

## 获取权限

如果用户没有适时使用 Permissions API 授予相应权限和"clipboard-read" 或 "clipboard-write" 权限，调用 Clipboard 对象的方法不会成功

```js
navigator.permissions.query({name: "clipboard-read"}).then()
navigator.permissions.query({name: "clipboard-read"}).then()
```

这样获取居然不会弹出弹窗 (在`https`中可以直接调用上面代码获取权限, 但是在`http`中会被拒绝)


## 方法

+ read() 读取数据(包括图片)
+ readText() 读取文本信息
+ write() 写入任意数据
+ writeText() 写入文本数据