/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:36:01
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:55:57
 * @Description:
 */

import { Vue } from './lib/Vue';

console.log('hello Vue ');

const vm = new Vue({
  data: {
    a: 123,
    b: {
      c: 456,
    },
  },
  watch: {
    a(oldV: any, newV: any) {
      console.log('改变', oldV, newV);
    },
  },
});

console.log(vm.$data.a);


vm.$data.a = '9999'