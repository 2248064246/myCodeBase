# 组件和 props

组件允许将 UI 拆分为独立可复用的代码片段, 并对每个片段进行对立构思.

## React 组件定义

从概念上讲, React 组件类似 JS 函数, 它接受任意的入参(即 props), 并返回用于描述页面内容的 React 元素(也就是 JSX 语法定义的元素)

## 函数组件和 class 组件

函数组件

```js
function Welcome(props) {
  return <h1>hell {props.tag}</h1>;
}
```

class 组件

```js
class Welcome extends React.Component {
  render() {
    return <h1>hello {this.props.tag}</h1>;
  }
}
```

组件的使用, 并传入 props 属性

> 组件名称必须以大写字母开头，小写的标签将会被视作为原生 DOM

```js
const ele = <Welcome tag='React' />;
```

## 组件作为元素

当React元素用作用户自定义组件时, 它会将JSX所接收的属性(attributes) 及子组件转换为单个对象传递给组件, 则个对象称为 `props`

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name='Sara' />;
ReactDOM.render(element, document.getElementById('root'));
```

## 组合组件

就是可以在组件中使用其他组件


## 提取组件

将组件差分为更小的组件

**建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。**

## props 的只读性

组件中不能修改 props。这是 React 中的一个严格要求：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

并且试图修改 props 属性会抛出错误
