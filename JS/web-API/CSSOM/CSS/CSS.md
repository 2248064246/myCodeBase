# CSS

CSS 接口涵盖CSS相关的使用方法. 目前不存在这个接口的对象, 它仅仅只有静态方法(和Math一样)

文档 https://developer.mozilla.org/en-US/docs/Web/API/CSS/factory_functions


## CSS factory function

> 下列方法返回一个 `CSSUnitValue` 
```js

CSS.number(num); // 返回可以用于CSSTypeObject的number值, CSSUnitValue {value: num, unit: "number"}

CSS.percent(percent); // 返回可以用于CSSTypeObject的百分比值

CSS.em(num)
CSS.px(num)
CSS.rem(num)
CSS.vw(num)
CSS.vh(num)
CSS.vmin(num)
CSS.vmax(num)


CSS.deg(num)
CSS.grad(num)
CSS.rad(num)
CSS.turn(num)

CSS.s(num)
CSS.ms(num)
...
```

## CSS.escape()

> 返回传入字符串的转义字符, 主要用作CSS选择器的一部分

```js
CSS.escape(".foo#bar")        // "\.foo\#bar"
CSS.escape("()[]{}")          // "\(\)\[\]\{\}"

// 要转义一个字符串作为选择器使用， escape()方法可以用于:
var element = document.querySelector('#' + CSS.escape(id) + ' > img');

```
> 感觉没什么作用


## CSS.supports()

> 用于检测给定的css属性和值在该浏览器是否支持, 返回 Boolean 值

```js
result = CSS.supports("display", "flex");
```

