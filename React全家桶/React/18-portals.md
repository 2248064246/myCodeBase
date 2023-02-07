# Portals

Portal 提供了一种将子节点渲染到存在于父节点以外的 DOM 节点的优秀方案

```js
ReactDOM.createPortal(ReactComponent, container);
```

以一个参数是任何可以被渲染的 React 元素, 第二个元素是要挂载的 DOM 节点

```js
render() {
  // React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
  // `domNode` 是一个可以在任何位置的有效 DOM 节点。
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

## 通过 Portal 进行事件冒泡

一个从 portal 内部触发的事件会一直冒泡至包含 React 树的祖先，即便这些元素并不是 DOM 树 中的祖先.

由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的。

```html
<div id="root"></div>

<div id="modal"></div>

<script type="text/babel">
  const root = document.querySelector('#root');
  const modal = document.querySelector('#modal');

  class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.$el = document.createElement('div');
    }

    componentDidMount() {
      /* React完成挂载的时候, 挂载到真实DOM上 */
      modal.appendChild(this.$el);
    }

    componentWillUnmount() {
      modal.removeChild(this.$el);
    }

    render() {
      return ReactDOM.createPortal(this.props.children, this.$el);
    }
  }

  class Child extends React.Component {
    render() {
      return <button>Click</button>;
    }
  }

  class App extends React.Component {
    constructor(props) {
      super(props);
    }

    handleClick() {
      /* Child 里面的按钮点击事件将会冒泡到React父组件 */
      /* 尽管在实际DOM结构中它们并不是父子关系 */
      console.log('点击事件');
    }
    render() {
      return (
        <div onClick={this.handleClick}>
          <Modal>
            <Child />
          </Modal>
        </div>
      );
    }
  }

  ReactDOM.render(<App />, root);
</script>
```


