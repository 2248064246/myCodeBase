/*
 * @Author: 洛水赋神
 * @Date: 2020-06-27 21:21:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-27 21:31:14
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */ 


 var cube = document.querySelector('.cube')
 var radioGroup = document.querySelector('.radio-group')

 var currentClass = ''

 function changeSide() {
     var checkRadio = radioGroup.querySelector(':checked')
     var showClass = 'show-' + checkRadio.value
     if(currentClass) {
         cube.classList.remove(currentClass)
     }
     cube.classList.add(showClass)
     currentClass = showClass
 }

 changeSide()

 radioGroup.addEventListener('change', changeSide)