/*
 * @Author: huangyingli
 * @Date: 2022-02-22 09:29:13
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 14:17:51
 * @Description:
 */

const path = require('path');
const { merge } = require('webpack-merge');
const DefinePlugin = require('webpack').DefinePlugin;
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const portfinder = require('portfinder');
let baseConfig = require('./webpack.base.conf');

let webpackConfig = merge(baseConfig, {
  devServer: {
    host: 'localhost',
    port: 8080,
    // 将运行进度输出到控制台
    progress: false,
    contentBase: false,
    compress: true, // 启动gzip 压缩文件
    hot: true,
    // open: true,
    proxy: {},
    quiet: true,
    noInfo: true,
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  /* 开发环境取消设置文件过大警告 */
  performance: {
    hints: 'warning', // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // 在这里字符串会被直接解析为代码
      NODE_ENV: JSON.stringify('development'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // 开发模式下可以启用源码映射
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
    ],
  },
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || webpackConfig.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      webpackConfig.devServer.port = port;
      webpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${webpackConfig.devServer.host}:${port}`,
            ],
          },
          onErrors: function (severity, errors) {
            // 可以收听插件转换和优先级的错误
            // 严重性可以是'错误'或'警告'
            if (severity !== 'error') {
              return;
            }
            const error = errors[0];
            const filename = error.file && error.file.split('!').pop();
            notifier.notify({
              title: 'Webpack error',
              message: severity + ': ' + error.name,
              subtitle: filename || '',
              icon: path.resolve(__dirname, './webpack.jpg'),
            });
          },
          //是否每次编译之间清除控制台
          //默认为true
          clearConsole: true,
        })
      );

      resolve(webpackConfig);
    }
  });
});
