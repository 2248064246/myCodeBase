/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:36:01
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-15 10:52:33
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
    b(oldV: any, newV: any) {
      console.log('改变b', oldV, newV);
    },
  },
  computed: {
    name() {
      return this.a + this.b;
    },
  },
});

console.log(vm.$data.a);

vm.$data.a = '9999';

vm.$data.b = 'xxx';

console.log(vm.$data.b);

console.log(vm.a, vm.b);

console.log(vm.name);
