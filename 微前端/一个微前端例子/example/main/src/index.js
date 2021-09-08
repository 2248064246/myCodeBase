/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 14:56:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-08 11:16:02
 * @Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { registerMicroApps, start } from '../../../dist';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const appList = [
  {
    name: 'vue',
    activeRule: '/vue',
    container: '#micro-container',
    entry: 'http://localhost:8080',
  },
];

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerMicroApps(appList);
start();
