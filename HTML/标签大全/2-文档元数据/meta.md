# meta 元素

- 空元素
- 单标签

此元素表示那些不能由其他 HTML 元相关元素之一表示的任何`元数据`信息(描述数据的数据, 比如该文件作者和概要等)

## meta 定义的元数据包括

- 如果设置了 `name` 属性, meta 元素提供的是文档级别的元数据, 应用于整个页面
- 如果设置了 `http-equiv` 属性, meta 元素则是编译指令, 提供的信息与类似命名的 HTTP 头部相同
- 如果设置了 `charset` 属性, meta 元素是一个字符集声明, 告诉文档使用哪种字符编码
- 如果设置了 `itemprop`属性, meta 元素提供用于定义的元数据

> 注意: 全局属性 name 在 `<meta>` 元素中具有特殊的语义；另外， 在同一个 `<meta>` 标签中，name, http-equiv 或者 charset 三者中任何一个属性存在时，itemprop 属性不能被使用。

## 属性

`charset`

`content`

- 此属性包含 `http-equiv` 或 `name` 属性的值

`http-equiv`

- 属性定义了一个编译指示指令, 这个属性叫做 http-equiv 是因为所有允许的值都是特定 HTTP 头部的名称
- 属性值 + `x-ua-compatible` + 如果指定, 则`content`属性必须具有值`IE=edge` + `refresh` + 这个属性用于控制页面刷新 + 如果 content 只包含一个正整数，则为重新载入页面的时间间隔(秒)； + 如果 content 包含一个正整数，并且后面跟着字符串 `;url=` 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)
  `name`
- name 属性为元数据条目提供名称, `content`属性提供值
- 常见的条目有:
  - application-name: 网页所运行的应用程序名称
    - 浏览器可能使用此名称来识别应用程序
    - 不同于`title`元素, 后者通常包含应用程序名称，但也可能包含文档名称或状态等信息。
    - 简单网页不应该使用此条目
  - author: 文档作者的名字
  - description: 一段短而精简的对页面的描述
  - generator: 生成此页面的软件的标识符(identifier)
  - keywords: 与此页面内容相关的关键词, 使用逗号分隔
  - referrer: 控制由当前文档发出的请求的 HTTP Referer 请求头
  - viewport: 为 viewport（视口）的初始大小提供指示（hint）。目前仅用于移动设备。
  - creator: 当前文档的创建者, 如果有多个 creator 则应该使用多个 meta
  - robots: 爬虫、协作搜寻器，或者“机器人”，对此页面的处理行为，或者说，应当遵守的规则。
- [更多详情](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta/name)

## 关键字, 描述等信息 (非常重要)

```html
<title>document 标签</title>
<meta name="keywords" content="前端开发,文档,网站声明" />
<meta
  name="description"
  content="DOCTYPE 全拼document type 是一种标准通用标记语言的文档类型声明"
/>
```

## 刷新

表示 5 秒后刷新, 并重定向到指定网址

```html
<meta http-equiv="refresh" content="5;https://www.bing.cn" />
```

## 自定义属性

我们可以自定义一些属性, 来增加更多的意义

```html
<meta name="theme-color" content="#ffffff" />
```

google, Twitter 等公司, 定义了一些自己的 元标签属性, 用于在分享的时候显示更多的信息(比如: 链接海报, 作者, 标题等)

[元标签生成](https://metatags.io/)

**绝大多数网站都会带有 og:xxx 类型的描述**(这似乎是一种通用写法)

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://metatags.io/" />
<meta property="og:title" content="Meta Tags — Preview, Edit and Generate" />
<meta
  property="og:description"
  content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!"
/>
<meta
  property="og:image"
  content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
/>
```
