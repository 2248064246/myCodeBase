/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:40:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-15 10:27:47
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
  computed?: object;
}

export interface VueInstance {
  $data: any;
  $watch: object;
  $options: VueOptions;
  $computed: object;
}

export interface WatchInstance {
  /**
   * 对象值改变后调用此处
   */
  update(newVal: any): void;

  value: any;
  getter: Function | undefined;
  vm: VueInstance;
  cb: Function;
  deps: Array<DepInstance>;
  get(): any;
  depend(): void;
  addDep(dep:DepInstance):void;
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
