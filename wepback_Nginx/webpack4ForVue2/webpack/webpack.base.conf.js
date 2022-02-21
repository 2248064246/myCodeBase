/*
 * @Author: huangyingli
 * @Date: 2022-02-19 14:56:43
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 00:02:09
 * @Description:
 */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const ProvidePlugin = require('webpack').ProvidePlugin;
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader');
function isDev() {
  return process.env.NODE_ENV === 'development';
}
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

  mode: isDev() ? 'development' : 'production',

  /* 只显示警告错误的统计信息 */
  stats: 'minimal',

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
    // 在引入文件没有写扩展名的时候, 可以在这里匹配
    extensions: ['.js', '.css', '.vue', '.html', '.less', '.ts', '.tsx'],
  },

  plugins: [
    /* 配置index模板 */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new ESLintPlugin({
      cache: true
    }),
    // new ProvidePlugin({
    //   // $: 'jquery', // 会自动加载 `jquery`, 而不需要手动import
    // }),
    new WebpackBar(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
      chunkFilename: 'css/chunk/[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(le|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev(), // 开发模式下可以启用源码映射
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
        use: [
          {
            loader: 'file-loader',

            options: {
              outputPath: 'fonts/',
              name() {
                if (isDev()) {
                  return '[name].[ext]';
                }

                return '[name].[hash:7].[ext]'; // 截取 8 为 hash
              },
            },
          },
        ],
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
          name() {
            if (isDev()) {
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
          name() {
            if (isDev()) {
              return '[name].[ext]';
            }
            return '[name].[hash:7].[ext]'; // 截取 8 为 hash
          },
          outputPath: 'media/',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // {
          //   loader: 'cache-loader',
          // },
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
