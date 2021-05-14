/**
 * 此轮播图插件使用说明
 * 1. HTML结构, 请按照下面结构书写
 *      <div id="banner" class="banner">
 *          <div id="img-wrapper" class="img-wrapper">
 *              <div class "img-container"></div>
 *          </div>
 *          <div class="circle-btn-container"></div>
 *          <div class="trigger-container">
 *              <a href="javascript:;" class="trigger-left"></a>
 *              <a href="javascript:;" class="trigger-right"></a>
 *          </div>
 *      </div>
 * 2. 模式说明
 *      模式1: 默认使用 left 样式来实现轮播效果
 *          需要使用 浮动, 让所有图片排成一行, 使用left 控制整个图片容器移动实现轮播
 *          由于left 会造成页面 回流(重排), 不推荐使用
 *      模式2: 默认使用 scrollLeft 属性来实现轮播效果
 *          同样需要使用浮动, 不同的是 使用scrollLeft 来滑动图片容器的上层容器
 *          这需要上层容器固定宽度
 *      模式3: 默认使用 z-index 和 opacity 来实现轮播效果
 *          应用于图片元素, 需要给图片添加绝对定位
 * 3. 可以使用 to() 方法修改默认样式
 * 4. anim() 方法可以修改默认动画
 *      1. 动画效果(详细参见 myTween.js)
 *      2. 动画间隔时间
 *      3. 播放动画时间
 *      4. 每帧动画时间
 * 5. 可以使用 stopAnim 停用动画
 * 6. start() 方法启动动画
 *      1. 是否激活两侧按钮
 *      2. 是否激活小圆点
 */


/**
 * 对需要轮播的元素设置轮播
 * 可设置css 或者 DOM 的简单属性
 * @param {HTMLElement} banner 轮播封装容器
 * @param {HTMLElement} targetEle 轮播对象
 */
function myCarousel(banner, dataUrl, moduleType) {
    return new myCarousel.prototype.init(banner, dataUrl, moduleType);
}

myCarousel.prototype = {
    initData: function () {

        var _this = this;
        this.imgLazyTimer = setTimeout(function () {
            _this.lazyImg();
        }, 500);

        // 获取所有包含图片的节点
        this.imgList = utils.children(this.imgContainer);
        // 获取小圆点节点
        this.cirList = utils.children(this.circleBtnContainer);
        // 获取左边按钮
        this.triLeft = utils.firstChild(this.triggerContainer);
        // 获取右边节点
        this.triRight = utils.lastChild(this.triggerContainer);

        this.img = this.imgContainer.getElementsByTagName('img');
        this.imgA = this.imgContainer.getElementsByTagName('a');
        
        this.imgWidth = utils.getCss(this.imgList[0], 'width');
        utils.setCss(this.imgContainer, 'width', this.imgWidth * this.imgListNum);


        // 默认动画执行时间为 200ms
        this.animTime = 200;
        // 默认动画帧 为 5ms
        this.animStep = 5;
        // 默认播放速度为 3s
        this.duration = 3000;
        // 默认动画效果为 Quart.easeOut
        this.effect = "Quart.easeOut";

    },
    init: function (banner, dataUrl, moduleType) {
        this.banner = banner;
        // 获取图片容器
        this.imgContainer = utils.getElementsByClass('img-container', banner)[0];
        // 获取小圆点容器
        this.circleBtnContainer = utils.getElementsByClass('circle-btn-container', banner)[0];
        // 获取左右按钮容器
        this.triggerContainer = utils.getElementsByClass('trigger-container', banner)[0];
        // 获取图片外围容器
        this.imgWrapper = utils.getElementsByClass('img-wrapper', banner)[0];
        // 所有包含图片的div节点
        this.imgList = null;
        // 所有图片标签节点 img
        this.img = null;
        this.imgA = null;
        this.cirList = null;
        this.triLeft = null;
        this.triRight = null;
        this.beginStyle = {};
        this.moduleType = null;
        // 计算滚动步数
        this.step = 0;
        this.imgWidth = null;
        this.jsonData = null;

        this.style = null;
        this.animStep = null;
        this.animTime = null;
        this.duration = null;
        this.effect = null;
        this.stop = false;

        this.dataUrl = dataUrl;

        this.targetEle = null;
        this.targetFirstEle = null;


        this.getJsonData(dataUrl);
        this.moduleType = typeof moduleType === 'number' ? moduleType : 1;
        this.setJsonData(this.moduleType);
        this.initData();



        // 刚开始显示激活第一个圆点
        utils.addClass(this.cirList[this.step], 'circle-active');
        this.setModule();
        return this;
    },

    /**
     * 选择动画模式
     * 模式1: 通过 left 来实现左右移动
     * 模式2: 通过 scrollLeft 来实现左右移动
     * 模式3: 通过 z-index 和 opacity 来实现渐隐效果
     */
    setModule: function () {
        // 根据模式选择目标和默认样式
        switch (this.moduleType) {
            case 1:
                // 设置目标元素
                this.targetEle = this.imgContainer;
                // 获取目标元素的第一个子节点 (在模式 1, 和 模式2 中这个为 目标元素)
                // 用于获取目标元素的初始样式
                this.targetFirstEle = this.targetEle;
                this.style = {
                    left: -this.imgWidth
                };
                break;
            case 2:
                this.targetEle = utils.getElementsByClass('img-wrapper', this.banner)[0];
                this.targetFirstEle = this.targetEle;
                this.style = {
                    scrollLeft: this.imgWidth
                };
                break;
            case 3:
                this.targetEle = this.imgList;
                // 设置具体图片时, 用于获取图片的初始样式
                this.targetFirstEle = this.targetEle[0];
                this.style = {
                    'z-index': 1,
                    'opacity': 1
                };
                this.animTime = 200;
                this.animStep = 3;
                // 这个使用线性效果 (不要使用高级效果)
                this.effect = "Linear";
                break;
        }
        // 获取样式的初始样式
        for (var key in this.style) {
            this.beginStyle[key] = utils.getCss(this.targetFirstEle, key);
        }

    },

    /**
     * 通过 ajax 获取 json数据
     * @param {String} dataUrl 文件地址
     */
    getJsonData: function (dataUrl) {
        this.jsonData = utils.getJsonData(dataUrl);
    },
    /**
     * 通过滚动模式设置元素
     * 模式1,2 会多出一个图片, 且这个图片和第一个相同
     * @param {Number} moduleType 滚动模式
     */
    setJsonData: function (moduleType) {
        this.module = typeof moduleType === 'number' ? moduleType : 1;
        // 公共的小圆点元素
        utils.setJsonData(this.circleBtnContainer, this.jsonData, '<a href="javascript:;"></a>');
        var str = '';
        // 公共的图片样式
        utils.setJsonData(this.imgContainer, this.jsonData, '<div><a href="javascript:;"><img src="" imgSrc="{imgSrc}"></a></div>');
        switch (this.module) {
            case 1:
            case 2:
                // 最后多出来的图片
                str += '<div>';
                str += '<a href="' + this.jsonData[0]['hrefURL'] + '">';
                str += '<img src=""" imgSrc="' + this.jsonData[0]['imgSrc'] + '">';
                str += '</a></div>'
                this.imgContainer.innerHTML += str;
                // 获取图片列表的数目
                this.imgListNum = this.jsonData.length + 1;
                break;
            case 3:              
                this.imgContainer.innerHTML += str;
                // 模式3中所有图片叠在一次,所以图片列表的数目为 1;
                this.imgListNum = 1;
                break;
        }
    },
    
    /**
     * 开始的时候图片的懒加载
     */
    lazyImg: function () {
        var _this = this;
        this.img = this.imgContainer.getElementsByTagName('img');
        for (var i = 0; i < this.imgList.length; i++) {
            (function (i) {
                var curImg = _this.img[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute('imgsrc');
                // 在 IE 中不能识别 webp 图片
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = 'block';
                    myTween(curImg).to({
                        opacity: 1
                    }, 100).start('Quart.easeIn', 10);
                    oImg = null;
                }
                curImg.isLoad = true;
            })(i);
        }
        clearInterval(this.imgLazyTimer);
    },

    /**
     * 重定义样式
     * @param {Object} style 样式对象
     */
    to: function (style) {
        this.style = style || 0;

        if (typeof this.style !== 'object') throw new Error('请输入正确的样式');
        // 获取初始样式
        for (var key in style) {
            this.beginStyle[key] = utils.getCss(this.targetFirstEle, key);
        }
        return this;
    },

    /**
     * 设置动画
     * @param {String} effect 动画效果
     * @param {Number} duration 时间间隔
     * @param {Number} animTime [动画时间 可选]
     * @param {animStep} animTimeStep [动画时间步长(每帧时间长度) 可选]
     */
    anim: function (effect, duration, animTime, animTimeStep) {
        this.animTime = animTime || 200;
        this.animStep = animTimeStep || 5;
        this.duration = duration || 2000;
        this.effect = effect || "Quart.easeOut";
        return this;
    },

    /**
     * 开始方法
     * @param {String} effect 动画执行函数
     * @param {Boolean} hiddenTri 是否关闭圆点
     * @param {Boolean} hiddenCir 是否关闭两侧按钮
     */
    start: function (hiddenTri, hiddenCir) {
        if (this.moduleType === 3) {
            this.setStyle(this.targetFirstEle, this.style);
        }
        this.hiddenCir = false;
        this.hiddenTri = false;
        if (typeof hiddenCir === 'boolean') this.hiddenCir = hiddenCir;
        if (typeof hiddenTri === 'boolean') this.hiddenTri = hiddenTri;

        for (var i = 0; i < this.cirList.length; i++) {
            this.cirList[i].index = i;
        }
        var _this = this;
        // this.intervalTimer = setInterval(function () {
        //     _this.autoMove(_this.targetEle);
        // }, this.duration);
        this.banner.onmouseenter = function () {
            clearInterval(_this.intervalTimer);
            _this.intervalTimer = null;
        }
        this.banner.onmouseleave = function () {
            _this.intervalTimer = setInterval(function () {
                _this.autoMove(_this.targetEle)
            }, _this.duration);
        }
        // window.onblur = function() {
        //     clearInterval(_this.intervalTimer);
        // }
        // window.focus = function() {
        //     _this.intervalTimer = setInterval(function() {
        //         _this.autoMove(_this.targetEle);

        //     }, _this.duration);
        // }
        
        // 离开页面取消轮播, 回到页面开始轮播
        window.onload = function() {
            document.addEventListener('visibilitychange', function() {
                if(document.hidden) {
                    clearInterval(_this.intervalTimer);
                } else {
                    _this.intervalTimer = setInterval(function() {
                        _this.autoMove(_this.targetEle);
                    }, _this.duration);
                }
    
            })
        }
        
        if (!this.hiddenCir) this.clickCirBtn(this.targetEle);
        if (!this.hiddenTri) this.clickTrigger(this.targetEle);

    },

    /**
     * 播放时是否有动画效果
     * @param {Boolean} stop 时候取消过渡动画
     */
    stopAnim: function (stop) {
        stop = stop || false;
        this.stop = typeof stop === 'boolean' ? stop : false;
        return this;
    },

    /**
     * 设置元素样式或者属性
     * 如果第二项为对象,那么不需要第三项
     * @param {HTMLElement} curEle 需要设置样式的元素
     * @param {Object|String} style 样式对象|样式名字
     * @param {Number} value [样式值]
     */
    setStyle: function (curEle, style, value) {
        style = style || 0;
        // 如果 style 为对象
        if (typeof style === 'object') {
            // 判断是设置属性还是设置css样式
            for (var key in style) {
                typeof utils.css(curEle, key) !== 'undefined' ? utils.css(curEle, key, style[key]) : curEle[key] = style[key];
            }
        } else {
            //  style为样式名字
            typeof utils.css(curEle, style) !== 'undefined' ? utils.css(curEle, style, value) : curEle[style] = value;
        }

    },

    /**
     * 自动播放
     * @param {*} curEle 
     */
    autoMove: function (curEle) {
        // 步长 >= 总长度: 说明到头了
        this.moveModule(curEle);
        this.cirAutoMove();
        this.step++;
    },

    cirAutoMove: function () {
        var index = this.step + 1;
        // 使用 index 替代 step 来控制 圆点和图片顺序同步
        // 直接使用会存在 index 超出问题(实际上图片比圆点多了一个, 最后一张图片和第一张是相同的)
        // 所以 step 会出现 == cirList.length 的情况
        index >= this.cirList.length ? index = 0 : null;
        utils.addClass(this.cirList[index], 'circle-active');
        var brotherList = utils.siblings(this.cirList[index]);
        for (var i = 0; i < brotherList.length; i++) {
            utils.removeClass(brotherList[i], 'circle-active');
        }
    },

    clickCirBtn: function (curEle) {
        var _this = this;

        // 使用事件委托的方式提高性能
        this.circleBtnContainer.onclick = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            var self = e.target;
            if (e.target.tagName.toLowerCase() === 'a') {
                // 如果当前点击的和 滚动位置一致(就是点自己), 不做任何改变
                if (self.index === _this.step) return;
                // index - step:表示我点击的小圆点(要跳到那张图) 和 当前图片为的 差值
                // 这个值并不是它们之间的间隔数(需要有正负)
                //      如何表示间隔数:
                //          如果这个差值 大于0, 就 -1 
                //          如果这个差值 小于0, 就 +1 
                var num = self.index - _this.step > 0 ? self.index - _this.step - 1 : self.index - _this.step + 1;
                // 这个计算 间隔数(没有正负)
                if (Math.abs(self.index - _this.step) - 1 >= 1) {
                    var curStyle = {};
                    var targetStyle = {};
                    if(_this.moduleType === 1 || _this.moduleType === 2) {
                        for (var key in _this.style) {
                            curStyle[key] = typeof utils.css(curEle, key) !== 'undefined' ? utils.css(curEle, key) : curEle[key];
                            targetStyle[key] = (curStyle[key] + (_this.style[key] * num));
                            _this.setStyle(curEle, key, targetStyle[key]);
                        }
                    }
                }
                // 设置图片位置, 在 autoMove 中step 会先 +1, 所以在这里 -1;
                _this.step = self.index - 1;
                _this.autoMove(curEle);
            }
        }
    },

    clickTrigger: function (curEle) {
        var _this = this;
        // 设置点击时间
        this.clickTime = new Date().getTime();
        this.triLeft.onclick = function () {
            var time = new Date().getTime();
            // 如果点击的时候时间 - 上一次时间 <=1000 (也就是每隔1s以上中才能点击)
            if (time - _this.clickTime <= 1000) return;
            // 向左移动如果 step=0, 那么需要将 位置 移动到最后(这样在继续向左时能无缝连接)
            if (_this.step === 0) {
                if (_this.moduleType === 1 || _this.moduleType === 2) {
                    for (var key in _this.style) {
                        _this.setStyle(curEle, key, _this.style[key] * _this.cirList.length);
                    }
                }
                _this.step = 5;
            }
            // 向左的步长是 -2, 在 autoMove 中先 +1, 向左原本需要 -1, 现在需要 -2;
            _this.step -= 2;
            // 将上一次点击时间设置为本次点击时间
            _this.clickTime = time;
            _this.autoMove(curEle);
        }
        this.triRight.onclick = function () {
            var time = new Date().getTime();
            if (time - _this.clickTime <= 1000) return;
            _this.autoMove(curEle);
            _this.clickTime = time;
        }
    },

    moveModule: function (curEle) {
        switch (this.module) {
            case 1:
            case 2:
                if (this.step >= this.cirList.length) {
                    // 将步长重置, 并且让元素回到初始位置;
                    this.step = 0;
                    this.setStyle(curEle, this.beginStyle);
                }
                var style = {};
                for (var key in this.style) {
                    style[key] = this.style[key] * (this.step + 1);
                }
                if (!this.stop) {
                    myTween(curEle).to(style, this.animTime).start(this.effect, this.animStep);
                } else {
                    myTween(curEle).to(style, this.animTime).stopAnim(true).start(this.effect, this.animStep);
                }
                break;
            case 3:
                var index = null;
                if (this.step >= this.cirList.length) {
                    this.step = 0;
                }
                index = this.step + 1;
                if (index >= this.cirList.length) {
                    index = 0;
                }
                for (var i = 0; i < curEle.length; i++) {
                    // 其他元素设置为初始样式时使用动画,
                    // 在这里设置会有画面 重叠情况
                    // myTween(curEle[i]).to(this.style, this.animTime).start(this.effect, this.animStep);

                    // 其他元素不使用动画,直接设置为初始样式
                    // this.setStyle(curEle[i], this.beginStyle);

                    if (index === i) {
                        // this.setStyle(curEle[i], 'z-index', 1);
                        if(!this.stop) {
                            myTween(curEle[i]).to(this.style, this.animTime).start(this.effect, this.animStep);
                        }else {
                            myTween(curEle[i]).to(this.style, this.animTime).stopAnim(true).start(this.effect, this.animStep);
                        }
                    }else{
                        // 放在这里可以避免出现画面 出现意外情况(透明度相同,并且颜色差距大时会出现 混乱情况)
                        myTween(curEle[i]).to(this.beginStyle, this.animTime).start(this.effect, this.animStep);
                    }
                   
                }
                break;
        }
    }
}

myCarousel.prototype.init.prototype = myCarousel.prototype;