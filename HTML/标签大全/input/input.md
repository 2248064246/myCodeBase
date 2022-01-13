
# Input

+ 空元素
+ 单标签
+ 任何元素可以包含

## type 属性

> input 的工作方式相当程度取决于 type 属性的值

`button`
  + value 属性用于设置按钮的文字

`checkbox`
  + 复选框
  + 注意与 `<label>`标签的配置使用
  + 常用属性
    + value 指定input的值
    + checked 指定默认选中

`color`
  + 颜色选择器, 在支持的浏览器上会弹出对应的颜色选择器弹框
  + 常用属性
    + value 指定默认颜色

`date`
  + 输入日期控件
  
`datetime-local`
  + 输入日期和时间的控件, 不包括时区

`email`

`file`
  + 选择文件控件
  + 使用 accept 属性规定控件能选择的文件类型
  + 唯一文件类型说明符
    + 以'.'开头的合法的不区分大小写的文件扩展名, 如`.jpg,.png`
    + MIMe 类型字符串
    + 字符串 image/*，表示 “任何图片文件”, 等...
  + multiple 指定是否允许多选
  + files 一个FileList 对象, 表示选择的文件
  
`hidden`
  + 不显示的控件, 其值仍然会提交到服务器

`image`
  + 带图像的submit按钮
  + 图像有 src 属性规定, 同样拥有 alt

`month`
  + 输入年和月的控件, 没有时区

`number`
  + 数字输入控件

`password`
  + 单行文本区域, 值会被覆盖

`radio`
  + 单选按钮

`range`
  + 范围组件

`reset`
  + 重置按钮

`search`
  + 用于搜索字符串的单行文字区域。输入文本中的换行会被自动去除。

`submit`
  + 提交按钮

`tel`
  + 电话号码控件

`text`

`time`
  + 用于输入时间的控件, 不包括时区

`url`
  + 用于输入url的控件

`week`
  + 用于输入以年和周数组成的日期, 不带时区

## 其余属性

`accept` 
  + 用于 file

`alt`
  + 用于 image

`autocomplete`
  + 表单的自动填充功能

`autofocus`
  + 页面加载时自动聚焦到此表单控件

`capture`
  + 用于file, 表示使用媒体拍摄方式获取文件(打开摄像头)

`checked`
  + 用于 radio, checkbox

`disabled`

`form`
  + 将控件和一个form元素联系在一起

`max`
  + 用于 number

`min`
  + 用于 number

`maxlength`
  + text, tel, url, search, password

`minlength`
  + 同maxlength

`multiple`
  + file, email, 允许多个值

`name`

`pattern` 
  + password, test, tel, data 等, 匹配有效value模式

`placeholder`

`readonly`

`required`

`size`

`src`

`step`
  + number

`type`

`value`

