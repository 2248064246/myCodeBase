/*
 * @Author: huangyingli
 * @Date: 2022-02-19 16:36:29
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-19 17:28:14
 * @Description:
 */
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseConfig, {
  devServer: {
    host: 'localhost',
    port: 8080,
    // 将运行进度输出到控制台
    progress: true,
    contentBase: path.resolve(__dirname, '../devServer'),
    compress: true, // 启动gzip 压缩文件
    hot: true,
    open: true,
    proxy: {},
  },
});

module.exports = webpackConfig;
