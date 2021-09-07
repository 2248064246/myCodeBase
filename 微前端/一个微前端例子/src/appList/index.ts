/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:15:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:20:35
 * @Description:
 */

import { IAppInfo, IInternalAppInfo } from '../types';

import { AppStatus } from '../enum';

let appList: IAppInfo[] = [];

export const setAppList = (list: IAppInfo[]) => {
  appList = list;
  appList.map((app) => {
    // 这里个 appLIst 一开指定 IInternalAppInfo 不就好了...
    (app as IInternalAppInfo).status = AppStatus.NOT_LOADED;
  });
};

export const getAppList = () => {
  return appList;
};
