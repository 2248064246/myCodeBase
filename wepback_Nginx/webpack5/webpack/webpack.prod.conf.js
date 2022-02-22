/*
 * @Author: huangyingli
 * @Date: 2022-02-22 11:03:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 16:54:06
 * @Description:
 */
const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const TerserPlugin = require('terser-webpack-plugin');

let baseConfig = require('./webpack.base.conf');

let webpackConfig = merge(baseConfig, {
  devtool: 'nosources-source-map',
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    /* 非入口文件的名称 */
    chunkFilename: 'js/chunk/[id].[chunkhash].js',
    // sourceMapFilename: 'sourceMap/[name].[chunkhash].map.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      /* 压缩css */
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'common/vender',
          minChunks: 1,
          priority: -10,
          enforce: true,
        },
        element: {
          chunks: 'initial',
          test: /element-ui/,
          name: 'common/element',
          priority: 10,
        },
        vue: {
          chunks: 'initial',
          test: /vue.*/,
          name: 'common/vue',
          priority: 10,
        },
      },
    },
    // runtimeChunk: {
    //   name: 'common/manifest',
    // },
  },
  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: 'public',
          globOptions: {
            ignore: ['index.html'],
          },
        },
      ],
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // 在这里字符串会被直接解析为代码
      NODE_ENV: JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:7].css',
      chunkFilename: 'css/chunk/[id].[chunkhash:7].css',
    }),
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
              sourceMap: true,
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

module.exports = webpackConfig;
