# Number 上的一些操作

## 进制转换

```ts
function decToAny(n: number, base: number) {
  if (base > 36 || base < 2) throw Error('必须是2~36进制之间');

  let stack = [],
    compatable = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let remain = n;

  while (remain > 0) {
    stack.push(remain % base);
    remain = Math.floor(remain / base);
  }

  let str = '';
  while (stack.length > 0) {
    str += compatable[stack.pop() as number];
  }

  return str;
}
```

## 浮点数比较

应为 IEEE 754 的原因, js的浮点数并不是绝对精确


```js
let a = 0.3 - 0.2;
let b = 0.1;

if((a -b) < Number.EPSILON) {
  /* 相等 */
}
```