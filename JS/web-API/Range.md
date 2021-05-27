

# Range

[MDN相关文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)


## 含义

表示一个包含文本域文本节点的文档片段

最大的作用就是可以将文本内容塞入这个文档片段中

同时,  `range` 可以被 `Selection` 推入, 推出 

[Selection](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)


## 应用

### 实现点击复制文本功能

```javaScript
  function copyText(selector) {
    if (!selector) return new Error('请输入DOM 选择器, 以复制该DOM下所有文本')
    var dom = document.querySelector(selector)
    var range = document.createRange()
    range.selectNode(dom) // 将dom放入文档片段中
    window.getSelection().removeAllRanges() // 清除所有选中区域的range(手动选中的也会放入这个区域)
    window.getSelection().addRange(range) // 将需要复制的文本放入选中区域
    if (document.execCommand) {
      document.execCommand('copy') // 执行复制命令, 复制选中区域文本
      window.getSelection().removeAllRanges()
    } else throw Error('很抱歉, 浏览器已不再支持 execCommand')
  }

```