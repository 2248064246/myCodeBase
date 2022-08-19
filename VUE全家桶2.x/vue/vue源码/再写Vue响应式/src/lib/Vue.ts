/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:39:45
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-19 14:57:28
 * @Description:
 */

import { VueOptions, VueInstance, WatchInstance } from '../interface/Index';
import { mergeOptions } from '../utils/Options';
import { getData, proxy, observe, callHook } from '../utils/Utils';
import { Dep } from './Dep';
import { Watcher } from './Watcher';

type VueEvents = {
  [x: string]: Array<Function>;
};
export class Vue implements VueInstance {
  [x: string]: any;
  $watch: object;
  $data: any;
  $options: VueOptions;
  $computed: object;

  private _events: VueEvents;

  constructor(options: VueOptions) {
    this._events = {};

    this.$options = options;

    mergeOptions(this, this.$options);

    console.log(this.$options);

    let data = this.$options.data;
    this.$data = typeof data === 'function' ? getData(data, this) : data;
    this._init();

    this.$computed = this.$options.computed;
    this._initComputed();

    this.$watch = this.$options.watch;
    this._initWatch();

    callHook(this, 'created');
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
      new Watcher(this, key, this.$watch[key], {
        sync: true,
      });
    }
  }

  private _initComputed(): void;
  private _initComputed() {
    const watchers = Object.create(null);

    for (const key in this.$computed) {
      const userDef = this.$computed[key];
      const getter = typeof userDef === 'function' ? userDef : userDef.get;

      watchers[key] = new Watcher(
        this,
        getter,
        (oldV: any, newV: any) => {
          console.log('计算属性', key, '变化', oldV, newV);
        },
        {
          sync: true,
        }
      );

      if (!(key in this)) {
        Object.defineProperty(this, key, {
          get: function () {
            const result = watchers[key] as WatchInstance;
            if (result) {
              if (Dep.target) {
                /* 这里的目的是为了防止可能有新加入的 属性没有被收集到 */
                result.depend();
              }
              return result.value;
            }
          },
          set: function () {},
        });
      }
    }
  }

  $emit(eventName: string, ...args: any): void {
    let ev = this._events[eventName];
    if (ev) {
      ev.forEach((fn) => {
        fn.call(this, ...args);
      });
    }
  }

  $off(eventName: string | string[], callback?: Function): void {
    if (Array.isArray(eventName)) {
      eventName.forEach((event) => {
        this.$off(event, callback);
      });
    } else {
      let ev = this._events[eventName];
      if (ev) {
        if (callback) {
          /* TODO 这里使用函数名称来对比似乎不太好 */
          let idx = ev.findIndex((f) => f.name === callback.name);
          idx !== -1 && ev.splice(idx, 1);
        } else {
          this._events[eventName] = [];
        }
      }
    }
  }

  $on(eventName: string | string[], callback: Function): void {
    if (Array.isArray(eventName)) {
      eventName.forEach((event) => {
        this.$on(event, callback);
      });
    } else {
      this._events[eventName].push(callback);
    }
  }

  $once(eventName: string | string[], callback: Function): void {
    function on() {
      /* 在这里去除监听 */
    }

    this.$on(eventName, on);
  }
}
