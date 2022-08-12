/*
 * @Author: huangyingli
 * @Date: 2022-08-12 15:49:09
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:25:00
 * @Description:
 *
 */

import { defineReactive, observe } from '../utils/Utils';
import { Dep } from './Dep';
import { DepInstance, ObserverInstance } from '../interface/Index';

export class Observer implements ObserverInstance {
  dep: DepInstance;
  constructor(data: object) {
    /* 这个的作用是对本层对象做依赖收集 */
    this.dep = new Dep();
    this.walk(data);
  }

  private walk(data: object): void;
  private walk(data: object) {
    for (const key in data) {
      defineReactive(data, key, data[key]);
    }
  }
}
