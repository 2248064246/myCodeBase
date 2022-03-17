# link 和 @import

1. link 引入的样式优先级比 @import 更高
2. link 是 HTML 提供的功能, @import 是 CSS 提供的语法, 可能存在兼容问题
3. link 引入的 css 在下载完成时加载, @import 需要在页面加载完毕之后被加载
4. link 可以通过 DOM 进行操作, 异步进行 css 加载卸载, @import 不行
