# state 和 生命周期

使用 state 需要使用 class 组件

> Class 组件应该始终使用 props 参数来调用父类的构造函数。

> state 用来存储组件的状态，可以通过 setState() 方法来修改并且动态更新与之相关的 DOM

```JS
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  /* 组件挂载后触发 */
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  /* 组件卸载之前触发 */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## class 组件中的生命周期

## 正确使用 state

### 不要直接修改 state

这样不会重新渲染组件。修改 state 必须使用 setState() 方法。

### state 的更新可能是异步的。

出于性能考虑，React 可能会把多个 `setState()`调用合并成一个调用。

下面的代码时错误的

```js
this.setState({
  a: this.state.a + this.props.b,
});
```

解决的方法是给 setState 传递一个函数，这个函数用 state 作为第一个参数，props 作为第二个参数。

```JS
this.setState((state, props) => {
  return {
    a: state.a + props.b
  }
})
```

### 数据是向下流动的
> 通常称为 `单向数据流`或`自上而下的数据流`

不管是父组件或是子组件都无法知道某个组件时有状态还是无状态的，并且也并不关心它是函数组件还是class组件。

这就是为什么称 state 为局部的或是封装的原因。除了拥有并设置了它的组件，其他组件都无法访问。

组件可以将它的state作为props向下传递到它的子组件中。但是子组件并无法知道这个props的值是来自父组件的state或props，还是手动输入的。

