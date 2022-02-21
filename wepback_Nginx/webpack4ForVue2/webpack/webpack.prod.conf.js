/*
 * @Author: huangyingli
 * @Date: 2022-02-19 15:16:33
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-21 11:35:57
 * @Description:
 */

const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(baseConfig, {
  devtool: 'nosources-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    /* 非入口文件的名称 */
    chunkFilename: 'js/chunk/[id].[chunkhash].js',
  },

  optimization: {
    minimize: true,
    minimizer: [
      /* 压缩css */
      new CssMinimizerPlugin(),
      new UglifyJsPlugin({
        // 优化JS的, 将js压缩, 开启了css的优化, 这个必须手动开启
        cache: true, // 是否使用缓存
        parallel: true, // 并发打包
        sourceMap: true, // 是否使用源码映射
      }),
    ],
    splitChunks: {
      // 分割代码块
      cacheGroups: {
        // 缓存组
        common: {
          // 公共模块
          // minSize: 3, // 代码大于这个就抽离
          minChunks: 1, // 只要被 引用 一次以上就抽离
          chunks: 'initial', //
          name: 'name',
        },
        vendor: {
          priority: 1, // 优先权, 有限处理这里的
          test: /node_modules/,
          minChunks: 1, // 只要被 引用 一次以上就抽离
          chunks: 'initial', //
          name: 'common',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
      chunkFilename: 'css/chunk/[id].css',
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: 'public',
      },
    ]),
  ],
  module: {},
});

module.exports = webpackConfig;
