
# Number Polyfill 方法

## Number.isNaN()
```javascript 
  Number.isNaN = Number.isNaN || function isNaN(input) {
    return typeof input === 'number' && input !== input;
  }
```
## Number.isFinite()
```javascript
  if(Number.isFinite === undefined) Number.isFinite = function(value) {
    return typeof value === 'number' && isFinite(value)
  }
```

## Number.isInteger()
```javaScript
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
      isFinite(value) && 
      Math.floor(value) === value; // 这个方法聪明, 就像判断一个数是否是NaN一样, value !== value
  };
```

## Number.isSafeInteger()
```javaScript
  Number.isSafeInteger = Number.isSafeInteger || function (value) {
    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
  };
```