# HTML 元素

HTML 元素是顶级元素, 所有其他元素必须是此元素的后代

html 元素里面一般有两个子元素

- head
- body

## 关于在 HTML 上使用 lang 属性

lang 属性需要是一个`有效的 IETF 标识语言标记`

lang 属性有助于浏览器识别文档语言, **并便于提供对应的翻译服务** (浏览器的翻译弹出是基于这个识别的)

lang 的属性值由两部分组成: `ISO-639-1`-`国家区域编码`

ISO-639-1 是用来标示世界上的主要语言, 例如中文: zh, 英文: en

国家区域编码 是国家/区域的缩小, 且都是大写字母, 例如: 中国: CN, 台湾: TW

常见的 lang 属性有: `zh-CN`, `en`(也可以只写语言, 不接区域)

[ISO-639-1](https://baike.baidu.com/item/ISO%20639-1/8292914)

[国家/区域编码](https://baike.baidu.com/item/%E4%B8%96%E7%95%8C%E5%90%84%E5%9B%BD%E5%92%8C%E5%9C%B0%E5%8C%BA%E5%90%8D%E7%A7%B0%E4%BB%A3%E7%A0%81/6560023)

[国家/区域代码表](http://114.xixik.com/country-code/#anchor1)

## 注意

在 HTML 文档中, html 元素不是必须的

## 文档类型声明

在 HTML5 中, 简化了这种声明 (大小写无关)

```html
<!DOCTYPE html>
```

在现代浏览器中, 确实这个声明, 将会导致文档进入怪异模式
