

# URLSearchParams

[文档](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)


## 说明

可以用于解析查询参数, 并返回一个迭代器对象, 包含查询参数的键值信息

> 不支持 IE, chrome 46+

## 使用

```javaScript

// 允许前面带问号, 会自动去除问号
let searchObj = new URLSearchParams(window.location.search)

for(const [key, value] of searchObj) {
  console.log(key, value)
}

```

## 方法

+ `get(key)`
+ `getAll(key)` => Array
+ `has(key)`
+ `keys()`
+ `values()`
+ `append(key, value)` 只能增加简单的值
+ `delete(key)`
+ `toString()` 返回 search 字符串, 不带问号