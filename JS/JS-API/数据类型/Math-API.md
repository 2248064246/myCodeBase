
# Math API

## 静态属性

+ `PI` 

+ 好多, 需要用到的时候在看吧

## 静态方法

> 这个需要了解常用的

+ `abs`
+ `floor`
+ `ceil`
+ `round`
+ `random`
  + 生成随机数 [n, m]
  ```javaScript
    let random = (n, m) => Math.floor(Math.random()* (m - n + 1) + n)
  ``` 
+ `max`
  >  通过 apply 或者 剩余参数赋 来将求数组的最大/最小值的时候, 要注意JS的参数个数限制(超过会导致报错).
  > JS语法限制的参数个数是 65536 个, 但是不同JS引擎可能会有不同.
  > 一般的做法是对数组分块求解, 来防止这个问题.
  ```js
  function minOfArray(arr) {
    let min = Infinity;
    let QUANTUM = 32768;

    for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
      var submin = Math.min.apply(null,
                                  arr.slice(i, Math.min(i+QUANTUM, len)));
      min = Math.min(submin, min);
    }

    return min;
  }
  ```
+ `min`
+ `sqrt`
+ `pow`

## 原型属性

## 原型方法