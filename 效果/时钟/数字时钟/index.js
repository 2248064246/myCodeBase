let hourWrap = document.getElementById('hour-wrap').getElementsByTagName('ul');
let minuteWrap = document.getElementById('minute-wrap').getElementsByTagName('ul');
let secondWrap = document.getElementById('second-wrap').getElementsByTagName('ul');
let animPoint = document.getElementById('anim-point');

function addZero(val) {
    val.length === 1? val = '0'+ val: null;
    return val;
}

function TimeDiv(timeNumber = '', obj) {
    let timeNumArr = [Number(timeNumber[0]), Number(timeNumber[1])];
    setTime(obj[0], timeNumArr[0]);
    setTime(obj[1], timeNumArr[1]);
}

function setTime(obj, item) {
    switch (item) {
        case 0:
            obj.className = 'zero';
            break;
        case 1:
            obj.className = 'one';
            break;
        case 2:
            obj.className = 'two';
            break;
        case 3:
            obj.className = 'three';
            break;
        case 4:
            obj.className = 'four';
            break;
        case 5:
            obj.className = 'five';
            break;
        case 6:
            obj.className = 'six';
            break;
        case 7:
            obj.className = 'seven';
            break;
        case 8:
            obj.className = 'eight';
            break;
        case 9:
            obj.className = 'nine';
            break;
    }

}

function clock() {
    let time = new Date();
    let hours = addZero(time.getHours().toString()); 
    let minutes = addZero(time.getMinutes().toString());
    let seconds = addZero(time.getSeconds().toString());
    TimeDiv(hours, hourWrap);
    TimeDiv(minutes, minuteWrap);
    animPoint.style.visibility === 'hidden'? animPoint.style.visibility = 'visible' : animPoint.style.visibility = 'hidden';
    TimeDiv(seconds, secondWrap);
}

setInterval(clock, 1000);