
# 搭建webpack 4 环境

## 起步

生成 package.json 文件
> npm init

安装 `webpack`
> npm i webpack@4 webpack-cli@4 webpack-dev-server@3 webpack-merge@5 --save

在根路径下创建 `webpack.config.js` 文件
```javaScript
module.exports = {
  mode: 'development',
  entry: './src/main.js',

  output: {
    filename: '[name].js',
    path: __dirname + '/dist' // path 需要是绝对路径
  }
}
```

在根路径下创建 `src`, `dist` 目录, 并在 `src` 创建 `main.js` 入口文件

在 `package.json` 中的 `scripts` 对象里面写入指令
```javaScript
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

运行 `npm run build`

## 自动将打包文件写入 html 模板中

需要 `html-webpack-plugin@3` 这个插件 (webpack4貌似支持 html-webpack-plugin@4)

```javaScript
let HtmlWebpackPlugin = require('html-webpack-plugin')
 module.exports = {
    plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 静态服雾的模板文件
      filename: 'index.html', //// 将output的文件写入模板html之后, 名字还是叫index.html
      minify: { // 这个适用于生产环境下的配置
        removeAttributeQuotes: true, // 去除html文档中的属性的双引号
        collapseWhitespace: true, // 折叠空行, 把html文档变成一行
        keepClosingSlash: true, // 保持标签的关闭赋 '/'
        removeComments: true, // 移除注释
        removeRedundantAttributes: true, // 删除冗余属性
        removeScriptTypeAttributes: true, // 删除脚本类型属性
        removeStyleLinkTypeAttributes: true, // 删除链接类型属性
        useShortDoctype: true
      },
      hash: true, // 会给引入html的文件加上hash查询参数, 例如: a.css?xxx
    })
  ]
 }
```

## 每次打包时自动清除 `dist` 目录下的所有文件

需要 `clean-webpack-plugin@3`
```javaScript
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

## 支持 `css`

需要用到 `style-loader` `css-loader` `mini-css-extract-plugin` `postcss-loader@4` `cssnano`

css-loader 用于处理 `@import` `url` 这种语法

```javaScript
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')

module.exports = {

  // 优化css
  optimization: {
    minimizer: [ // 优化项目
      new OptimizeCss({ // css优化
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      }) // 在生产环境下, 会把css压缩为1行
    ]
  },

  plugins: [
    // 使用这个插件抽离 css 为外部文件, 会合并为一个 css 文件
    new MiniCssExtractPlugin({
      filename: 'style/[name].css', // 可以在这里指定文件目录
      // 这里 name 指的是入口文件的名字,
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // 开发模式下可以启用源码映射
            }
          },
          {
            loader: 'postcss-loader' // 用来处理css的兼容
            // 需要定义 postcss.config.js 文件, 来制定postcss-loader的处理方式
          }
        ]
      }
    ]
  }
}

```

### postcss.config.js 文件

需要 `autoprefixer@10`

```javaScript

module.exports = {
  plugins: [
    // 兼容浏览器，添加前缀
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions', // 所有主流浏览器最近2个版本
        '>1%' // 兼容市场大于 1% 份额的浏览器
      ]
    }),
  ],
  sourceMap: true
}

```

### 支持 `less`

需要 `less-loader@7` `less@4`

```javaScript
module: {
  rules: [{
    test: /\.(le|c)ss$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'less-loader'
      }
    ]
  }]
}
```

## 





