# Render Props

> 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个函数, 该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑

## 使用 Render Props 来解决横切关注点

组件是 React 代码复用的主要单元，但如何分享一个组件封装到其他需要相同 state 组件的状态或行为并不总是很容易。(高阶组件是一种解决方案)

看如下例子:

目前一个组件 `a`, 当鼠标在上面移动时能够显示鼠标坐标. 现在的问题是: 我们要如何复用这个行为? 换个说法，若另一个组件`b`需要知道鼠标位置，我们能否封装这一行为，以便轻松地与其他组件共享它？？

这里有一个关键问题是--我们需要共享`a`组件中关于鼠标的 state 信息. (高阶组件是个方法)

现在, 通过 Render Prop 可以提供一个 render 方法让 `a` 组件能够动态决定什么需要渲染.

下面是一个实际例子:

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src='/cat.jpg'
        style={{ position: 'absolute', left: mouse.x, top: mouse.y }}
      />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }
  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}
```


> 需要注意的点时, 属性并不一定是要叫 `render` , 其它任何props允许的名称都是可以的

> 实际上这和高阶组件很相似, 只是这个是组件形式的




