/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:40:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-12 17:54:38
 * @Description:
 *
 */

interface OptionsData {
  (): object;
}

export interface VueOptions {
  el?: string | Element;
  data?: object | OptionsData;
  watch?: object;
}

export interface VueInstance {
  $data: any;
  $watch: object;
  $options: VueOptions;
}

export interface WatchInstance {
  /**
   * 对象值改变后调用此处
   */
  update(newVal: any): void;

  value: any;
  key: string;
  vm: VueInstance;
  cb: Function;

  get(): any;
}

export interface DepInstance {
  addSub(v: WatchInstance): void;
  /**
   * 添加依赖
   * 将watcher实例添加到subs中
   */
  depend(): void;
  /**
   * 用于存储关联的watcher实例
   */
  subs: Array<WatchInstance>;
  /**
   * 通知subs中的watcher更新
   */
  notify(newVal: any): void;
}

export interface ObserverInstance {
  dep: DepInstance;
}
