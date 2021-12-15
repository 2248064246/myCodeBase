
# CSSCounterStyle

这是一个新的 css 样式, 用于控制列表的 `list-item` 属性(也就是列表的开头的标志)

在之前这个标志只能选择 `list-item` 自身提供的几个属性

而现在通过 `@counter-style` 可以自定义 `list-item`

## 使用方法

```css
 @counter-style test {
      system: fixed;
      symbols: ❶ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ;
      suffix: "-";
      prefix: '!'
    }
  /* 可以直接在 list-item 中使用 */
  .test1 {
      list-style: test;
  }
```


列表的开头会依次是 `symbols` 中定义的字符


## 可用样式

+ `system`
  + 指定一个算法，用于将计数器的整数值转化为字符串表示。(实际效果是, 不同的算法, 会导致前标的个数不一样)
+ `negative`
  + 指定一个符号，当计数器表示的值为负的时候，把这个符号加在值的前面或后面
+ `prefix`
  + 指定一个符号, 加在标记前面
+ `suffix`
  + 指定一个符号, 加在标记后面
+ `range`
  + 指定一个范围(0<=range <= 列表个数)用于显示标记, 范围之外的回退 `fallback`的样式
+ `fallback`
  + 指定回退样式(和list-item 有一样参数)
+ `pad`
  + 给定最小长度, 以及补全字符(和 String 的 padStart 类似)