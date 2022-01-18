# 页面可见性API

当窗口最小化或切换到另一个选项卡时, API会发送 `visibilitychange` 事件, 让监听者知道页面状态已更改

一些例子:
+ 网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片。
+ 显示信息仪表盘的应用程序不希望在页面不可见时轮询服务器进行更新。
+ 页面想要检测是否正在渲染，以便可以准确的计算网页浏览量
+ 当设备进入待机模式时，网站想要关闭设备声音（用户按下电源键关闭屏幕）


## 属性

+ Document.hidden 如果页面是隐藏的则返回true
+ Document.visibilityState 用来的展示文档当前的可见性状态
  + visible 可见的
  + hidden 不可见
  + prerender 正在渲染的(不可见, 只能由prerender 到 visible或hidden, 不能反向)
+ Document.onvisibilitychange


