
# decodeURI 系列 和 decodeURIComponent 系列


## 区别

`decodeURI` 适用于整体 url 编码

`decodeURIComponent` 适用于部分search字段 url 编码
   
decodeURIComponent 会编码除 ` A-Z a-z 0-9 - _ . ! ~ * ' ( )` 以外的所以字符

## 应用

对于用户输入的数据需要使用 search 方式发送个后端, 应该使用 `decodeURIComponent` 来进行编码