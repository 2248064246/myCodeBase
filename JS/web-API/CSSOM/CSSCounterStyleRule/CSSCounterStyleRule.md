# CSSCounterStyleRule

对应 css 属性 `@counter-style`, 可以获取里面的属性

CSSRule <- CSSCounterStyleRule

```js
let myRules = document.styleSheets[0].cssRules; // 通过 cssRules 属性访问
console.log(myRules[0].pad); // "0"
```