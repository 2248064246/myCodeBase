/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-22 12:07:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-22 12:31:02
 * @Description: 
 */


let card = document.querySelector('.card')

window.addEventListener('mousemove', (e) => {
  let ax = -(document.documentElement.clientWidth / 2 - e.pageX) / 20;
  var ay = (document.documentElement.clientHeight / 2 - e.pageY) / 10;
  card.setAttribute('style', `transform: rotateY(${ax}deg) rotateX(${ay}deg);`)
})