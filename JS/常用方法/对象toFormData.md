

# 通过post 方法传输 FormData 数据

## 将对象转为FormData
这是手动方法, 可以在返回的 FormData 中继续添加文件等二进制数据
```js
function buildFormData (formData, data, parentKey) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      let isAry = Object.prototype.toString.call(data) == '[object Array]'
      buildFormData(formData, data[key], parentKey ? (!isAry ? `${parentKey}.${key}` : `${parentKey}[${key}]`) : key);
    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}

function jsonToFormData (data) {
  const formData = new FormData();

  buildFormData(formData, data);

  return formData;
}
```

## 利用 qs.js 来实现

qs.js 使用用来处理url参数的库, 拥有 `parse` 和 `stringify` 两种常用方法

`stringify` 将一个对象转为url 的查询参数
`parse` 将url查询参数转为 对象

[参考博客](https://www.cnblogs.com/small-coder/p/9115972.html)

```js

// 在post上传的时候, data 数据可以使用 qs.stringify() 处理, 
// 虽然是 查询字符串, 但是在发送的时候直接变为 formData 了
// 好神奇, 这个应该是浏览器的自带特性

```