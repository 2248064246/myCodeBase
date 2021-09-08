/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:15:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 10:11:57
 * @Description:
 */

import { IAppInfo, IInternalAppInfo } from '../types';

import { AppStatus } from '../enum';

let appList: IAppInfo[] = [];

export const setAppList = (list: IAppInfo[]) => {
  appList = list;
  appList.map((app) => {
    // 上面 IAppInfo 是为了限制传入
    // 这里通过 as 语法, 给app信息加上状态
    (app as IInternalAppInfo).status = AppStatus.NOT_LOADED;
  });
};

export const getAppList = () => {
  return appList;
};
