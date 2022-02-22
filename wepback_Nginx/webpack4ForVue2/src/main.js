/*
 * @Author: huangyingli
 * @Date: 2022-02-22 09:30:26
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-22 13:55:57
 * @Description:
 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
console.log('hello webpack');

console.log('你好啊');

import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/style/index.css';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: (h) => h(App),
});

console.log($);
