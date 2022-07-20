/*
 * @Author: huangyingli
 * @Date: 2022-07-20 15:24:06
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 22:05:54
 * @Description:
 */
console.log('hello webpack ts');

import xhrBreakpoint from './xhr';

let xhr = new xhrBreakpoint('http://localhost:8088/fileOne');

// xhr.start();

xhr.addEventListener('progress', (res: any) => {
  console.log('进度: ', res.detail);
});

xhr.addEventListener('stop', () => {
  console.log('暂停');
  console.log('当前进度: ', xhr.progress);
});

xhr.addEventListener('abort', () => {
  console.log('终止');
});

let start = document.getElementById('start');
let stop = document.getElementById('stop');
let abort = document.getElementById('abort');
let restart = document.getElementById('restart');

start.addEventListener('click', () => {
  xhr.start();
});

stop.addEventListener('click', () => {
  xhr.stop();
});
abort.addEventListener('click', () => {
  xhr.abort();
});

restart.addEventListener('click', () => {
  xhr.restart();
});
