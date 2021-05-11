

## href 和 src 的区别

+ href: 超文本引用, 通过指定资源位置, 来定义当前文档或元素与目标资源之间的关系, 这个过程不会阻塞页面的解析 
+ src: 指向外部资源的位置, 会将资源内容嵌入到元素中, 此过程或导致页面阻塞, 直到资源完全下载完成

## link 和 @import 区别

+ link 是标签, @import 是css语法
+ link 引入css页面不会阻塞, @import 会导致页面阻塞
+ link 可以通过JS动态引入css, @import 不行

## 常见行内标签, 块级标签, 行内块标签

+ 行内标签
  + span
  + i
  + em
  + a
  + 等文本标签
+ 块级标签
  + div
  + p
  + h1~h6
  + table
  + ul
  + li
  + ...
+ 行内块
  + img
  + button

## img 标签和 background-img 的区别

+ img在图片完全加载完成前, 后面的文档都不会加载
+ background-image 会在文档加载之后再加载图片

+ img 存在空隙问题
  + 需要设置 vertical-align 为非 baseline
+ 
  
