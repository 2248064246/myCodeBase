
# word 等在线预览

> 无法前端单独实现, 都需要后台转换

## 方案一

使用工具转 pdf (大体上都需要服务器上安装 Office)

大体上只有 Offcie 官方能完美转换

对于EXCEL表格的转换不是很友好，因为表格

会有Sheet页。不论是转换为pdf也好、html也罢。实现起来都是比较复杂的

## 方案二

后台解析, 使用定制ui显示出来

需要后台跑一套定制的ui用于显示各类文档, 在页面样式上会和 Office 有一定差别

### 可用的第三方库

+ https://kkfileview.keking.cn  https://gitee.com/kekingcn/file-online-preview/blob/master/README.md
  + 这个开源的库可以实现预览基本上常见的文件, UI界面还可以
  + [介绍地址](http://wiki.i-fanr.com/2021/05/20/online-file/?hmsr=toutiao.io&utm_campaign=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

+ 冰蓝科技
+ WPS开放平台 https://open.wps.cn/docs/cloud/case-solution
  + https://www.ljserver.cn/wpsonline/#/webFile
+ office online serve 

## 使用 微软或者谷歌 的线上服务

```
https://view.officeapps.live.com/op/view.aspx?src=你的地址（一定得是全路径，带http的那种）
```



