/*
 * @Author: huangyingli
 * @Date: 2022-01-14 17:33:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 17:49:55
 * @Description: 
 */
/* 这个用于监听文件变化 */
const chokidar = require('chokidar');
/* 这个用于执行系统命令 */
var exec = require('child_process').exec;

const watcher = chokidar.watch('./test.js');

watcher.on('change', () => {
  console.log('变化')
  exec('browserify test.js -o bound.js')
})