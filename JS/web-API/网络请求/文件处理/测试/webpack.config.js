/*
 * @Author: huangyingli
 * @Date: 2022-07-20 15:22:10
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 21:59:46
 * @Description:
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8089,
    // 将运行进度输出到控制台
    compress: true, // 启动gzip 压缩文件
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    /* 配置index模板 */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
    }),
  ],
};
