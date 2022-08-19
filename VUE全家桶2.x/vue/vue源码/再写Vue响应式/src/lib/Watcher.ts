/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:49:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-18 15:03:06
 * @Description:
 */
import {
  DepInstance,
  VueInstance,
  WatchInstance,
  WatchOptions,
} from '../interface/Index';
import { parsePath } from '../utils/Utils';
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
  id: Number;
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
    if(options) {
      this.sync = options.sync || true;
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
    if (this.sync) {
      this.run();
    } else {
      /* 在这里执行组件更新操作 */
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
    const id = dep.id;
    /* 判断新收集的dep中是否已经存在这个dep */
    if (!this.newDeps.find((d) => d.id === id)) {
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
