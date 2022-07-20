/*
 * @Author: huangyingli
 * @Date: 2022-07-20 15:24:06
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-07-20 17:02:03
 * @Description:
 */
console.log('hello webpack ts');

import xhrBreakpoint from './xhr'


let xhr = new xhrBreakpoint('http://localhost:8088/fileOne')

xhr.start();

xhr.addEventListener('progress', (res: any) => {
  console.log('进度: ', res.detail)
})

