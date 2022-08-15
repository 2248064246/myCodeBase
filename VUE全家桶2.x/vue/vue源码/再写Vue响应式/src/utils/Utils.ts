/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:59:23
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-15 10:05:02
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

  /* 会有一个闭包效果 */
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('试图访问 ', key, getter);
      /* 最重要的是通过闭包记录 val值 */
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
      console.log('视图改变', key, setter);
      if (setter) {
        setter.call(data, newVal);
      } else {
        /* 这里使用闭包缓存 */
        val = newVal;
      }

      ob = observe(newVal);
      dep.notify(newVal);
    },
  });
}

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
export const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Parse simple path.
 */
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`);
export function parsePath(path: string): any {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function (obj: any): any {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
