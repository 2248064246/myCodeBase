# refs 和 refs 转发

## refs

通过给 jsx 组件绑定 ref, 就可以在组件中直接通过 `this.refs` 获取这个组件 DOM

```js
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <input type='text' ref='name' onClick={this.handleClick.bind(this)} />
      </div>
    );
  }
  handleClick() {
    console.log(this.refs['name']);
  }
}
```

## refs 转发

Ref 转发是一项将 ref 自动的通过组件传递到其子组件的技巧.(可以在父组件直接给子组件设置 ref, 并获取)

> props 无法传递 ref, 就像 key 属性一样, 被 react 做了特殊处理

```js
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <input type='text' ref='name' onClick={this.handleClick.bind(this)} />
        /* 此时这个ref只是作用域在这个组件, 通过refs只能获取React组件实例 */
        <NameInput ref='myInput' />
      </div>
    );
  }
  handleClick() {
    console.log(this.refs['name']);
  }
}

class NameInput extends React.Component {
  render() {
    return <input type='text' placeholder='请输入name' />;
  }
}
```

稍作修改, 使用 React 提供的`React.forwardRef` 方法来实现 ref 转发

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    const { forwardedRef } = this.props;

    return (
      <div>
        <input type='text' ref='age' onClick={this.handleClick.bind(this)} />
        /* 这里ref可以用 createRef() 穿件的, 也可使用普通字符串 */
        <Xx ref={this.myRef} onClick={this.handleClick.bind(this)} />
      </div>
    );
  }
  handleClick() {
    console.log(this.refs);

    /* 通过 this.myRef.current 就可以获取到子组件对应的DOM */
    console.log(this.myRef);
  }
}

class NameInput extends React.Component {
  render() {
    const { forwardedRef, onClick } = this.props;
    return (
      <input
        type='text'
        placeholder='请输入name'
        onClick={onClick}
        ref={forwardedRef}
      />
    );
  }
}

function abc() {
  /* 通过 此方法来构建特殊的组件 */
  return React.forwardRef((props, ref) => {
    return <NameInput forwardedRef={ref} {...props} />;
  });
}

let Xx = abc();
```


