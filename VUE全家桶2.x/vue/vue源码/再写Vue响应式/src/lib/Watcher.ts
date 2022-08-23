/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:49:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-23 11:17:29
 * @Description:
 */
import { nextTick } from 'process';
import {
  DepInstance,
  VueInstance,
  WatchInstance,
  WatchOptions,
} from '../interface/Index';
import { callHook, parsePath } from '../utils/Utils';
import { Dep } from './Dep';

let uid = 0;

export class Watcher implements WatchInstance {
  getter: Function | undefined;
  value: any;
  vm: VueInstance;
  cb: Function;
  deps: Array<DepInstance>;
  sync: Boolean;
  newDeps: Array<DepInstance>;
  id: number;
  before?: Function;
  constructor(
    vm: VueInstance,
    expOrFunc: string | Function,
    cb: Function,
    options?: WatchOptions
  ) {
    /* 这边这个是function是应为computed的缘故 */
    /* 需要对computed做处理 */
    if (typeof expOrFunc === 'function') {
      this.getter = expOrFunc;
    } else {
      this.getter = parsePath(expOrFunc);
    }
    this.vm = vm;
    this.id = ++uid;
    this.cb = cb;
    this.deps = [];
    this.newDeps = [];
    if (options) {
      this.sync = typeof options.sync === 'boolean' ? options.sync : true;
      this.before =
        typeof options.before === 'function' ? options.before : undefined;
    }

    /* 这个需要最后获取 */
    this.value = this.get();
  }

  get() {
    /* 在Observer的时候, 能够收集到这个watcher */
    Dep.target = this;

    let value: any;
    try {
      /* 在访问这个属性的时候触发依赖收集 */
      value = this.getter.call(this.vm, this.vm);
      console.log('value', value);
    } catch (e) {
      console.log('watcher get 错误', e);
    } finally {
      Dep.target = null;
      /* 清除旧的依赖, 使用新收集依赖替换 */
      this.cleanupDeps();
    }

    return value;
  }

  update(newVal: any): void {
    console.log('触发update');
    if (this.sync) {
      this.run();
    } else {
      /* 在这里执行组件更新操作 */
      console.log('更新组件');
      queueWatcher(this);
    }
  }

  run() {
    console.log('执行watcher回调');
    /* 在这里不能使用newVal, 必须使用 get 方法获取新的值 */
    /* 最主要的原因是 computed 中的返回值可能是多个属性的叠加结果 */
    /* 必须用get方法获取新值 */
    const value = this.get();
    const oldValue = this.value;
    this.value = value;
    this.cb(this.value, oldValue);
  }

  depend() {
    /* 这里最大的作用是用在 computed 中 */
    /* 将computed中的用到的属性再做一次收集 */
    /* 是要进行一次过滤, 过滤已有的依赖项 */
    this.deps.forEach((dep) => {
      dep.depend();
    });
  }

  addDep(dep: DepInstance) {
    console.log('依赖收集', dep);
    const id = dep.id;
    /* 判断新收集的dep中是否已经存在这个dep */
    if (!this.newDeps.find((d) => d.id === id)) {
      console.log('不存在这个依赖');
      this.newDeps.push(dep);
      if (!this.deps.find((d) => d.id === id)) {
        // /* 将对应dep收集到watcher中 */
        // this.deps.push(dep);
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    this.deps.forEach((dep) => {
      /* 如果新收集的依赖中不存在原来的依赖, 则去除(同时去除dep中保存的watcher) */
      if (!this.newDeps.find((d) => d.id === dep.id)) {
        dep.removeSub(this);
      }
    });
    this.deps = this.newDeps;
    this.newDeps = [];
  }
}

let queue: Array<WatchInstance> = [];
let waiting: boolean = false;
let flushing: boolean = false;
let has: { [key: number]: boolean } = {};
let curTimestamp: number;

function queueWatcher(watcher: WatchInstance) {
  const id: number = watcher.id;
  if (has[id] == undefined) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // ? 最后都要排序, 为什么这里要按顺序插入
      let idx = queue.findIndex((q) => q.id > watcher.id);
      if (idx === -1) {
        queue.push(watcher);
      } else {
        queue.splice(idx, 0, watcher);
      }
    }

    if (!waiting) {
      waiting = true;

      nextTick(flushSchedulerQueue);
    }
  }
}

function flushSchedulerQueue() {
  curTimestamp = Date.now();
  flushing = true;
  /**
   * 这里需要排序的原因
   * 1. 确保从父组件更新到子组件
   * 
   */
  queue.sort((a, b) => a.id - b.id);
  queue.forEach((watcher) => {
    if (watcher.before) {
      watcher.before.call(watcher.vm);
    }
    const id = watcher.id;
    has[id] = undefined;
    watcher.run();
  });

  waiting = flushing = false;
  has = {};

  const updatedQueue = queue.slice(0);
  queue = [];

  updatedQueue.reverse().forEach((watcher) => {
    callHook(watcher.vm, 'updated');
  });
}
