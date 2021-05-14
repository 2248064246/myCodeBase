
function myTween(curEle) {
    return new myTween.prototype.init(curEle);
}

myTween.prototype = {
    animFunc : {
        /**
         * 线性匀速运动
         * @param {Number} t 时间节点
         * @param {Number} b 起始位置
         * @param {Number} c 距离
         * @param {Number} d 总时间
         */
        Linear: function (t, b, c, d) {
            return t * c / d + b;
        },
    
        /**
         * 二次方运动
         */
        Quad: {
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
        },
        /**
         * 三次方运动
         * 效果更加明显
         */
        Cubic: {
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
        },
        /**
         * 四次方运动
         * 效果比三次方又要明显
         */
        Quart: {
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
        },
        /**
         * 五次方运动
         */
        Quint: {
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
        },
        /**
         * 正弦曲线运动
         * 效果比较平滑
         */
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        /**
         * 指数曲线运动
         * 效果非常激烈
         */
        Expo: {
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
        },
        /**
         * 原型曲线运动
         * 效果也非常激烈
         */
        Circ: {
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
        },
        /**
         * 指数衰减的正弦曲线运动
         * 开始摇摆效果?? (a, p 是干嘛的?)
         */
        Elastic: {
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
        },
        /**
         * 超过范围的三次方运动
         * 有一个超出返回效果
         */
        Back: {
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
        },
        /**
         * 指数衰减的反弹运动
         * 跟篮球弹弹弹一样的效果
         */
        Bounce: {
            easeIn: function (t, b, c, d) {
                return c - myTween.Bounce.easeOut(d - t, 0, c, d) + b;
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
                if (t < d / 2) return myTween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return myTween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    },
    /**
     * 动画初始化
     * @param {HTMLElement} curEle 添加动画的元素
     */
    init: function(curEle) {
        this.timer ? clearInterval(this.timer):null;
        this.curEle = curEle;
        this.begin = {};
        this.distance = {};
        this.time = 0;
        this.func = this.animFunc.Linear;
        this.stop = false;
        return this;
    },
    /**
     * 给元素添加动画样式 和 动画持续时间
     * @param {Object} target 样式对象,css样式|元素属性
     * @param {Number} duration [总时间 默认值 1000ms]
     * 允许 width,height,top,left...等css属性
     * 允许 scrollTop...等元素属性
     */
    to: function(target, duration) {
        target = target || 0;
        duration = duration || 1000;
        if(typeof target !== 'object') {
            throw new Error('target参数错误!');
        }
        this.target = target;
        this.duration = duration;
        for(var key in this.target) {
            this.begin[key] = typeof utils.getCss(this.curEle, key) !== 'undefined' ?  utils.getCss(this.curEle, key): this.curEle[key];
            this.distance[key] = this.target[key] - this.begin[key];
        }
        return this;
    },
   
    /**
     * 启动动画
     * @param {String} effect [动画执行方法 默认 Linear]
     */
    start: function(effect, timeStep) {
        timeStep = timeStep || 1;
        if(typeof effect === 'string') {
            var ary = effect.replace(/^ +| +$/, '').split('.');
            this.func = ary.length === 1? this.animFunc[ary[0]] : this.animFunc[ary[0]][ary[1]];
            if(typeof this.func !== 'function') this.func = this.animFunc.Linear;
        }
        var _this = this;
        if(!this.stop) {
            this.timer = setInterval(function() {
                _this.time +=timeStep;
                if(_this.time >= _this.duration) {
                    clearInterval(_this.timer);
                    _this.setStyle(_this.curEle, _this.target);
                    return;
                }
                for(var key in _this.target) {
                    var curPos = _this.func(_this.time, _this.begin[key], _this.distance[key], _this.duration);
                    typeof utils.getCss(_this.curEle, key) !== 'undefined' ?  utils.css(_this.curEle, key, curPos): _this.curEle[key]=curPos;
                }
            }, 10)
        }else {
            this.setStyle(this.curEle, this.target);
        }
        
    },
    stopAnim:function(stop) {
        this.stop = typeof stop === 'boolean' ? stop : false;
        return this;
    },
    setStyle: function(curEle, style,value) {
        style = style || 0;
        if(typeof style === 'object') {
            for(var key in style) {
                typeof utils.css(curEle, key) !== 'undefined' ? utils.css(curEle, key, style[key]): curEle[key] = style[key];
            }
        }else {
            typeof utils.css(curEle,style, value) !== 'undefined' ? utils.css(curEle,style, value):curEle[style] = value;
        }
        
    }
}

myTween.prototype.init.prototype = myTween.prototype;


