/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:48:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-18 14:42:57
 * @Description:
 */

import { DepInstance, WatchInstance } from '../interface/Index';
let uid = 0;

export class Dep implements DepInstance {
  static target: WatchInstance;

  subs: Array<WatchInstance>;
  id: Number;
  constructor() {
    this.subs = [];
    this.id = ++uid;
  }

  addSub(watcher: WatchInstance) {
    this.subs.push(watcher);
  }

  removeSub(watcher: WatchInstance) {
    let idx = this.subs.findIndex((w) => w.id === watcher.id);
    if (idx !== -1) {
      this.subs.splice(idx, 1);
    }
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify(newVal: any) {
    this.subs.forEach((watcher) => {
      watcher.update(newVal);
    });
  }
}
