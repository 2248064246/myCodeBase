/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-05-14 23:53:16
 * @LastEditors: 
 * @LastEditTime: 2021-05-14 23:54:07
 * @Description: 
 */
const $secondsRight = $(".seconds-right>li");
const $secondsLeft = $('.seconds-left>li');

$secondsLeft.data('indexNum', 0);
$secondsRight.data('indexNum', 0);

function play($obj) {
    let index = $obj.data('indexNum');
    $obj.removeClass('before active');
    $obj.eq(index).addClass('before');
    ++index;
    index >= $obj.length ? index = 0 : null;
    $obj.eq(index).addClass('active');
    $obj.data('indexNum', index);
}

setInterval(() => {
    play($secondsLeft);
}, 1000 * 10);

setInterval(() => {
    play($secondsRight);
}, 1000);