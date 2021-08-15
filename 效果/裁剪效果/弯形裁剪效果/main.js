/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-08-15 12:55:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-15 13:45:35
 * @Description: 
 */

/**
 * 
 * @param {Element} el 
 */
function InViewport(el) {
  var H = document.documentElement.clientHeight,
    r = el.getBoundingClientRect(), // DOMRect对象，提供关于元素大小及其相对于视口的位置的信息。
    t = r.top, // 上边距离顶部视口的距离
    b = r.bottom // 底边距离顶部视口的距离

  console.log(r)

  return Math.max(0, t > 0 ? H - t : (b < H ? b : H))
  // 这里需要返回 el 在页面中可视区域的高度 
}
window.addEventListener('scroll', function () {
  var window_offset = InViewport(document.querySelector('.intro'))
  document.querySelector('.overlay').style.height = window_offset + 'px';

})