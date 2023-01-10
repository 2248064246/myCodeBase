# BigInt-API

## 使用

可以通过在数字后面加`n`或者使用`BigInt()`函数来将普通数字值转为 BigInt 值

```js
BigInt(123);
BigInt('123');

BigInt('0xfff');
```

## 静态方法

- asIntN(width, bigint)
  > 返回一个有符号 bigint 值
  > 将传入的 bigint 存储在指定位数的新的 bigint 上
  > width 过小会溢出
- asUIntN(width, bigint)
  > 返回一个无符号 bigint 值

## 实例方法

- toLocaleString()
- `toString(base) => String`
  > 返回 Number 值类型的字符串
- valueOf()
