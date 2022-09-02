# Context

在 React 中, 数据通过 props 属性自上而下进行传递, 但是这种做法对某些类型的属性而言是及其烦琐的, 这些属性是应用中很多组件都需要的. Context 提供了一种在组件之间共享此类值的方式, 而不必显示地通过 props 进行传递

## 如何使用 Context

```js
/* 这里会初始化一个初始值, 这个值可以是任意类型 */
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    /* xxx.Provider 可以重新设置给定的初始值 */
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

/* 中间组件不用指明要向下传递的值 */
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  /* 在后续的组件中, 通过获取 ThemeContext 就能获取到这个全局值 */
  /* 在这个例子中, 值是 `dark` */
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context}>
  }
}

```

有一个点需要注意: React 会往上找到最近的 Provider，然后使用它的值。如果没有才会使用默认值.

> 注意: 如果传递 undefined 给 Provider, 默认值不会生效.

## Context.Consumer

获取 Context 还可以通过 `Consumer`来实现

```js
class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          return <Button theme={value} />;
        }}
      </ThemeContext.Consumer>
    );
  }
}
```

## 动态 Context

通过给 Provider 的 value 设置为 state 的值来实现动态 Context

为了方便修改 state 值, 可以通过在 value 中提供操作函数来实现

```js
this.state = {
  value: 'dark',
  toggleTheme: () => {
    this.setState((state) => {
      return {
        value: state.value === 'dark' ? 'default' : 'dark',
      };
    });
  },
};
```

## 多个 Context

```html
<ThemeContext.Provider value="{theme}">
  <UserContext.Provider value="{signedInUser}">
    <Layout />
  </UserContext.Provider>
</ThemeContext.Provider>
```

```js
function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}
// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => <ProfilePage user={user} theme={theme} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

## 使用 Context 之前的考虑

Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据. 请谨慎使用, 应为这会使得组件的复用性变差.

在一些简单的传递中, 可以使用`组件组合`, 通过向下层传递组件而不是数据来实现数据的向下传递

```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}
```

在这种情况下需要将子组件和直接关联的父组件解耦. 如果子组件需要在渲染前和父组件进行一些交流, 可以进一步通过 props 来实现

## 注意事项

`Provider` 的 value 会根据浅比较来判断值是否改变. 这里会存在一些陷阱.

下面这个代码在每次 Provider 重新渲染是, 都会导致它下面的所有的组件重新渲染

```js
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{ something: 'something' }}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
```

为了防止这种状态, 将 value 状态提升到父节点的 state 里;


