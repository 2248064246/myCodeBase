# SPA 单页应用

所有的内容都在一个页面上展示, 在页面切换时能够有很好的用户体验. 

但是也面临着应用过大导致问文件过大, 影响加载速度, 维护困难的问题.




## 多页面应用

每个路由对应一个页面, 页面不在需要大量的JS来实现切换, 可以做到快速响应. 但是切换会导致整个页面重新渲染.


## 如何高单页应用的首屏加载时间

1. 通过webpack进行代码分割, 减少入口代码的体积
2. 路由懒加载
3. 大型资源(图片等)的懒加载
4. 合理利用浏览器的缓存功能, 缓存必要的静态文件
5. 公共静态文件使用CDN加速
6. UI库或第三方库的按需加载, 减少代码体积