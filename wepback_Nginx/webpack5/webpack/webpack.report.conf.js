/*
 * @Author: huangyingli
 * @Date: 2022-02-21 15:55:04
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 16:13:44
 * @Description: 用于报告打包后项目各依赖大小情况
 */

const prodConfig = require('./webpack.prod.conf');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888, // 运行后的端口号
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info',
      }),
    ],
  })
);

module.exports = webpackConfig;
