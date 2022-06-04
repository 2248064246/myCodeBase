## 关于 Map 的序列化和解析

> 这个目前 JS 并没有提供语言层面的解析方法, 只有社区提供的一些方案

这个方案利用 JSON 序列化和反序列化方法 API 支持的自定义格式化方法的支持

```js
function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

const originalValue = [
  new Map([
    [
      'a',
      {
        b: {
          c: new Map([['d', 'text']]),
        },
      },
    ],
  ]),
];
const str = JSON.stringify(originalValue, replacer);
const newValue = JSON.parse(str, reviver);
console.log(originalValue, newValue);
```

另外一种方案是给 Map 类重写 `toJSON` 方法, 但是这个只能将 Map 序列化, 无法反序列

```js
Map.prototype.toJSON = function () {
  var object = {};
  /* 这里需要对key进行判断吗? 以达到和JSON序列化同样的效果 */
  for (let [key, value] of this) object[key] = value;
  return object;
};

var map = new Map();
map.set(null, 1);
map.set('b', { datum: true });
map.set('c', [1, 2, 3]);
map.set('d', new Map([['e', true]]));

var json = JSON.stringify(map, null, '\t');
console.log('>', json);
```
