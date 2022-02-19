/*
 * @Author: huangyingli
 * @Date: 2022-02-19 14:56:43
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-19 17:32:48
 * @Description:
 */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

// const isDev = process.env.NODE_ENV === 'development';
const isDev = true;

module.exports = {
  /* 设置入口起点位置 */
  context: path.resolve(__dirname, '../'),
  /* 设置入口 */
  // entry: ['../src/main.js'],
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },

  mode: isDev ? 'development' : 'production',

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    // 在引入文件没有写扩展名的时候, 可以在这里匹配
    extensions: ['.js', '.css', '.vue', '.html', 'less', 'ts'],
  },

  plugins: [
    /* 配置index模板 */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new ESLintPlugin(),
    new ProvidePlugin({
      $: 'jquery', // 会自动加载 `jquery`, 而不需要手动import
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../public'),
    //     to: path.resolve(__dirname, '../dist'),
    //   },
    // ]),
    // 友好的终端错误显示方式
    // new FriendlyErrorsWebpackPlugin({
    //   compilationSuccessInfo: {
    //     messages: [`Your application is running here: http://localhost:8085`],
    //   },
    //   onErrors: function (severity, errors) {
    //     // 可以收听插件转换和优先级的错误
    //     // 严重性可以是'错误'或'警告'
    //     if (severity !== 'error') {
    //       return;
    //     }
    //     const error = errors[0];
    //     notifier.notify({
    //       title: 'Webpack error',
    //       message: severity + ': ' + error.name,
    //       subtitle: error.file || '',
    //       // icon: ICON
    //     });
    //   },
    //   //是否每次编译之间清除控制台
    //   //默认为true
    //   clearConsole: true,
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev, // 开发模式下可以启用源码映射
            },
          },
          {
            loader: 'postcss-loader', // 用来处理css的兼容
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 这里需要忽略大小写
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            name(file) {
              if (isDev) {
                return '[name].[ext]';
              }

              return '[name].[hash:7].[ext]'; // 截取 8 为 hash
            },
          },
        },
      },
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
            if (isDev) {
              return '[name].[ext]';
            }
            return '[name].[hash:7].[ext]'; // 截取 8 为 hash
          },
          outputPath: 'img/', // 会将图片放到出口目录下的 images 文件下
          esModule: false, // 此项是为了不和 `html-withimg-loader` 冲突
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name(file) {
            if (isDev) {
              return '[name].[ext]';
            }
            return '[name].[hash:7].[ext]'; // 截取 8 为 hash
          },
          outputPath: 'media/',
        },
      },
    ],
  },
};
