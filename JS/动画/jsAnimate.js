/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-04-13 17:05:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-28 11:24:22
 * @Description: 
 */

/**
 * 缓动函数类
 */
class AnimTimingFunc {
  constructor() {
    /**
     * 线性匀速运动
     * @param {Number} t 时间节点
     * @param {Number} b 起始位置
     * @param {Number} c 距离
     * @param {Number} d 总时间
     * @returns {Number} 单前时间节点位置
     */
    this.Linear = function (t, b, c, d) {
      return t * c / d + b;
    }
    /**
     * 二次方运动
     */
    this.Quad = {
      /**
       * 由慢到块
       */
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      /**
       * 由快到慢
       */
      easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      /**
       * 慢->快->慢
       */
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
      }
    }

    /**
     * 三次方运动
     * 效果更加明显
     */
    this.Cubic = {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    }

    /**
     * 四次方运动
     * 效果比三次方又要明显
     */
    this.Quart = {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    }
    /**
     * 五次方运动
     */
    this.Quint = {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    }
    /**
     * 正弦曲线运动
     * 效果比较平滑
     */
    this.Sine = {
      easeIn: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOut: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      }
    }
    /**
     * 指数曲线运动
     * 效果非常激烈
     */
    this.Expo = {
      // 开始 很慢 最后特别快
      easeIn: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    }
    /**
     * 原型曲线运动
     * 效果也非常激烈
     */
    this.Circ = {
      easeIn: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    }
    /**
     * 指数衰减的正弦曲线运动
     * 开始摇摆效果?? (a, p 是干嘛的?)
     */
    this.Elastic = {
      /**
       * 开始摇摆
       */
      easeIn: function (t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      /**
       * 末尾摇摆
       */
      easeOut: function (t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
      },
      /**
       * 首尾摇摆
       */
      easeInOut: function (t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
          a = c;
          var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      }
    }
    /**
     * 超过范围的三次方运动
     * 有一个超出返回效果
     */
    this.Back = {
      /**
       * 刚开始会向后一小段
       */
      easeIn: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      /**
       * 最后会超出一小段,然后返回
       */
      easeOut: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      /**
       * 首尾都会超出一小段在返回
       */
      easeInOut: function (t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
      }
    }
    /**
     * 指数衰减的反弹运动
     * 跟篮球弹弹弹一样的效果
     */
    this.Bounce = {
      easeIn: function (t, b, c, d) {
        return c - new AnimTimingFunc().Bounce.easeOut(d - t, 0, c, d) + b;
      },
      easeOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
          return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
          return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
          return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
          return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
      },
      easeInOut: function (t, b, c, d) {
        if (t < d / 2) return new AnimTimingFunc().Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
        else return new AnimTimingFunc().Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    }
  }

}

/**
 * 给当前添加样式
 * @param {HTMLElement} curEle 当前元素
 * @param {String} attr 样式名
 * @param {String} value 样式值
 */
function setCss(curEle, attr, value) {
  // 在JS中设置float样式也需要处理兼容
  if (attr === "float") {
    curEle["style"]["cssFloat"] = value;
    curEle["style"]["styleFloat"] = value;
    return;
  }
  // 对 opacity 样式做兼容处理
  if (attr === "opacity") {
    // 标准浏览器中直接设置
    curEle["style"]["opacity"] = value;
    // IE9以下,上面无效,使用特殊样式
    curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
    return;
  }
  var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
  if (reg.test(attr)) {
    // 判断传入的value 是否是一个有效数字
    if (!isNaN(value)) {
      value += 'px';
    }
  }
  curEle["style"][attr] = value;
}

/**
 * 获取进过计算的元素样式值
 * @param {HTMLElement} curEle 当前元素
 * @param {String} attr 样式名
 * @returns {String} 样式值
 */
function getCss(curEle, attr) {
  var val = null,
    reg = null;
  if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
    if (attr === "opacity") {
      val = curEle.currentStyle["filter"];
      reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
      val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
    } else {
      val = curEle.currentStyle[attr];
    }
  } else {
    val = window.getComputedStyle(curEle, null)[attr];
  }
  reg = /^(-?\d+(\.\d+)?)(px|pt|em|rem)?$/;
  return reg.test(val) ? parseFloat(val) : val;
}


class SimpleAnime {

  /**
   * 简单动画
   * @param {Object} options 参数是一个 Object
   *                  - el: Array|Element 指定动画元素
   *                  - style: Object 新样式
   *                  - duration: Number 持续时间, 单位ms
   *                  - delay: Number 延时, 单位ms
   *                  - timingFunc: Function 缓动函数
   */
  constructor(options = {}) {
    this.lastRunTime = 0; // 动画最后执行时间
    this.hasRunTime = 0;
    this.el = Array.from(options.el)
    this.elIsAry = Array.isArray(this.el)
    this.comStyles = []
    this.styles = options.styles
    this.duration = options.duration
    this.delay = options.delayA
    this.timingFunc = options.timingFunc
    this.running = false
  }

  play() {
    this.setRequestFrame()
  }

  static getStyle(element, styles) {
    
    var comStyAry = []
    for (var styleName in styles) {
      var begin = getCss(element, styleName);
      var end = styles[styleName]
      comStyAry.push({
        styleName,
        begin,
        end,
        distance: end - begin
      })
    }
    return comStyAry
  }

  static computedStyle(el, styles = []) {
    // console.log('el', el)
    var computedStyles = [];
    if (Array.isArray(el)) {
      computedStyles = el.map((item) => SimpleAnime.getStyle(item, styles))
    } else {
      computedStyles = SimpleAnime.getStyle(el, styles)
    }
    return computedStyles
  }

  static aryAnime(el, runTime, duration, comStyles, func) {
    el.forEach((element, index) => {
      SimpleAnime.singleAnime(element, runTime, duration, comStyles[index], func)
    })
  }

  static singleAnime(el, runTime, duration, comStyles, func) {
    // console.log('el', el, comStyles)
    comStyles.forEach(comStyle => {
      setCss(el, comStyle.styleName, func(runTime, comStyle.begin, comStyle.distance, duration))
    })
  }

  setRequestFrame() {
    this.lastRunTime = performance.now()
    this.running = true
    this.comStyles = SimpleAnime.computedStyle(this.el, this.styles)
    this.startAnime(this.lastRunTime)
  }

  startAnime(now) {

    var t = now - this.lastRunTime
    this.hasRunTime += t
    this.lastRunTime = now
    console.log('t', t, 'hasRunTime', this.hasRunTime)
    if (this.elIsAry) {
      SimpleAnime.aryAnime(this.el, this.hasRunTime, this.duration, this.comStyles, this.timingFunc)
    } else {
      SimpleAnime.singleAnime(this.el, this.hasRunTime, this.duration, this.comStyles, this.timingFunc)
    }
    if (this.hasRunTime > this.duration) return
    requestAnimationFrame(this.startAnime.bind(this))
  }
}