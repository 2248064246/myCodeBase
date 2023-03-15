# browserslist

browserslist 是一个在不同版本之间共享目标浏览器和 Node.js 版本的配置 前端工具

webpack 中的很多 css/js 文件处理工具会访问这个配置来知道需要将 css/js 处理到什么程度, 来适配对应的浏览器环境

一般来说这个配置可以写在`package.json`文件中, 或者单独创建一个 `.browserslistrc`文件

例如: 配置在`package.json`文件中

```json
# defaults 是最佳实践, 对于大多数用于给出了合理的配置.
# 等同于 > 1%, last 2 versions, Firefox ESR, not dead
{ "browserslist": ["defaults"] }
```

也可以自定义

```json
{
  "browserslist": ["last 2 versions", ">0.5%", "ie >=10"]
}
```

也可以根据环境来设置

```json
{
  "browserslist": {
    "production": ["> 1%", "ie 10"],
    "development": ["last 1 chrome version", "last 1 firefox version"]
  }
}
```
