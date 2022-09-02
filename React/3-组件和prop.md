# 组件和 props

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

## 组合组件

就是可以在组件中使用其他组件

## props 的只读性

组件中不能修改 props。这是 React 中的一个严格要求：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

并且试图修改props属性会抛出错误
