/*
 * @Author: huangyingli
 * @Date: 2022-02-22 09:29:13
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 14:09:49
 * @Description:
 */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader');

let webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  stats: 'minimal',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    /* 配置index模板 */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
    }),
    new ESLintPlugin(),
    new ProvidePlugin({
      $: 'jquery', // 会自动加载 `jquery`, 而不需要手动import
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 这里需要忽略大小写
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name() {
                return '[name].[hash:7].[ext]'; // 截取 8 为 hash
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img/',
              name() {
                return '[name].[hash:7].[ext]'; // 截取 8 为 hash
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'media/',
              name() {
                return '[name].[hash:7].[ext]'; // 截取 8 为 hash
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
};

module.exports = webpackConfig;
