# 自动播放

为了防止视频的自动播放对用户体验造成影响, 浏览器对`autoplay`功能进行限制. [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Media/Autoplay_guide)


## AutoPlay 功能

需要满足以下至少一个条件

+ 静音或音量设置为0(`muted`属性)
+ 用户和网页已有交互行为
+ 网站被列入白名单
+ 带有自动播放策略(`Feature-Policy: autoplay *`)


目前如果video和网页同源, 则允许自动播放. 如果不同源, 则需要设置为静音. 

自动播放策略目前测试下来是没有任何效果....


通过`MediaSource`方式播放流媒体的自动播放功能??
