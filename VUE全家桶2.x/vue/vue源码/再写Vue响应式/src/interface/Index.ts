/*
 * @Author: huangyingli
 * @Date: 2022-08-12 14:40:52
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-08-25 11:03:15
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
  beforeCreate?: Array<Function> | Function;
  created?: Array<Function> | Function;
  beforeMount?: Array<Function> | Function;
  mounted?: Array<Function> | Function;
  beforeDestroy?: Array<Function> | Function;
  destroyed?: Array<Function> | Function;
  render?: Function;
  template?: string | Element;
  beforeUpdate?: Array<Function> | Function;
  updated?:Array<Function> | Function;
  methods?: object;
}

export interface VueInstance {
  $data: any;
  $watch: object;
  $options: VueOptions;
  $computed: object;
  $el?: Element;
  $template?: Element;
  $render?: Function;
  $emit(eventName: string, ...args: any): void;
  $on(eventName: string | Array<string>, callback: Function): void;
  $once(eventName: string | Array<string>, callback: Function): void;
  $off(eventName: string | Array<string>, callback?: Function): void;
  $mount(el: string | Element): void;
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
  /**
   * 为什么需要这个??
   */
  newDeps: Array<DepInstance>;
  /**
   * 用于判断是执行watcher回调还是执行组件更新
   */
  sync: Boolean;
  id: number;
  /**
   * 获取watcher观察的值, 并在此时触发依赖收集
   */
  get(): any;
  /**
   * 用于触发deps中的Dep类进行依赖收集
   *
   */
  depend(): void;
  addDep(dep: DepInstance): void;
  cleanupDeps(): void;
  /**
   * 用于执行绑定的watcher回调
   */
  run(): void;

  before?: Function;
}

export interface WatchOptions {
  sync?: Boolean;
  before?(): void;
}

export interface DepInstance {
  addSub(v: WatchInstance): void;
  removeSub(v: WatchInstance): void;
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
   * 用于标识 dep 的id(递增)
   */
  id: number;
  /**
   * 通知subs中的watcher更新
   */
  notify(newVal: any): void;
}

export interface ObserverInstance {
  dep: DepInstance;
}


export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch',
];


