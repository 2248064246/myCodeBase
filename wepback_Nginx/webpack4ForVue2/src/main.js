/*
 * @Author: huangyingli
 * @Date: 2022-02-19 14:59:58
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-02-21 22:50:00
 * @Description:
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

console.log('hell webpack');

let a = [[1, [1, 3, 4, 5, [0]]]];

console.log(a.flat(Infinity));

Promise.resolve('true').then((res) => {
  console.log(res);
});

import b from '../public/test';

b();

import $ from 'jquery'

console.log($);

// let g;

import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(ElementUI)

new Vue({
  el: '#app',
  render:h => h(App)
});
