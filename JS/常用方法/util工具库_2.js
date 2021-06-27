/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-06-25 14:04:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-26 13:02:04
 * @Description:
 */

function trim() {}

function forEach() {}

function merge() {}

function extend() {}


function getfilesize(size) {
  if (!size) return '0K';

  var num = 1024.0; //byte

  if (size < num) return size + 'B';
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'K'; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + 'M'; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
  return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
},