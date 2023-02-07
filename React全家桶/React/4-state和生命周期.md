# state 和 生命周期

## state

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。

使用 state 需要使用 class 组件

> Class 组件应该始终使用 props 参数来调用父类的构造函数。

> state 用来存储组件的状态，可以通过 setState() 方法来修改并且动态更新与之相关的 DOM


**每次组件更新的时候都会调用 render 方法**

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


通过 `this.state` 定义一个组件内部的`state`状态对象. 在挂在之后, 执行定时器每秒改变state状态. 

得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么

## class 组件中的生命周期

## 正确使用 state

### 不要直接修改 state

这样不会重新渲染组件。修改 state 必须使用 setState() 方法。

### state 的更新可能是异步的。

出于性能考虑，React 可能会把多个 `setState()`调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

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

### State 的更新会被合并

就是说定义的时候设置state对象有多个属性, 但是可以使用 `setState()` 一个一个设置, 这些设置最中会被合并到 state 中.

### 数据是向下流动的
> 通常称为 `单向数据流`或`自上而下的数据流`

不管是父组件或是子组件都无法知道某个组件时有状态还是无状态的，并且也并不关心它是函数组件还是class组件。

**这就是为什么称 state 为局部的或是封装的原因。除了拥有并设置了它的组件，其他组件都无法访问。**

组件可以将它的state作为props向下传递到它的子组件中。但是子组件并无法知道这个props的值是来自父组件的state或props，还是手动输入的。

