/*
 * @Author: huangyingli
 * @Date: 2022-05-24 11:21:12
 * @LastEditors: huangyingli
 * @LastEditTime: 2022-05-24 12:26:15
 * @Description:
 */

let menuBtn = document.querySelector('.more-button');

menuBtn.addEventListener('click', function (el) {
  menuBtn.classList.toggle('active');
});
