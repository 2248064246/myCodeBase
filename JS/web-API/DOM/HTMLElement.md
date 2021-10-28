
# HTMLElement 

HTMLElement 接口表示所有的 HTML 元素。一些HTML元素直接实现了HTMLElement接口，其它的间接实现HTMLElement接口.

## 属性

+ `accessKey`
  + 获取或者设置元素快捷键, 用户通过敲击这个键把焦点跳转到这个元素上
  + 这个属性很少使用，因为它很容易与现代浏览器自带的快捷键冲突。为了解决这个问题，浏览器约定accessKey键与特定按键一起按（比如 Alt + accessKey）来生效快捷键行为。
+ `contentEditable`
  + 获取设置元素的可编辑状态("true", "false")
  + 位于 document 上的 `designMode` 是针对整个 document, 而`contentEditable` 则是针对单前元素的
+ `isContentEditable`
  + 返回一个Boolean, 表示当前元素是否可编辑
+ `dataset`
  + 提供了读写自定义data属性的功能(data-*)
  + 在HTML中data属性通过 `-`连接, 而在JS总, 则是驼峰形式
    ```js
      <div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe</div>
      const el = document.querySelector('#user');
      // el.id === 'user'
      // el.dataset.id === '1234567890'
      // el.dataset.user === 'johndoe'
      // el.dataset.dateOfBirth === ''
    ```
+ `dir`
+ `hidden`
  + 用于控制文档的隐藏和显示(页面上不会显示该元素, 且不占据空间, 但是DOM结构依旧存在)
+ `offsetHeight`
+ `offsetWidth`
+ `offsetTop`
+ `offsetLeft`
+ `offsetParent`
+ `style`
+ `tabIndex`
  + 获取或者设置元素的tab键控制次序
+ `title`
  
## 方法

+ `blur()`
+ `click()`
+ `focus()`

