// 获取DOM元素
const $secondsRight = $(".seconds-right>li");
const $secondsLeft = $('.seconds-left>li');
const $minutesRight = $('.minutes-right>li');
const $minutesLeft = $('.minutes-left>li');
const $hoursRight = $('.hours-right>li');
const $hoursLeft = $('.hours-left>li');

// 设置自定义属性, 通过indexNum的值来控制显示哪个卡片
$secondsLeft.data('indexNum', 0);
$secondsRight.data('indexNum', 0);
$minutesLeft.data('indexNum', 0);
$minutesRight.data('indexNum', 0);
$hoursLeft.data('indexNum', 0);
$hoursRight.data('indexNum', 0);
$hoursRight.data('spacialIndex', 0);

// 设置下一个卡片, 一级一级带动 (例如: 秒钟的右边到9了, 在转一下会带动秒钟的左边进一)
// 结构类似链表, 可以仅通过 秒钟 来带动整个时钟
$secondsRight.data('next', $secondsLeft);
$secondsLeft.data('next', $minutesRight);
$minutesRight.data('next', $minutesLeft);
$minutesLeft.data('next', $hoursRight);
$hoursRight.data('next', $hoursLeft);

(() => {
    let curDate = new Date(),
        hours = curDate.getHours(),
        minutes = curDate.getMinutes(),
        seconds = curDate.getSeconds();
    let secondsTime = splitTime(seconds),
        minutesTime = splitTime(minutes),
        hoursTime = splitTime(hours);
    $secondsLeft.data('indexNum', secondsTime.left);
    $secondsRight.data('indexNum', secondsTime.right);
    $minutesLeft.data('indexNum', minutesTime.left);
    $minutesRight.data('indexNum', minutesTime.right);
    $hoursLeft.data('indexNum', hoursTime.left);
    $hoursRight.data('indexNum', hoursTime.right);
    $hoursRight.data('spacialIndex', hoursTime.left * 10 + hoursTime.right);
    initializeTime($secondsRight);
})()

function splitTime(time) {
    time = time.toString();
    // 补零， 如果是诸如 09，02这类时间，js获取到的只有 9，2. 会去掉零，要手动加上
    if (time.length === 1) {
        time = time.padStart(2, '0');
    }
    let left = Number(time[0]),
        right = Number(time[1]);
    return {
        left,
        right
    };
}

function initializeTime($obj) {
    let index = $obj.data('indexNum'),
        next = $obj.data('next');
    $obj.eq(index).addClass('active');
    console.log(index);
    if(index ===0) index = $obj.length;
    $obj.eq(index - 1).addClass('before');
    if (next) initializeTime(next);
}

function play($obj) {
    let index = $obj.data('indexNum');
    let next = $obj.data('next');
    $obj.removeClass('before active');
    $obj.eq(index).addClass('before');
    ++index;
    if ($obj === $hoursRight) {
        let spacialIndex = $obj.data('spacialIndex');
        spacialIndex++;
        if (spacialIndex >= 23) {
            index = 0;
            spacialIndex = 0;
            play(next);
            $obj.data('spacialIndex', spacialIndex);
        }
    }
    if (index >= $obj.length) {
        index = 0;
        if(next) play(next);
    }
    $obj.eq(index).addClass('active');
    $obj.data('indexNum', index);
    
}

let timer = setInterval(() => {
    play($secondsRight);
}, 1000);