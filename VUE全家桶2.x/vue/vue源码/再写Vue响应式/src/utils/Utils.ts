/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:59:23
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:54:29
 * @Description:
 */

import { isObject } from './Common';

import { Observer } from '../lib/Observer';
import { ObserverInstance } from '../interface/Index';
import { Dep } from '../lib/Dep';

export function getData(fn: Function, target: object): object {
  try {
    return fn.call(target, target);
  } catch (e) {
    console.warn('data() 执行错误', e);
  }
}

export function proxy(target: object, sourceKey: string, key: string): void {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      return this[sourceKey][key];
    },
    set(val: any) {
      this[sourceKey][key] = val;
    },
  });
}

export function observe(data: object): ObserverInstance | undefined {
  if (!isObject(data)) {
    return;
  }

  let ob: ObserverInstance | undefined;

  ob = new Observer(data);

  return ob;
}

export function defineReactive(data: object, key: string, val: any) {
  const property = Object.getOwnPropertyDescriptor(data, key);

  const getter = property.get;
  const setter = property.set;

  let dep = new Dep();
  let ob: ObserverInstance;

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('试图访问 ', key);
      const value = getter ? getter.call(data) : val;
      if (Dep.target) {
        dep.depend();
        /* 如果当前层是个对象, 对当前层也做依赖收集 */
        if (ob) {
          ob.dep.depend();
        }
      }
      return value;
    },

    set(newVal) {
      const value = getter ? getter.call(data) : val;

      if (newVal === val || (Number.isNaN(newVal) && Number.isNaN(value))) {
        return;
      }

      if (setter) {
        setter.call(data, newVal);
      }
      ob = observe(newVal);
      dep.notify(newVal);
    },
  });
}
