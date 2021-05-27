
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

需要用到 `style-loader@2` `css-loader@5` `mini-css-extract-plugin` `postcss-loader@4` `css-minimizer-webpack-plugin@1` 

css-loader 用于处理 `@import` `url` 这种语法

```javaScript
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {

  // 优化css
  optimization: {
    minimize: true,
    minimizer: [ // 优化项目

      new CssMinimizerPlugin() // 压缩css, 并且清除注释
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

## 使用 babel 处理 js

+ 方案一:  需要 

  `babel-loader@8`

  `@babel/preset-env@7` 

  `@babel/plugin-transform-runtime@7`

  `@babel/plugin-syntax-dynamic-import@7`

  `@babel/polyfill@7`

  `@babel/core@7`

  ```javaScript
  module.exports = {
    entry: {
      // 需要在入口配置 @babel/polyfill
      polyfill: '@babel/polyfill',
      main: './src/main.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/, // 排除node_modules 库文件
          use: [{
            loader: 'babel-loader'
          }]
        }
      ]
    }
  }
  ```

  配置 `.babelrc.js` 文件

  ```javaScript
  module.exports = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      // 这个用于处理 class 的装饰器 @log (实际上这个JS功能还处于实验室阶段)
      ["@babel/plugin-proposal-decorators", {
        "legacy": true // 这里使用这个模式, 下面 必须使用 loose: true
        // https://babel.docschina.org/docs/en/next/babel-plugin-proposal-decorators/
      }],
      // 这个用于处理class语法
      ["@babel/plugin-proposal-class-properties", {
        "loose": true // 宽松模式
      }],
      "@babel/plugin-transform-runtime",
      "@babel/plugin-syntax-dynamic-import", // 动态语法导入插件
    ]
  }
  ```

+ 方案2: 使用 `core-js@3`

  修改 `.babelrc.js`
  ```javaScript
    module.exports = {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: "entry", // or "usage"
          corejs: 3,
        }]
      ],
      plugins: [
        // 这个用于处理 class 的装饰器 @log (实际上这个JS功能还处于实验室阶段)
        ["@babel/plugin-proposal-decorators", {
          "legacy": true // 这里使用这个模式, 下面 必须使用 loose: true
          // https://babel.docschina.org/docs/en/next/babel-plugin-proposal-decorators/
        }],
        // 这个用于处理class语法
        ["@babel/plugin-proposal-class-properties", {
          "loose": true // 宽松模式
        }],
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import", // 动态语法导入插件
      ]
    }
  ```

  `webpack.config.js` 中不需要引入 `@babel/polyfill`

  需要 `main.js` 中引入
  ```javaScript
    import './style/common.less'
    import './style/body.css'
  ```
## 处理字体文件

需要 `file-loader`

```javaScript

{
  test: /\.(woff|woff2|eot|ttf|otf)$/i, // 这里需要忽略大小写
  use: {
    loader: "file-loader",
    options: {
      outputPath: 'fonts/',
       name(file) {
        if (process.env.NODE_ENV === 'development') {
          return '[name].[ext]'
        }

        return '[name].[hash:7].[ext]' // 截取 8 为 hash
      },
    }
  }, // url-loader 也可以用来解析字体
},

```

## 处理图片

1. 使用 `file-loader` 处理

  ```javaScript
  {
    test: /\.(png|jpe?g|gif|webp|svg)/,
    loader: 'file-loader', // 会将对应的文件处理下(改变文件名, 并将文件复制放入指定目录下)
    options: {
      // name: '[path][name].[ext]'
      // name: 文件名
      // ext: 文件扩展名
      // path: 出口路径
      // hash: 文件的hash
      // name 可以是一个函数
      name(file) {
        if (process.env.NODE_ENV === 'development') {
          return '[name].[ext]'
        }
        return '[name].[hash:7].[ext]' // 截取 8 为 hash
      },
      outputPath: 'images/', // 会将图片放到出口目录下的 images 文件下
      esModule:false, // 此项是为了不和 `html-withimg-loader` 冲突
    }
  },
  ```

2. 使用 `url-loader` 处理
   ```javaScript
    {
      test: /\.(png|jpe?g|gif|webp|svg)/,
      loader: 'url-loader', // 会将对应的文件处理下(改变文件名, 并将文件复制放入指定目录下)
      options: {
        esModule: false,
        limit: 10000,
        name(file) {
          if (process.env.NODE_ENV === 'development') {
            return '[name].[ext]'
          }
          return 'images/[name].[hash:7].[ext]' // 截取 8 为 hash
        },
      }
    },
   ```
  
## 处理音频视频文件

  ```javaScript
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'file-loader',
      options: {
         name(file) {
          if (process.env.NODE_ENV === 'development') {
            return '[name].[ext]'
          }
          return '[name].[hash:7].[ext]' // 截取 8 为 hash
        },
        outputPath: 'media/'
      }
    },
  ```

## 处理 html 模板中的 img 标签

需要 `html-withimg-loader` 

```javaScript

  {
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader'
  }

```
