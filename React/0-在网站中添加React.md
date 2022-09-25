# 在网站中添加 React

```html
<!-- 加载 React。-->
<!-- 注意: 部署时，将 "development.js" 替换为 "production.min.js"。-->
<script
  src="https://unpkg.com/react@16/umd/react.development.js"
  crossorigin
></script>
<script
  src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
  crossorigin
></script>
<!-- 挂载点 -->
<div id="root"></div>

<script>
  const e = React.createElement;

  /* 创建一个组件 */
  function likeButton() {
    /* 这里创建的是 VDom */
    return e(
      /* 元素标签名 */
      'button',
      /* 元素属性 */
      { onClick: () => setState({ liked: true }) },
      /* 元素内容 */
      'Like'
    );
  }

  function setState(data) {
    console.log('like button click', data);
  }

  let button = likeButton();
  /* 调用DOM渲染函数渲染 */
  ReactDOM.render(button, document.querySelector('#root'));
</script>
```

上面示例是使用函数式方法来创建一个组件, 还可以使用类的方式

```html
<style>
  .liked {
    background-color: tomato;
  }
</style>
<script>
  const e = React.createElement;
  class likeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        liked: false,
      };
    }
    render() {
      return e(
        'button',
        {
          /* 这是React内部的状态变更函数, 对应 state 这个变量 */
          onClick: () => this.setState({ liked: !this.state.liked }),
          /* 只有通过内部的 setState 函数才能实现动态改变DOM */
          className: this.state.liked ? 'liked' : '',
        },
        'Like'
      );
    }
  }
  /* 这里和函数式渲染略有不同 */
  ReactDOM.render(e(likeButton), document.querySelector('#root'));
</script>
```

## 使用 JSX

引入 babel 用于解析 jsx 语法

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

使用 jsx 语法, 需要在 script 元素上添加`type="text/babel"`属性

```html
<script type="text/babel">
  const e = React.createElement;
  class likeButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        liked: false,
      };
    }
    render() {
      return (
        <button
          onClick={() => this.setState({ liked: !this.state.liked })}
          className={this.state.liked ? 'liked' : ''}
        >
          Liked
        </button>
      );
    }
  }

  function setState(data) {
    console.log('like button click', data);
  }

  /* 调用DOM渲染函数渲染 */
  ReactDOM.render(e(likeButton), document.querySelector('#root'));
</script>
```
