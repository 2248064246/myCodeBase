/*
 * @Author: 洛水赋神
 * @Date: 2020-06-27 14:17:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-27 19:36:34
 * @Description: 
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */



// *===============RangeDisplay========================*

function RangeDisplay(element) {
    this.rangeEle = element
    this.rangeOutput = document.createElement('span')
    this.units = this.rangeEle.getAttribute('data-units') || ''
    this.rangeOutput.className = 'range-display'

    var onChange = this.updateOutput.bind(this)

    this.rangeEle.addEventListener('change', onChange)
    this.rangeEle.addEventListener('input', onChange)

    this.updateOutput()

    this.rangeEle.parentNode.appendChild(this.rangeOutput)

}

RangeDisplay.prototype.updateOutput = function () {
    this.rangeOutput.textContent = this.rangeEle.value + this.units
}


var ranges = document.querySelectorAll('input[type="range"]')
ranges.forEach((item, index) => {
    new RangeDisplay(item)
})

var scene = document.querySelector('.scene')
var cube = document.querySelector('.cube')
var originXRange = document.querySelector('.origin-x-range')

var originYRange = document.querySelector('.origin-y-range')


originXRange.onchange = originXRange.oninput = originYRange.onchange = originYRange.oninput = updateRangeOrigin

function updateRangeOrigin() {
    var originY = originYRange.value
    var originX = originXRange.value
    scene.style.perspectiveOrigin = originX + '% ' + originY + '%'
}
updateRangeOrigin()

var perspectiveRange = document.querySelector('.perspective-range')
var perspectiveDisplay = perspectiveRange.parentNode.querySelector('.range-display')

perspectiveRange.onchange = perspectiveRange.oninput = function () {
    var value = this.value + 'px'
    if (value === '1000px') {
        value = 'none'
        perspectiveDisplay.textContent = 'none'
    }
    scene.style.perspective = value
}

var spinCubeCheckbox = document.querySelector('.spin-cube-checkbox')
spinCubeCheckbox.onchange = function () {
    cube.classList.toggle('is-spinning', this.checked)
}