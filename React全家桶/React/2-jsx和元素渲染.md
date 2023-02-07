# jsx 和元素渲染

## jsx

JSX 是一个 JavaScript 的语法扩展, **它可以很好的描述 UI 应该呈现出它应有交互的本质形式**. **jsx 具有 JS 的全部功能.**

以大写字母开头的标签会被解析为 React 组件, 所以，当你使用 JSX `<Foo />` 表达式时，Foo 必须包含在作用域内。

## 不使用 JSX

React 不强制使用 JSX

每个 JSX 元素只是调用 `React.createElement(component, props, ...children)`的语法糖, 因此, 使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成

## 为什么使用 JSX

React 认为渲染逻辑本质上与其它 UI 逻辑内在耦合. (也将就是说 JS 和 HTML 是耦合的, 不应该分离)

所以使用 JSX 语法将二者结合在一起. (这点看起来 Vue 其实更加优秀)

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

也就是说，你可以在 if 语句和 for 循环的代码块中使用 JSX，将 **JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX**：

```js
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX 特定属性

JSX 中可以通过使用引用来将属性指定为字符串字面量(也就是传入字符串)

通过使用`{}` 来传入 JS 表达式

### 使用 JSX 指定子元素

如果一个标签里面没有内容, 则可以使用 `/>` 来闭合标签

### JSX 类型中使用点语法

在 JSX 中，你也可以使用点语法来引用一个 React 组件。当你在一个模块中导出许多 React 组件时，这会非常方便。

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color='blue' />;
}
```

### 在运行时选择类型

React 标签不能使用 `Object[name]` 这种方式

```js
function Story(props) {
  // 错误！JSX 类型不能是一个表达式。
  return <components[props.storyType] story={props.story} />;
}
```

要解决这个问题, 需要首先将类型赋值给一个大写字母开头的变量:

```js
function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

### JSX 中的 props

#### JS 表达式作为 props

可以把 `{}`中的 JS 表达式作为一个 props 传递给组件

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

#### 字符串字面量

`{}` 中可以直接传入字符串字面量

```js
/* 这两种是等价的 */
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```

### props 默认值为 `true`

如果没有给 props 指定值, 那么它默认是`true`

### 属性展开

可以使用 `...`运算符来在 JSX 中传递整个 props 对象

```js
/* 一下两种是等价的 */
function App1() {
  return <Greeting firstName='Ben' lastName='Hector' />;
}

function App2() {
  const props = { firstName: 'Ben', lastName: 'Hector' };
  return <Greeting {...props} />;
}
```

### JSX 中的子元素

包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 `props.children`传递给外层组件

#### 字符串字面量

可以将字符串放在开始和结束标签之间, 此时 `props.children` 就只是该字符串

```jsx
<MyComponent>Hello world!</MyComponent>
```

> JSX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。

#### JSX 子元素

子元素可以是其他 jsx 元素, 可以是 html 标签, 可以是字符串字面量...

**js 表达式作为子元素**

**函数作为子元素**

```js
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

> 可以将任何东西作为子元素传递给自定义组件，只要确保在该组件渲染之前能够被转换成 React 理解的对象。这种用法并不常见，但可以用于扩展 JSX。

#### 布尔类型、Null 以及 Undefined 将会忽略

如果要渲染这些值, 需要先转为字符串...

### JSX 防止注入攻击

可以安全的在 JSX 插入内容.

ReactDOM 在渲染所有输入内容之前, 默认会进行转义.

它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

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

最后通过 `ReactDOM.render(element, root)` 来将 VDOM 渲染为实际的 DOM

### 更新已渲染的元素

React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，**更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。**

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

> 这里每隔 1 秒会重新执行 render 函数, 但是只有和原来不同的部分会被更新.

> 一般项目中只会调用一次 render, DOM 通过`有状态的组件`来实现更新

### React 只更新它需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。


**根据我们的经验，考虑 UI 在任意给定时刻的状态，而不是随时间变化的过程，能够消灭一整类的 bug。** (这就话具体应该如何理解??)

(通过状态来改变UI, 而不让UI随时间变化??)