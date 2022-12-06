# @media

根据一个或多个媒体查询的结果应用部分样式表。使用它，您可以指定一个媒体查询和一个 CSS 块，当且仅当媒体查询与正在使用内容的设备匹配时才应用于文档.

## 媒体类型

[meida queries level 4](https://drafts.csswg.org/mediaqueries/#media-types)

- `all`
- `print`
- `screen`

## 可以检测的特性

**常用**

- `width`

  用于测试视口的宽度

  **min-width 视口的最小宽度 (视口大于指定宽度时生效)**

  **max-width 视口的最大宽度 (视口小于指定宽度时生效)**

  ```css
  /* Exact width */
  @media (width: 360px) {
    div {
      color: red;
    }
  }

  /* Minimum width */
  @media (min-width: 35rem) {
    div {
      background: yellow;
    }
  }

  /* Maximum width */
  @media (max-width: 50rem) {
    div {
      border: 2px solid blue;
    }
  }
  ```

- `height`

  同 `width`

- `hover`

  用于测试用户的主要输入机制是否可以将鼠标悬停在元素上

  ```html
  <a href="#">Try hovering over me!</a>
  ```

  ```css
  /* default hover effect */
  a:hover {
    color: black;
    background: yellow;
  }
  @media (hover: hover) {
    /_ when hover is supported _/ a:hover {
      color: white;
      background: black;
    }
  }
  ```

- `any-hover`
  用于测试任何可用的输入机制是否可以将鼠标悬停在元素上

  ```html
  <a href="#">Try hovering over me!</a>
  ```

  ```css
  @media (any-hover: hover) {
    a:hover {
      background: yellow;
    }
  }
  ```

- `aspect-ratio`

  视口的宽高横纵比

- `prefers-color-scheme`

  检测用户现在的主题

  - `light`
  - `dark`

  > 通过这个媒体查询, 可以快速是现实主题切换

- ...

## 逻辑

- `and`
- `or` | `,`
- `not`
- `only`

## 安全

由于媒体查询提供了对用户正在使用的设备的功能（以及扩展的特征和设计）的洞察，因此它们有可能被滥用来构建识别设备的“指纹”，或者至少将其分类到用户可能不希望的某种程度的细节。

由于这种可能性，浏览器可能会选择以某种方式伪造返回值，以防止它们被用于精确识别计算机。浏览器也可能在这方面提供额外的措施
