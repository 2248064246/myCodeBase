# LazyLoading

[toc]

## 策略

### 代码分割, 按需加载

### 任何类型为 type="module" 的脚本都会默认被延迟

### CSS

### Fonts

默认情况下, 字体请求会延迟到构造渲染树之前, 这可能会导致文本渲染延迟

使用 `rel="preload'` 可以预加载

### images

通过 `loading="lazy"` 属性可以用来指示浏览器延迟加载屏幕外的图像/iframes，直到用户滚动到它们附近

[loading-attribute-polyfill](https://github.com/mfranzke/loading-attribute-polyfill)

> 这个属性正的有用吗....


