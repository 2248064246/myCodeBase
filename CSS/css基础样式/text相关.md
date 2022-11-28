# text 相关

## text-align

设置文本的对其方式

- `start` | `left` 靠左对其
- `end` | `right` 靠右对其
- `center` 居中对其
- `justify` 两端对其(最后一行除外)

## text-align-last

设置文本最后一行的对其方式. (参数和 `text-align` 一致)

## text-decoration

文本装饰属性, 由以下属性组成 `text-decoration-style` `text-decoration-coloe` `text-decoration-line`

**text-decoration-line**

- `none`
- `underline` 下划线
- `overline` 上划线
- `line-throuth` 删除线

> 可以同时指定多个值

```css
/* Multiple keywords */
text-decoration-line: underline overline;
```

**text-decoration-style**

- `solid` 实线
- `double` 双实现
- `dotted` 点状线
- `dashed` 虚线
- `wavy` 波浪线

**text-decoration-color**

### text-decoration-thickness

用于控制`文本装饰线`的厚度

```css
text-decoration-thickness: 3px;
```

### text-underline-offset

用于控制`文本装饰线`的偏移(只影响 `underline`, `overline` 和 `line-through` 不受影响`)

```css
/* Single keyword */
text-underline-offset: auto;

/* length */
text-underline-offset: 0.1em;
text-underline-offset: 3px;
```

### text-underline-position

这个属性能够控制下划线是否能够完全穿过字母(存在一些字母, 在使用下划线时, 无法完全覆盖(字母会长出来))

- `auto`
- `under` (主要是这个属性)

## text-emphasis

用于强调文本的属性, `text-emphasis-style` `text-emphasis-color` 属性组成

**text-emphasis-style**

类型控制

- `filled` 完全填充
- `open` 中空

形状控制

- `dot`
- `circle`
- `double-circle`
- `triangle`
- `sesame`
- `<string>`

**语法**

```css
text-emphasis-style: filled dot;
```

### text-emphasis-position

控制强调属性的显示位置和方向

位置控制

- `over` 文字上面
- `under` 文字下面

方向控制

- `right`
- `left`

## text-indent

文本缩进

## text-overflow

## text-transform

- `none`
- `capitalize` 每个单词首字母大写
- `uppercase` 转为大写字母
- `lowercase` 转为小写字母

## text-shadow

```
text-shadow: x偏移 y偏移 模糊半径 颜色;
```

## text-orientation

用于控制在 `writing-momde` 为非 `horizontal-tb` 时的字母方向 (对于英文字母有效)

例如文字垂直排列时, 可以控制每个字母为竖直方向

- `mixed`
- `upright` 字母直立

```css
writing-mode: vertical-rl;
text-orientation: upright;
```
