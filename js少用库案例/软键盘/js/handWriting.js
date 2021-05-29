/*
 * @Author: ggbone
 * @Date: 2020-05-27 16:16:53
 * @LastEditors: ggbone
 * @LastEditTime: 2020-06-04 19:54:30
 * @Description: 手写板
 * @Email: 2248064246@qq.com
 * @Company: 3xData
 * @youWant: add you want
 */

(function ($) {
  var _this
  var _temp
  $.fn.extend({
    "handWriting": function (top, left) {
      var temp = ''
      temp += `<div id="handwritingBar" style="top:${top}; left:${left}">`
      temp += '<ul + id="maySelect">'
      temp += '</ul>'
      temp += '<canvas id="handWritePane" width="800" height="400"></canvas>'
      temp += '<div id="handwritingControl">'
      temp += '<button id="btnCloseHandWrite">关闭</button>'
      temp += '<button id="btnHandWriteToKeyboard">全键盘</button>'
      temp += '<button id="btnHandWriteDel">删除</button>'
      temp += '<button id="btnHandWriteBack">退笔</button>'
      temp += '<button id="btnHandReWrite">重写</button>'
      temp += '</div>'
      temp += '</div>'
      _this = this
      _temp = temp
      $(this).one('click', function (e) {
        if (e.target.type == 'text' || e.target.type == 'textarea') {
          e.preventDefault()
          if ($('#handwritingBar').length) {
            $('#handwritingBar').show()

          } else {
            $(_temp).appendTo('body');
            $('#btnCloseHandWrite').on('click', function () {
              $('#handwritingBar').remove()
            })
            $('#btnHandWriteDel').on('click', e => {
              // $(this).val($(this).val().substring(0, $(this).val().length - 1))

              var index = getPosition($(this)[0])
              console.log('index', index)
              $(this).val($(this).val().substring(0, index - 1) + $(this).val().substring(index, $(this).val().length));

              // $(this).focus()
              set_text_value_position(this, index - 1)
            })
            $('#btnHandWriteToKeyboard').on('click', e => {
              console.log(this)
              $('#handwritingBar').remove()
              $(this).click()
              $(this).focus()
              $(this).virtualkeyboard(top, left)
            })
          }
          setTimeout(() => {
            $('#handwritingBar button').addClass('waves-effect')

          })

          init()
        }
      })

      // 同主机端口下, 路径改变后触发 (使用window 的调用路径方法才能触发, Vue的route方式不会没用)
      window.onpopstate = e => {
        $('#handwritingBar') ? $('#handwritingBar').remove() : null
      }
      // 页面关闭后触发 (这几个个在vue的路由自动跳转的时候都不会触发, 手动的go() 可以触发 ....)
      window.onunload = e => {
        console.log('onunload')
        $('#handwritingBar') ? $('#handwritingBar').remove() : null
      }
      window.onbeforeunload = e => {
        console.log('onbeforeunload')
        $('#handwritingBar') ? $('#handwritingBar').remove() : null
      }

    }
  })


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

  function handWriteChoose() {
    var e = window.event || arguments.callee.caller.arguments[0]

    console.log(_this)
    console.log(e.target.innerHTML)
    // 将输入区域放入到这个选择器中
    // document.getElementById('inputArea').innerHTML += e.target.innerHTML// 将点击的字词加入到文本域中
    $(_this).val($(_this).val() + e.target.innerHTML)
    $(_this).focus()
    // 因为重绘/重置画布 存在缓存 像是直接覆盖一层新的画布  故此处直接调用一次重写按钮
    document.getElementById("btnHandReWrite").click();
    $('#maySelect li').remove() // 清空备选字词

  }

  // 每次改变画布调用的函数  例：每写一笔/每退一笔都会调用这个
  // 将返回的备选词放入到
  function callbackfunc(ret) {
    // ret.cand // 返回可能的字备选字
    // ret.cand_count // 备选字总数
    // ~   asso //备选词
    // ~   asso_count // 备选词总数
    // console.log(ret.cand)
    // console.log(ret.asso)
    // 可以直接输出ret 查看具体返回的json

    // 返回了9个备选字  20个备选词 这里只放了9个
    $('#maySelect li').remove()
    for (var i = 0; i <= 6; i++) {
      // 向备选区域放入返回出来的的备选字词  因为on不上点击事件 所以此处用onClick添加了备选字词点击事件 点击时将里面的字词放入到输入框中
      // 创建九个备选字词容器
      $('#maySelect').append('<li><p  class="mayWord"></p><p  class="mayLetter"></p></li>')
      // 将备选字词放入到容器中
      $('#maySelect li').eq(i).find('.mayWord').html(ret.cand[i])
      $('#maySelect li').eq(i).find('.mayLetter').html(ret.asso[i])
      // $('#maySelect li').on('click', handWriteChoose)

    }
    $('#maySelect p').on('click', handWriteChoose)

  }

  function init() {
    QQShuru.HWPanel({
      canvasId: "#handWritePane", // 画布id
      lineColor: "#fff", // 线条颜色
      backBtnId: "#btnHandWriteBack", // 退一笔按钮id
      clearBtnId: "#btnHandReWrite", // 重写按钮id
      callback: callbackfunc // 返回获取到的json对象
    });
  }

  // 以下为摘抄的源码
  // 源码链接：https://blog.csdn.net/weixin_33757609/article/details/92375880

  QQShuru = {};
  QQShuru.Util = {};
  QQShuru.Util.Browser = {};
  QQShuru.Util.Browser.isIE = (navigator.appName == "Microsoft Internet Explorer");

  QQShuru.Util.Ajax = {};
  QQShuru.Util.Ajax.get = function (a, c) {
    var b = document.createElement("script");
    b.setAttribute("charset", "utf-8");
    b.id = Math.random();
    document.getElementsByTagName("head")[0].appendChild(b);
    b.src = a + "&c=" + c;
    if (QQShuru.Util.Browser.isIE) {
      b.onreadystatechange = function () {
        if (b.readyState == "loaded") {
          document.getElementsByTagName("head")[0].removeChild(b)
        }
      }
    } else {
      b.onload = function () {
        document.getElementsByTagName("head")[0].removeChild(b)
      }
    }
  };
  QQShuru.Util.Event = {};
  QQShuru.Util.Event.addEvent = function () {
    if (QQShuru.Util.Browser.isIE) {
      return function (b, c, a) {
        b.attachEvent("on" + c, a)
      }
    } else {
      return function (b, c, a, d) {
        b.addEventListener(c, a, d || false)
      }
    }
  }();
  QQShuru.Util.Event.remEvent = function () {
    if (QQShuru.Util.Browser.isIE) {
      return function (b, c, a) {
        b.detachEvent("on" + c, a)
      }
    } else {
      return function (b, c, a, d) {
        b.removeEventListener(c, a, d || false)
      }
    }
  }();
  QQShuru.Util.Event.getPoint = function (a) {
    if (QQShuru.Util.Browser.isIE) {
      return [a.x, a.y]
    } else {
      if (a.touches) {
        // 触摸的时候手动计算 layerX和layerY, 触摸事件对象上并没有这两个属性(这两个属性是在 UIEvent中, 但是触摸对象没有继承这两个属性)
        // 触摸对象的触摸点参数都是在 touches 数组中(多点触摸会后多个数据, 这或许是没有 layerX和layerY的原因吧)

        // 这个layer 都是要相对canvas的, 因为要在那上面画图,  (也就是要计算触摸点位于 canvas的偏移), 通过计算触摸点位于父组件的偏移得到
        a.layerX = a.touches[0].clientX - document.getElementById('handwritingBar').offsetLeft
        a.layerY = a.touches[0].clientY - document.getElementById('handwritingBar').offsetTop - 100 // 这里减去 100 是因为canvas有一个100的上margin
      }
      console.log([a.layerX, a.layerY])
      return [a.layerX, a.layerY]
    }
  };

  QQShuru.HWPanel = function (obj) {
    var isIE = QQShuru.Util.Browser.isIE;
    var m = QQShuru.Util.Event.addEvent;
    var j = QQShuru.Util.Event.remEvent;
    var B = QQShuru.Util.Event.getPoint;
    var h = document;
    var H = document.body;
    var z = document.documentElement;
    var f = [];
    var K = [];
    var O = [];

    var i = document.querySelector(obj.canvasId);
    var v = isIE ? 1 : 0;
    var a = 2;
    var c = obj.lineColor ? obj.lineColor : "#ffffff"; //线条颜色
    var y = obj.lineWidth ? obj.lineWidth : 5; //线条宽度
    var t = "round";
    var J = !!i.getContext;
    if (J) {
      var Q = i.getContext("2d");
      Q.lineCap = t;
      Q.lineJoin = t;
      Q.lineWidth = y;
      Q.strokeStyle = c
    }
    var L = false;
    var P = false;
    var u = 0;
    var T = [];
    var r = 0;
    var e = [],
      d = [],
      I = [];
    var D = [],
      C = [];
    pointsDeltaXY = [];
    var k = [0, 0];
    //鼠标按下事件
    var l = function (W) {
      // 这里通过判断按下的是哪个鼠标键来绘图
      console.log('W', W)
      if (!W.touches && v !== W.button) {
        return
      }
      var Y = B(W);
      if (!Y) {
        return
      }
      L = true;
      r = 0;
      e = [];
      d = [];
      I = [];
      D = [];
      C = [];
      pointsDeltaXY = [];
      e[r] = Y[0];
      d[r] = Y[1];
      I[r * 2] = Y[0];
      I[r * 2 + 1] = Y[1];
      D[r] = Y[0];
      C[r] = Y[1];
      pointsDeltaXY[r * 2] = Y[0];
      pointsDeltaXY[r * 2 + 1] = Y[1];
      if (J) {
        Q.beginPath();
        Q.moveTo(Y[0], Y[1])
      }
      k[0] = Y[0];
      k[1] = Y[1];
      r++;
      if (isIE) {
        m(i, "losecapture", n);
        i.setCapture()
      } else {
        m(window, "blur", n)
      }
    };
    //鼠标移动事件
    var A = function (W) {
      console.log('A', W)
      if (!L) {
        console.log('推出了, L', L)
        return
      }
      var Y = B(W); //坐标
      if (!Y) {
        console.log('推出了, Y', Y)
        return
      }
      e[r] = Y[0];
      d[r] = Y[1];
      I[r * 2] = Y[0];
      I[r * 2 + 1] = Y[1];
      D[r] = Y[0] - k[0];
      C[r] = Y[1] - k[1];
      pointsDeltaXY[r * 2] = D[r];
      pointsDeltaXY[r * 2 + 1] = C[r];
      if (J) {
        Q.lineTo(Y[0], Y[1]);
        Q.stroke()
      } else {
        var X = T[u].e.path;
        X.value = X.value.replace(" e", "," + Y[0] + "," + Y[1] + " e")
      }
      k[0] = Y[0];
      k[1] = Y[1];
      r++
    };
    //鼠标松开事件
    var n = function (W) {
      if (!L) {
        return
      }
      L = false;
      if (1 === r) {
        if (!J) {
          T[u].e.style.visibility = "hidden"
        }
        return
      }
      if (J) {
        Q.closePath();
        var Z = i.cloneNode(false);
        Z.style.display = "none";
        Z.getContext("2d").drawImage(i, 0, 0);
        T[u] = {
          e: Z
        };
        Z = null
      }
      var aa = T[u];
      aa.count = r;
      aa.x = e.slice(0);
      aa.y = d.slice(0);
      aa.xy = I.slice(0);
      aa.deltaX = D.slice(0);
      aa.deltaY = C.slice(0);
      aa.deltaXY = pointsDeltaXY.slice(0);
      u++;
      var X = [];
      for (var Y = 0; Y < r; Y++) {
        X[Y] = "[" + e[Y] + ", " + d[Y] + "]"
      }
      if (isIE) {
        j(i, "losecapture", n);
        i.releaseCapture()
      } else {
        j(window, "blur", n)
      }
      if (1 === u) {
        i.className = "writting"
      }
      s(u);
    };
    //清空所有
    var clearCanvas = function (W) {
      if (0 === u) {
        return
      }
      var ab = "";
      if (J) {
        Q.clearRect(0, 0, 800, 450)
        $('#maySelect li').remove()
      }
      for (var Z = 0; Z < u; Z++) {
        T[Z].e.style.visibility = "hidden"
      }
      u = 0;
      i.className = ""

    };
    //退一笔
    var backWrite = function (W) {
      if (0 === u) {
        return
      }
      if (1 === u) {
        clearCanvas();
        return
      }
      u--;
      if (J) {
        Q.clearRect(0, 0, 800, 450); // 450 为画布高度  800 为画布宽度
        Q.drawImage(T[u - 1].e, 0, 0)
      }
      T[u].e.style.visibility = "hidden";
      s(u)
    };
    var p = function (W, ab) {
      var aa = ab || W.length;
      var Z = "";
      var ad = "";
      for (var X = 0; X < aa; ++X) {
        var ac = W[X];
        ad = X ? ",eb," : "";
        var Y = ad + ac.deltaXY.join(",");
        Z += Y
      }
      return Z
    };
    this.ajax_callback = function (X) {
      obj.callback && obj.callback(X)
    };
    QQShuru.HWPanel.ajax_callback = this.ajax_callback;
    var s = function (Y) {
      var Z = p(T, Y);
      var ab = "QQShuru.HWPanel.ajax_callback";
      var W = "http://handwriting.shuru.qq.com/cloud/cgi-bin/cloud_hw_pub.wsgi";
      var aa = "track_str=" + Z + "&cmd=0";
      var X = W + "?" + aa;
      QQShuru.Util.Ajax.get(X, ab)
    };
    m(i, "mousedown", l); // 鼠标按下
    m(i, "mousemove", A); // 鼠标移动
    m(i, "mouseup", n); // 鼠标抬起
    m(i, "dblclick", clearCanvas); // 双击清除

    // 增加触摸事件
    m(i, "touchstart", l) // 触摸开始
    m(i, "touchmove", A) // 触摸滑动

    m(i, "touchend", n) // 触摸结束

    m(i, "contextmenu",
      function (W) {
        isIE ? (W.returnValue = false) : W.preventDefault()
      });
    m(h, "mouseup", n); // 鼠标抬起
    if (obj.backBtnId) {
      m(document.querySelector(obj.backBtnId), "click", backWrite);
    }
    if (obj.clearBtnId) {
      m(document.querySelector(obj.clearBtnId), "click", clearCanvas);
    }
    this.clear = clearCanvas; //暴露清空canvas的方法到外部
    this.back = backWrite; //暴露退一步的方法到外部
  };


  // 鼠标按下, 开始触屏监听事件
  $("html, body").on("mousedown", "#maySelect", down);
  $("html, body").on("touchstart", "#maySelect", down);

  var defaults = {
    offsetX: "",
    offsetY: ""
  };

  function down(e) {
    e.preventDefault();
    var e = e.type.match("mouse") ? e : e.originalEvent.changedTouches[0];
    // 先计算 单前鼠标位置 - 单前元素的上下偏移 == 鼠标在该元素的位置
    // 只需要 再次用 鼠标位置 - 鼠标在该元素的位置 == 元素的偏移
    defaults.offsetX = e.pageX - $("#handwritingBar")[0].offsetLeft;
    defaults.offsetY = e.pageY - $("#handwritingBar")[0].offsetTop;
    $("html,body").on("mousemove", move);
    $("html,body").on("mouseup", up);
    $("html,body").on("touchmove", move);
    $("html,body").on("touchend", up);
  }

  function move(e) {
    e.preventDefault();
    console.log(111)
    var e = e.type.match("mouse") ? e : e.originalEvent.changedTouches[0];
    $("#handwritingBar")[0].style.left = e.pageX - defaults.offsetX + "px";
    $("#handwritingBar")[0].style.top = e.pageY - defaults.offsetY + "px";
  }

  function up(e) {
    // 鼠标抬起, 触屏结束 移除监听
    $('html,body').off('mousemove', move);
    $('html,body').off('mouseup', up);
    $('html,body').off('touchmove', move);
    $('html,body').off('touchend', up);
  }
})(window.jQuery);
