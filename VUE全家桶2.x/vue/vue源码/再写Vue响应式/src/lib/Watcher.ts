/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:49:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:55:19
 * @Description:
 */
import { VueInstance, WatchInstance } from '../interface/Index';
import { Dep } from './Dep';

export class Watcher implements WatchInstance {
  key: string;
  value: any;
  vm: VueInstance;
  cb: Function;
  constructor(vm: VueInstance, key: string, cb: Function) {
    this.key = key;
    this.vm = vm;
    this.value = this.get();
    this.cb = cb;
  }

  get() {
    /* 在Observer的时候, 能够收集到这个watcher */
    Dep.target = this;

    let value: any;

    try {
      /* 在访问这个属性的时候触发依赖收集 */
      value = this.vm.$data[this.key];
    } finally {
      Dep.target = null;
    }

    return value;
  }

  update(newVal: any): void {
    console.log('正在修改 ', this.key);
    this.cb(this.value, newVal);
  }
}
