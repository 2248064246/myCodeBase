# jsx 和元素渲染

## jsx

JSX 是一个 JavaScript 的语法扩展, 它可以很好的描述 UI 应该呈现出它应有交互的本质形式. jsx 具有 JS 的全部功能.

## 在 jsx 中嵌入表达式

通过 `{}` 就可以在 jsx 嵌入任何 js 表达式

```js
let name = 'Tom'
let class = 'big-5'
let ele = <div className={class}>{name}, {format(new Date())}</div>
function format(date) {
  return date.toString();
}
```

### JSX 也是一个表达式

在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX 防止注入攻击

React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串.

## 元素渲染

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：

```js
const element = <h1 className='greeting'>Hello, world!</h1>;
```

```js
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!'
);
```

然后 React.crateElement() 会返回一个 VDOM 对象, 大概如下:

```js
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!',
  },
};
```

最后通过 `ReactDOM.render` 来将 VDOM 渲染为实际的 DOM

### 更新已渲染的元素

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

> 这里每隔1秒会重新执行render函数, 但是只有和原来不同的部分会被更新.

> 一般项目中只会调用一次render, DOM通过`有状态的组件`来实现更新

### React 只更新它需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。


