/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 15:05:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:38:22
 * @Description:
 */

export enum AppStatus { // 定义应用状态
  NOT_LOADED = 'NOT_LOADED',
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  BOOTSTRAPPING = 'BOOTSTRAPPING',
  NOT_MOUNTED = 'NOT_MOUNTED',
  MOUNTING = 'MOUNTING',
  MOUNTED = 'MOUNTED',
  UNMOUNTING = 'UNMOUNTING',
}
