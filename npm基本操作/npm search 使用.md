# npm search

`npm search` 命令可以用来查找对应的包

**语法**

```shell
npm search [-configuration] <searchName>
```

configuration 配置

- `-long` `-l` : 会以列表形式结果
- `-json`: 以 JSON 数据显示结果
- `-color`: 默认启用, 用于支持搜索关键字的高亮, 设置为 false 取消高亮.
- `-parseable`: 一个略微格式化的结果, 不如`-l`

一般来说使用 `npm search -l searchName` 就足够了


