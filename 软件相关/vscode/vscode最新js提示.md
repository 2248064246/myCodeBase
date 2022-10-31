## 如何为最新 js 开启提示

**方法 1:**

在设置中搜索`target`, 然后给`JS/TS>Implicit Project Config: Target`选择`ESNext`

**方法 2:**

直接在`setting.json` 中设置`"js/ts.implicitProjectConfig.target": "ESNext"`,

**方法 3:**

在项目中添加`jsconfig.json`文件, 然后添加如下配置:

```json
"compilerOptions": {
    "target": "ESNext"
}
```

> 需要注意: jsconfig.json 配置拥有最高优先级


