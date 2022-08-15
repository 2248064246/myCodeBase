/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:49:00
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-15 14:07:15
 * @Description:
 */
import { DepInstance, VueInstance, WatchInstance } from '../interface/Index';
import { parsePath } from '../utils/Utils';
import { Dep } from './Dep';

export class Watcher implements WatchInstance {
  getter: Function | undefined;
  value: any;
  vm: VueInstance;
  cb: Function;
  deps: Array<DepInstance>;
  constructor(vm: VueInstance, expOrFunc: string | Function, cb: Function) {
    /* 这边这个是function是应为computed的缘故 */
    /* 需要对computed做处理 */
    if (typeof expOrFunc === 'function') {
      this.getter = expOrFunc;
    } else {
      this.getter = parsePath(expOrFunc);
    }
    this.vm = vm;

    this.cb = cb;
    this.deps = [];
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
    }

    return value;
  }

  update(newVal: any): void {
    console.log('正在修改 ');
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
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }

  /**
   * Add a dependency to this directive.
   */
  addDep(dep: DepInstance) {
    this.deps.push(dep);
  }
}
