# Symbol-API

## 静态方法

- for(key)
  使用给定的 key 搜索现有的 Symbol, 如果找到则返回该 symbol. 否则将给定的 key 在全局 symbol 中注册一个新的 symbol
- keyFor(symbol)  
  用来获取全局 symbol 注册表中与某个 symbol 关联的键

  ```js
  let sym = Symbol.for('Tom');
  Symbol.keyFor(sym); // Tom
  ```

## 原型属性
+ description
  > 返回 Symbol 的描述(key值)
  ```js
    Symbol('desc').toString();   // "Symbol(desc)"
    Symbol('desc').description;  // "desc"
  ``` 

## 原型方法

+ toString()
+ valueOf()


