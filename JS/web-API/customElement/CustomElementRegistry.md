
# CustomElementRegistry API

CustomElementRegistry接口提供注册自定义元素和查询已注册元素的方法。要获取它的实例，请使用 window.customElements属性。

## 方法

`define(name, constructor, options)`
> 定义一个新的自定义元素
 + 参数
   + name 
   + constructor
   + options 控制元素如何定义,  目前有一个选项支持:
     + extends: 指定继承的已创建的元素

```js
class WordCount extends HTMLParagraphElement {}
// Define the new element
customElements.define('word-count', WordCount, { extends: 'p' });
```


`get(name)`
> 返回自定义元素的构造者

```js
let ctor = customElements.get('word-count'); // => WordCount
```

`upgrade(root)`
> 此方法将更新节点子树中, 及包含阴影的自定义的元素

```js
const el = document.createElement("spider-man");

class SpiderMan extends HTMLElement {}
customElements.define("spider-man", SpiderMan);

console.assert(!(el instanceof SpiderMan)); // not yet upgraded  true

customElements.upgrade(el);
console.assert(el instanceof SpiderMan);    // upgraded!   true
```

`whenDefined(name)`

 当一个元素被定义时, 此接口放回一个 promise