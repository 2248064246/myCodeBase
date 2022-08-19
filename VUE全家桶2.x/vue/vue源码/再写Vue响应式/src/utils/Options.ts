/*
 * @Author: huangyingli
 * @Date: 2022-08-18 17:20:11
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-18 18:26:21
 * @Description:
 */

import { VueInstance, VueOptions, LIFECYCLE_HOOKS } from '../interface/Index';



let starts: any = {};

export function mergeOptions(vm: VueInstance, options: VueOptions) {
  let initOptions = {};

  for (const key in options) {
    mergeField(key);
  }

  function mergeField(key: string) {
    const fn = starts[key] || defaultStart;

    options[key] = fn(initOptions[key], options[key], vm, key);
  }
}

function defaultStart(parentVal: any, childVal: any) {
  return childVal ? childVal : parentVal;
}

LIFECYCLE_HOOKS.forEach((hook) => {
  starts[hook] = mergeHook;
});

function mergeHook(parentVal: any, childVal: any) {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks: Array<Function>) {
  // 去重?
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
