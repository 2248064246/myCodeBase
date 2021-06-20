

# 支持 TS

## 需要 ts-loader typescript

注意 webpack4 支持 ts-loader@8

`npm i -D ts-loader@8 typescript`

可以运行 `npx tsc --init` 来穿件默认 TS 配置文件(记得将 `allowJS` 设置为 `true`)

```javaScript
 {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [{
      loader: 'ts-loader'
    }]
},

```

可以配置一下文件名扩展

```javaScript
module.exports = {
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
}
```

