
# CommonJS

这里我们主要关注如何在 浏览器端运行 CommonJS 规范的库


## Browserify

这个能够将 CommonJS 规范的文件转为 浏览器能够运行的文件

```
npm install -g browserify

browserify main.js -o bundle.js
```

在浏览器中使用
```html
<script src="bundle.js"></script>
```


## 

