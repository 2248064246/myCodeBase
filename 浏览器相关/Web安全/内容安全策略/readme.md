
# 内容安全策略

HTTP 响应头Content-Security-Policy允许站点管理者控制用户代理能够为指定的页面加载哪些资源。

这将帮助防止跨站脚本攻击（Cross-Site Script）, 也就是 xss

主要包括
+ script-src 用于控制脚本资源
+ style-src 用于控制样式资源
+ img-src
+ font-src
+ media-src
+ default-src 
+ ...

所有的指令的值都会回落到 default-src。也就是说，如果某个指令在CSP头部中未定义， 那么用户代理就会寻找default-src 指令的值来替代。

这是MDN响应头的 CSP 值
```
default-src 'self'; script-src 'report-sample' 'self' *.speedcurve.com 'sha256-q7cJjDqNO2e1L5UltvJ1LhvnYN7yJXgGO7b6h9xkL1o=' www.google-analytics.com/analytics.js 'sha256-JEt9Nmc3BP88wxuTZm9aKNu87vEgGmKW1zzy/vb1KPs=' polyfill.io/v3/polyfill.min.js assets.codepen.io production-assets.codepen.io; script-src-elem 'report-sample' 'self' *.speedcurve.com 'sha256-q7cJjDqNO2e1L5UltvJ1LhvnYN7yJXgGO7b6h9xkL1o=' www.google-analytics.com/analytics.js 'sha256-JEt9Nmc3BP88wxuTZm9aKNu87vEgGmKW1zzy/vb1KPs=' polyfill.io/v3/polyfill.min.js assets.codepen.io production-assets.codepen.io; style-src 'report-sample' 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; connect-src 'self' www.google-analytics.com stats.g.doubleclick.net; font-src 'self'; frame-src 'self' interactive-examples.mdn.mozilla.net mdn.github.io yari-demos.prod.mdn.mozit.cloud mdn.mozillademos.org yari-demos.stage.mdn.mozit.cloud jsfiddle.net www.youtube-nocookie.com codepen.io; img-src 'self' *.githubusercontent.com *.googleusercontent.com lux.speedcurve.com mdn.mozillademos.org media.prod.mdn.mozit.cloud media.stage.mdn.mozit.cloud interactive-examples.mdn.mozilla.net wikipedia.org www.google-analytics.com www.gstatic.com; manifest-src 'self'; media-src 'self' archive.org videos.cdn.mozilla.net; worker-src 'none';

```

具体值属性值参考 MDN 对应文档


## 使用

指令可以指定多个, 满足一个就可以加载资源

但是在script中, 如果指定 `nonce-`值, 则`unsafe-inline` 会被忽略