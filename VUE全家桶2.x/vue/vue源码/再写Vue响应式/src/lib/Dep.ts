/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:48:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-23 10:29:09
 * @Description:
 */

import { DepInstance, WatchInstance } from '../interface/Index';
let uid = 0;

export class Dep implements DepInstance {
  static target: WatchInstance;

  subs: Array<WatchInstance>;
  id: number;
  constructor() {
    this.subs = [];
    this.id = ++uid;
  }

  addSub(watcher: WatchInstance) {
    console.log('dep添加 watcher', watcher)
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
    console.log('通知watcher更新', this.subs)
    this.subs.forEach((watcher) => {
      watcher.update(newVal);
    });
  }
}
