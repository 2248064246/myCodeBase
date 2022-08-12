/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:48:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:54:29
 * @Description:
 */

import { DepInstance, WatchInstance } from '../interface/Index';

export class Dep implements DepInstance {
  static target: WatchInstance;

  subs: Array<WatchInstance>;
  constructor() {
    this.subs = [];
  }

  addSub(watcher: WatchInstance) {
    this.subs.push(watcher);
  }

  depend() {
    if (Dep.target) {
      this.addSub(Dep.target);
    }
  }

  notify(newVal: any) {
    this.subs.forEach((watcher) => {
      watcher.update(newVal);
    });
  }
}
