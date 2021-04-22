
# Array Polyfill 

## `flat`
> 详见 MDN Array.prototype.flat

> 简单的展平 depth = 1
```javaScript
  array.reduce((acc, cur) => acc.concat(cur), [])

  // or

  [].concat(...array)
```

> 结合 reduce 和 concat 实现 depth
```javaScript
function flatDeep(arr, d = 1) {
   return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []): arr.slice();
};
```

> 使用 stack 结构

```javaScript
// 
function flatten(input) {
  const stack = [...input];
  const res = [];
  while(stack.length) {
    // pop value from stack
    const next = stack.pop();
    if(Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}
```

