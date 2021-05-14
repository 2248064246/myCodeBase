/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-02-23 22:10:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-23 22:11:51
 * @Description: 
 */
/*
		Designed by: Joanna Ngai
		Original image: https://dribbble.com/shots/14118297-Villa
*/


const h = document.querySelector("#h");
const b = document.body;

let base = (e) => {
    var x = e.pageX / window.innerWidth - 0.5;
    var y = e.pageY / window.innerHeight - 0.5;
    h.style.transform = `
        perspective(20000px)
        rotateX(${ y * 200  + 75}deg)
        rotateZ(${ -x * 200  + 35}deg)
        translateZ(-9vw)
    `;
}

b.addEventListener("pointermove", base);