/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:39:45
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:51:39
 * @Description:
 */

import { VueOptions, VueInstance } from '../interface/Index';
import { getData, proxy, observe } from '../utils/Utils';
import { Watcher } from './Watcher';

export class Vue implements VueInstance {
  $watch: object;
  $data: any;
  $options: VueOptions;

  constructor(options: VueOptions) {
    this.$options = options;

    let data = this.$options.data;
    this.$data = typeof data === 'function' ? getData(data, this) : data;
    this._init();

    this.$watch = this.$options.watch;

    this._initWatch();
  }

  private _init(): void;
  private _init() {
    /* 将 $data 中的值代理到 this 上 */
    for (const key in this.$data) {
      if (!(key in this)) {
        proxy(this, '$data', key);
      }
    }

    /* 观察$data */
    observe(this.$data);
  }

  private _initWatch(): void;
  private _initWatch() {
    for (const key in this.$watch) {
      new Watcher(this, key, this.$watch[key]);
    }
  }
}
