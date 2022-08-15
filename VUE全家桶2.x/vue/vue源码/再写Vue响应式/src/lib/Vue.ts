/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:39:45
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-15 14:07:18
 * @Description:
 */

import { VueOptions, VueInstance, WatchInstance } from '../interface/Index';
import { getData, proxy, observe } from '../utils/Utils';
import { Dep } from './Dep';
import { Watcher } from './Watcher';

export class Vue implements VueInstance {
  [x: string]: any;
  $watch: object;
  $data: any;
  $options: VueOptions;
  $computed: object;

  constructor(options: VueOptions) {
    this.$options = options;

    let data = this.$options.data;
    this.$data = typeof data === 'function' ? getData(data, this) : data;
    this._init();

    this.$computed = this.$options.computed;
    this._initComputed();

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

  private _initComputed(): void;
  private _initComputed() {
    const watchers = Object.create(null);

    for (const key in this.$computed) {
      const userDef = this.$computed[key];
      const getter = typeof userDef === 'function' ? userDef : userDef.get;

      watchers[key] = new Watcher(this, getter, (oldV:any, newV:any) => {
        console.log('计算属性', key, '变化', oldV, newV)
      });

      if(!(key in this)) {
        Object.defineProperty(this, key, {
          get: function() {
            const result = watchers[key] as WatchInstance
            if(result) {
              if(Dep.target) {
                /* 这里的目的是为了防止可能有新加入的 属性没有被收集到 */
                result.depend();
              }
              return result.value;
            }
          },
          set: function () {}
        })
      }
    }
  }
}
