/*
 * @Author: 洛水赋神
 * @Date: 2020-06-27 19:37:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-27 19:50:58
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */ 


 var card = document.querySelector('.card')

 card.addEventListener('click', function() {
     this.classList.toggle('is-flipped')
 })