# Fragments

React 中的一个常见模式是一个组件中返回多个元素. Fragments 允许你将一个子列表分组, 而无需向 DOM 添加额外元素.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}

```


## Fragment 中的 key

如果通过数组来渲染一组Fragment, 那么key是必须的

key属性也是 Fragment 唯一接受的属性