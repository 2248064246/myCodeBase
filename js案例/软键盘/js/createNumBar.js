/*
 * @Author: 黄宇/hyuishine
 * @Date: 2020-05-14 16:33:24
 * @LastEditors: ggbone
 * @LastEditTime: 2020-06-05 09:55:32
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xDate
 * @youWant: add you want
 */
function createNumBar(domId, top, left) {
  // 如果已经创建了键盘 就不在创建
  if (document.getElementById("randomNumBar")) {
    return;
  }
  var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var temp; // 中转值
  var randomNumArr = []; // 存储动态创建的随机0-9数组
  var barContainer = ""; // 大盒子 ul
  var barContent = ""; // ul里的内容  十个数字按钮和关闭之类的
  var positionleft = $("#" + domId).offset().left;
  // 在head标签中引入样式文件
  randomNumArr = createRandomNum(); // 获取 随机排序后的数组
  // 循环创建数字按钮
  for (var i = 0; i < randomNumArr.length; i++) {
    barContent += "<li>" + randomNumArr[i] + "</li>";
  }
  // 把内容套进大盒子
  // barContainer = "<ul id='randomNumBar' class='numContainer'>" + barContent + " <span style='margin: 185px 0 0 -55px;'>删除</span><span style='margin: 185px 0 0 -115px;'>关闭</span></ul>"
  barContainer =
    "<div  id='randomNumBar' class='numContainer'><ul>" +
    barContent +
    "</ul><button class='close' style='box-sizing:border-box;'>关闭</button><button class='del' style='box-sizing:border-box;'>删除</button ></div> ";

  // 将num数组随机排序 并返回
  function createRandomNum() {
    // while (num.length) {
    //   temp = num.splice(parseInt(Math.random() * num.length), 1)[0];
    //   randomNumArr.push(temp);
    // }
    // return randomNumArr;

    var temp = num[0]
    num.splice(0, 1)
    num.push(temp)
    return num
  }
  // 将点击的数字添加到输入框

  $("#" + domId).click(function () {
    if ($(".numContainer").length) {
      $("#randomNumBar").show();
    } else {
      $("body").append(barContainer); // 向body添加小键盘
      setTimeout(() => {
        // 修改距左侧的margin-left值 因为padding了一下 所以减掉
        // $("#randomNumBar").css("marginLeft", positionleft - 10);
        $("#randomNumBar").css({
          top: top,
          left: left
        });
        $("#randomNumBar").children().eq(0).children().addClass("waves-effect"); // 添加水波纹样式
        $("#randomNumBar>button").addClass("waves-effect");
      });
    }

    $("#randomNumBar ul>li").click(function (e) {
      console.log(this.innerText);
      e.stopPropagation();
      document.getElementById(domId).value += this.innerText;
    });
    // 删除
    $("#randomNumBar button")
      .eq(1)
      .click(function () {
        var inputDOM = document.getElementById(domId)
        // var inputDOM = $('#'+ domId)
        var temp = inputDOM.value
        temp = temp.substring(temp.length - 1, 0);

        // var index = getPosition(inputDOM[0])
        // console.log(index)
        // temp = temp.substring(0, index - 1) + temp.substring(index, temp.length)
        // set_text_value_position(inputDOM, index - 1)

        // inputDOM.val(inputDOM.val().substring(0, index -1) + inputDOM.val(substring(index, inputDOM.val().length)))
        // set_text_value_position(inputDOM[0], index-1)
        inputDOM.value = temp;
      });
    // 关闭
    $("#randomNumBar button")
      .eq(0)
      .click(function () {
        $("#randomNumBar").remove();
      });
  });

  // 鼠标按下, 开始触屏监听事件
  $("html, body").on("mousedown", "#randomNumBar", down);
  $("html, body").on("touchstart", "#randomNumBar", down);

  var defaults = {
    offsetX: "",
    offsetY: ""
  };

  // 获取input输入框的光标位置
  function getPosition(element) {
    let cursorPos = 0;
    if (document.selection) { //IE
      var selectRange = document.selection.createRange();
      selectRange.moveStart('character', -element.value.length);
      cursorPos = selectRange.text.length;
    } else if (element.selectionStart || element.selectionStart == '0') {
      cursorPos = element.selectionStart;
    }
    return cursorPos;
  }

  // 设置input的光标位置
  function set_text_value_position(element, spos) {
    var tobj = element
    if (spos < 0)
      spos = tobj.value.length;
    if (tobj.setSelectionRange) { //兼容火狐,谷歌
      setTimeout(function () {
        tobj.setSelectionRange(spos, spos);
        tobj.focus();
      }, 0);
    } else if (tobj.createTextRange) { //兼容IE
      var rng = tobj.createTextRange();
      rng.move('character', spos);
      rng.select();
    }
  }

  function down(e) {
    e.preventDefault();
    var e = e.type.match("mouse") ? e : e.originalEvent.changedTouches[0];
    // 先计算 单前鼠标位置 - 单前元素的上下偏移 == 鼠标在该元素的位置
    // 只需要 再次用 鼠标位置 - 鼠标在该元素的位置 == 元素的偏移
    defaults.offsetX = e.pageX - $("#randomNumBar")[0].offsetLeft;
    defaults.offsetY = e.pageY - $("#randomNumBar")[0].offsetTop;
    $("html,body").on("mousemove", move);
    $("html,body").on("mouseup", up);
    $("html,body").on("touchmove", move);
    $("html,body").on("touchend", up);
  }

  function move(e) {
    e.preventDefault();
    console.log(111)
    var e = e.type.match("mouse") ? e : e.originalEvent.changedTouches[0];
    $("#randomNumBar")[0].style.left = e.pageX - defaults.offsetX + "px";
    $("#randomNumBar")[0].style.top = e.pageY - defaults.offsetY + "px";
  }

  function up(e) {
    // 鼠标抬起, 触屏结束 移除监听
    $('html,body').off('mousemove', move);
    $('html,body').off('mouseup', up);
    $('html,body').off('touchmove', move);
    $('html,body').off('touchend', up);
  }
}

window.createNumBar = createNumBar;
