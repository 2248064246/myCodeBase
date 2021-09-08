/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:03:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:03:48
 * @Description:
 */

import { AppStatus } from './enum';

export interface IAppInfo {
  // 定义应用信息
  name: string;
  entry: string;
  container: string;
  activeRule: string;
}

export interface IInternalAppInfo extends IAppInfo { // 定义应用状态, 卸载方法, 加载方法
  status: AppStatus;
  bootstrap?: LifCycle;
  mount?: LifCycle;
  unmount?: LifCycle;
  proxy: any;
}

export type LifCycle = (app: IAppInfo) => Promise<any>;

export type EventType = 'hashchange' | 'popstate';

export interface ILifeCycle {
  beforeLoad?: LifCycle | LifCycle[]; 
  mounted?: LifCycle | LifCycle[];
  unmounted?: LifCycle | LifCycle[];
}
