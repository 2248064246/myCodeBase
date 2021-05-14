// 1.获取页面元素的方法
// document.getElementById(); (Document)
// context.getElementsByClassName(); // 在 IE6~8 不兼容 (Document| Element)
// context.getElementsByTagName(); // 子子孙孙都能得到, 只要标签名字相同 (Document| Element)
// document.getElementsByName(); // 在IE中只对表单元素中的 name 属性有效(一般来来说,这个也就是用来获取这个的) (Document)
// document.documentElement; (Document)
// document.body; (Document)
// document.head; (Document)
// context.querySelector();/context.querySelectorAll(); // 在 Ie6~8下不兼容, 获取的元素不存在 映射关系(就是不会实时更新) (Document | Element)

// 2. 描述节点和节点之间的关系的属性
// childNodes (Node)
// children // (IE6~8不兼容,会将注释也作为元素节点获取) (Document | Element)
// firstChild/lastChild (Node)
// previousSibling/nextSibling (IE中不兼容) (Node)
// firstElement/lastElement (Element) (IE9 以下不兼容)
// perviousElementSibling/nextElementSibling (IE9 以下不兼容) (Element)
// parentNode/parentElement (Node)
// ELEMENT_NODE:1   ATTRIBUTE_NODE:2    TEXT_NODE:3     COMMENT_NODE:8      DOCUMENT_NODE:9

// 3.动态操作DOM的方法
// createTextNode
// createAttribute
// createComment
// createElement 
// document.createDocumentFragment()
// appendChild (Node)
// append (IE10以下不兼容) (Element)
// insertBefore (IE9 以下不兼容) (Node)
// cloneNode (Node)
// replaceChild (Node)
// removeChild (Node)
// get/set/removeAttribute (Element)

// 4. DOM盒子模型
// clientHight/clientWidth (Element)
// clientTop/clientLeft (Element)
// offsetHeight/offsetWidth (HTMLElement)
// offsetTop/offsetLeft (HTMLElement)
// scrollHeight/scrollWidth (Element)
// scrollTop/scrollLeft (Element)

// 4. 类名,id名获取
// className (Element)
// classList (Element) (IE10 以下不兼容)
// id (Element)

// JQuery 中的方法实现
// function children => 获取某一个容器中所有的子元素节点(可以指定标签名字) 

// function getElementsByClass => 通过元素的样式名来获取一组属性 (兼容所有浏览器) (JQuery中没有这个方法,但是JQuery中的部分选择器也是基于这个方法原理来实现的)

// function prev => 获取上一个兄弟元素节点
// function next => 获取下一个兄弟元素节点
// function prevAll => 获取所有的哥哥节点
// function nextAll => 获取所有的弟弟节点
// function sibling => 获取相邻的两个元素节点
// function siblings => 获取所有的兄弟元素节点

// function firstChild => 获取元素第一个子元素节点
// function lastChild => 获取元素最后一个子元素节点 
// 上面两个方法 JQuery中也没有

// function index 获取当前元素索引

// function prepend => 和 appendChild 对应, 增加到某一个容器的开头
// function insertAfter => 和 insertBefore 对应, 增加到容器中某一个元素后面

// function addClass 增加样式
// function removeClass 删除样式
// function hasClass 判断时候存在某一个类

// function getCss
// function setCss
// function setGroupCss


/**
 * 获取子元素节点
 * @param {HTMLElement} curEle 父元素
 * @param {String} tagName [标签名(可选)]
 * @returns {Array} 子元素数组
 * @author 洛水赋神
 */
function children(curEle, tagName) {
    var nodeList = curEle.childNodes,
        ary = [];
    // 在IE6~8下不能使用内置的children 属性获取子节点
    // 首先获取所有的子节点(childNodes), 在把所有子节点中的元素节点过滤出来
    if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
        // navigator.usrAgent 判断浏览器类型
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            // 通过 nodeType 来判断节点类型,筛选出元素节点
            curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
        }
        nodeList = null;
    } else {
        // 标准浏览器中可以使用 children属性来获取子元素节点
        // children 获取的 HTMLCollection 集合(类数组), 需要转为数组
        
        ary = Array.prototype.slice.call(curEle.children);
    }
    // 如果传入 tagName 做二次筛选
    if (typeof tagName === 'string') {
        // 使用 ary.length , 内容有删除长度会跟着变, 不会造成超出索引的问题
        for (var k = 0; k < ary.length; k++) {
            var curEleNode = ary[k];
            // 通过节点名字来判断, 统一转化为小写
            if (curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                ary.splice(k, 1);
                k--;
            }
        }
    }
    return ary;
}

/**
 * 获取上一兄弟元素节点
 * @param {HTMLElement} curEle 当前元素
 * @returns {HTMLElement} 返回上一个兄弟元素
 */
function prev(curEle) {
    // 如果不是 IE6~8, 则直接使用内置方法(内置previousElementSibling 在IE6~8中不兼容)
    if (!/MSIE (6|7|8)/i.test(navigator.userAgent)) return curEle.previousElementSibling;
    // 首先获取当前元素的上一个哥哥节点,判断是否为元素节点,不是的话继续向上,如果没有返回null
    var pre = curEle.previousSibling;
    // 如果 pre存在并且节点不是 元素节点 则继续查找
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
}

/**
 * 获取下个兄弟元素节点
 * @param {HTMLElement} curEle 当前元素
 * @returns {HTMLElement} 返回弟弟元素
 */
function next(curEle) {
    if (!/MSIE (6|7|8)/i.test(navigator.userAgent)) return curEle.nextElementSibling;
    var pre = curEle.nextSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.nextSibling;
    }
    return pre;
}

/**
 * 获取所有的哥哥元素节点
 * @param {HTMLElement} curEle 当前元素
 * @returns {Array} 所有哥哥元素数组
 */
function prevAll(curEle) {
    var ary = [];
    // 通过获取上一个哥哥节点,并通过这个在向上获取得到所有的哥哥节点
    var prevEle = prev(curEle);
    while (prevEle) {
        ary.push(prevEle);
        prevEle = prev(prevEle);
    }
    return ary;
}

/**
 * 获取所有的弟弟元素节点
 * @param {HTMLElement} curEle 当前元素
 * @returns {Array} 所有弟弟元素数组
 */
function nextAll(curEle) {
    var ary = [];
    var nextEle = next(curEle);
    while (nextEle) {
        ary.unshift(nextEle);
        nextEle = next(nextEle);
    }
    return ary;
}

/**
 * 获取当前元素相邻的两个节点
 * @param {HTMLElement} curEle 当前元素
 * @returns {Array} 返回数组
 */
function sibling(curEle) {
    var ary = [];
    var preEle = prev(curEle);
    var nextEle = next(curEle);
    // 这里需要判断是否存在, (其实不用也行吧, 没有找到默认返回的不就是 null)
    preEle ? ary.push(preEle) : null;
    nextEle ? ary.push(nextEle) : null;
    return ary;
}

/**
 * 获取所有的兄弟元素节点 
 * @param {HTMLElement} curEle 当前元素
 * @returns {Array} 返回数组
 */
function siblings(curEle) {
    // 将所有哥哥节点和弟弟节点连起来返回
    return prevAll(curEle).concat(nextAll(curEle));
}

/**
 * 获取当前元素的索引
 * @param {HTMLElement} curEle 当前元素
 * @returns {Number} index
 */
function index(curEle) {
    // 当前元素的索引就是 哥哥元素集合的长度
    // 排多少号就说明前面有多少个哥哥节点
    return prevAll(curEle).length;
}

/**
 * 获取当前元素的第一个子元素
 * @param {HTMLElement} curEle 当前元素
 * @returns {HTMLElement} 获取到的元素,没有返回 null
 */
function firstChild(curEle) {
    var chs = children(curEle);
    return chs.length > 0 ? chs[0] : null;
}

/**
 * 获取当前元素的最后一个子元素
 * @param {HTMLElement} curEle 当前元素
 * @returns {HTMLElement} 获取到的元素,没有返回 null
 */
function lastChild(curEle) {
    var chs = children(curEle);
    return chs.length > 0 ? chs[chs.length - 1] : null;
}

/**
 * 向当前容器的末尾追加元素
 * @param {HTMLElement} newEle 添加的元素
 * @param {HTMLElement} container 容器元素
 * @returns {undefined} undefined
 */
function append(newEle, container) {
    // 其实 append和 appendChild 内置方法中都有
    // 内置append方法 IE 中不支持
    container.appendChild(newEle);
}

/**
 * 向当前容器的开头添加元素
 * @param {HTMLElement} newEle 添加的元素
 * @param {HTMLElement} container 容器元素
 * @returns {undefined} undefined
 */
function prepend(newEle, container) {
    // 要想向开头添加, 就是向container 的第一个元素前面插入
    var fir = firstChild(container);
    // 判断是否存在第一个元素, 没有直接使用 appendChild 加入就可以
    fir ? container.insertBefore(newEle, fir) : container.appendChild(newEle);
}

/**
 * 向当前元素之前插入新元素(这个方法内置方法中有)
 * @param {HTMLElement} newEle 添加的新元素
 * @param {HTMLElement} oldEle 当前元素
 * @returns {undefined} undefined
 */
function insertBefore(newEle, oldEle) {
    // 需要先得到当前元素的父元素 在 添加, 因为这个添加是向元素添加子元素
    oldEle.parentElement.insertBefore(newEle, oldEle);
}

/**
 * 向当前元素之后插入新元素
 * @param {HTMLElement} newEle 添加的新元素
 * @param {HTMLElement} oldEle 当前元素
 */
function insertAfter(newEle, oldEle) {
    // 找到当前元素的下一个弟弟元素, 向它前面添加就可以了
    var nextEle = next(oldEle);
    nextEle ? oldEle.parentElement.insertBefore(newEle, nextEle) : oldEle.parentElement.appendChild(newEle);
}

// ==================================================================
// 操作样式类名, classList 在IE10以下不兼容
/**
 * 判断当前元素class属性中是否包含这个类名
 * @param {HTMLElement} curEle 当前元素
 * @param {String} className 需要判断类名
 * @returns {Boolean} true/false
 */
function hasClass(curEle, className) {
    // 这个正则匹配: 以className开头, 或者空格开头, className在中间, 空格结尾或者className结尾
    var reg = new RegExp("(^| +)" + className + "( +|$)");
    return reg.test(curEle.className);
}

/**
 * 向当前元素class属性添加类名
 * @param {HTMLElement} curEle 当前元素
 * @param {HTMLElement} className 需要添加的类名
 */
function addClass(curEle, className) {
    // 首先先去除出两边的空白(内置 trim 方法在IE9以下不兼容...)
    // 然后在间字符串转为数组 (以空格分隔)
    // 无论中间隔多少个空格都能识别
    var ary = className.replace(/^ +| +$/g, "").split(/ +/g);
    for (var i = 0; i < ary.length; i++) {
        if (!hasClass(curEle, ary[i])) {
            curEle.className += " " + ary[i];
        }
    }
}

/**
 * 删除当前元素class 属性中的 类
 * @param {HTMLElement} curEle 当前元素
 * @param {HTMLElement} className 需要删除的类名
 */
function removeClass(curEle, className) {
    // 先转为数组,然后再循环判断是否存在这个类名
    var ary = curEle.className.replace(/^ +| +$/g, "").split(/ +/g);
    for (var i = 0; i < ary.length; i++) {
        if (hasClass(curEle, className)) {
            var reg = new RegExp("(^| +)" + className + "( +|$)", "g");
            // 获取到需要删除的类名, 然后使用" " 替代(用于分隔其他类名)
            // 这里使用正则的原因是需要 替换字符串
            curEle.className = curEle.className.replace(reg, " ");
        }
    }
}

// ===================================================================
/**
 * 通过元素类名来获取一组元素集合
 * @param {String} className 样式类名
 * @param {HTMLElement} context 获取元素(默认document)
 * @returns {Array} 返回包含类名元素的数组
 */
function getElementsByClass(className, context) {
    // 如果context 存在, 则等于 context, 否则等于document
    context = context || document;
    if (!/MSIE (6|7|8)/i.test(navigator.userAgent)) return Array.prototype.slice.call(context.getElementsByClassName(className));
    // 处理 IE9以下不兼容问题
    // 依旧是先将类名转换为数组
    var classNameAry = className.replace(/^ +| +$/g, "").split(/ +/g);
    // 获取所有的子节点( * 代表所有子节点)
    var nodeList = context.getElementsByTagName("*");
    var ary = [];
    // 循环所以子节点
    for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        var contains = true;
        // 每一项子节点循环传入的类名数组(插入的可能包含多个类)
        for (var k = 0; k < classNameAry.length; i++) {
            // 判断这个子节点时候包含 这个类
            var reg = new RegExp("(^| +)" + classNameAry[i] + "( +|$)");
            if (!reg.test(curNode.className)) {
                // 不包含直接退出,并且将 contains 标志变为 false;
                contains = false;
                break;
            }
        }
        // 判断 contains标志, 为true 表明当前子节点包含这个类名(类集合)
        if (contains) {
            // 将这个字节点 存入数组
            ary.push(curNode);
        }
    }
    return ary;
}


// function win 获取浏览器盒子模型信息
// function offset  获取当前元素距离 body 的左偏移和上偏移
// function listToArray 将类数组转为数组
// formatJSON 格式化 JSON格式字符串
// getCss 获取所有经过浏览器计算的样式


// ==========================
/**
 * 将json字符串格式化为对象
 * @param {String} jsonStr json字符串
 */
function formatJSON(jsonStr) {
    // 在 IE6~7中 没有JSON对象
    // 如果存在 JSON 对象, 则使用 JSON.parse() 没有 使用 eval()
    // eval 将字符串执行,(最好加上一个括号括起来, 并且只能是 双引号)
    return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
}

function listToArray(likeAry) {
    var ary = [];
    // 在 IE9以下,不支持借用数组的slice 实现将元素集合,节点结合类数组转化为数组(会报错). 但是 arguments 可以
    try {
        // 如果报错, 会执行catch中的代码
        ary = Array.prototype.slice.call(likeAry);
    } catch (e) {
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
    }
    return ary;
}

/**
 * 获取 浏览器(html|body)的属性
 * 如果只传递属性名获取属性的值
 * 如果传入属性值 是设置属性
 * @param {String} attr 属性名
 * @param {String} value [属性值]
 */
function win(attr, value) {
    if (typeof value === "undefined") {
        // 没有传递 值, 属于获取属性值
        return document.documentElement[attr] || document.body[attr];
    }
    // 设置属性
    document.documentElement[attr] = value;
    document.body[attr] = value;
}

/**
 * 获取元素到body顶部的距离
 * @param {HTMLElement} curEle 
 */
function offset(curEle) {
    var disLeft = curEle.offsetLeft,
        disTop = curEle.offsetTop,
        par = curEle.offsetParent;
    while (par) {
        if (/MSIE (6|7|8)/i.test(navigator.userAgent)) {
            disLeft += par.clientLeft;
            disTop += par.clientTop;
        }
        disLeft += par.offsetLeft;
        disTop += par.offsetTop;
        par = par.offsetParent;
    }
    return {
        top: disTop,
        left: disLeft
    };
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

/**
 * 给当前添加样式
 * @param {HTMLElement} curEle 当前元素
 * @param {String} attr 样式名
 * @param {String} value 样式值
 */
function setCss(curEle, attr, value) {
    // 在JS中设置float样式也需要处理兼容
    if(attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"]= value;
        return;
    }
    // 对 opacity 样式做兼容处理
    if(attr === "opacity") {
        // 标准浏览器中直接设置
        curEle["style"]["opacity"] = value;
        // IE9以下,上面无效,使用特殊样式
        curEle["style"]["filter"] = "alpha(opacity=" + value*100 + ")";
        return;
    }
    var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
    if(reg.test(attr)) {
        // 判断传入的value 是否是一个有效数字
        if(!isNaN(value)){
            value +='px';
        }
    }
    curEle["style"][attr] = value;
}

/**
 * 通过css属性对象批量设置元素样式

 * @param {HTMLElement} curEle 当前元素
 * @param {Object} cssObj css样式对象
 * @example {width:100px,height:100px} 
 */
function setGroupCss(curEle, cssObj) {
    // 通过检测 cssObj 的数据类型,如果不是对象不能进行批量设置
    // if(Object.prototype.toString.call(cssObj) !== "[object Object]") {
    //     return;
    // }
    cssObj = cssObj || 0;
    if(cssObj.toString() !== "[object Object]") return;
    for(var key in cssObj) {
        if(cssObj.hasOwnProperty(key)) {
            setCss(curEle, key, cssObj[key]);
        }
    }
}

/**
 * 可以获取,单独设置,批量设置元素样式 
 * 第一项 当前元素
 * 第二项样 式对象|样式名
 * [第三项 样式值]
 */
function css() {
    var artTwo = arguments[1];
    // 如果存在第二项,且第二项为字符串
    if(typeof artTwo === "string") {
        // 判断时候存在第三项
        var argThree = arguments[2];
        // 不存在第三项说明是获取样式值
        if(typeof argThree === 'undefined') return getCss.apply(this, arguments);
        // 存在第三项说明是设置样式值
        setCss.apply(this, arguments);
    }
    artTwo = artTwo || 0;
    // 第二项为 对象, 说明是批量设置样式
    if(artTwo.toString() === "[object Object]") {
        setGroupCss.apply(this, arguments);
    }   
}

/**
 * 通过 Ajax 获取JSON数据 (IE10以下不兼容), 并将获取的JSON数据返回为对象
 * @param {String} dataURL 文件路径
 * @returns {Object} 返回js对象
 */
function getJsonData(dataURL) {
    dataURL = dataURL || null;
    if(typeof dataURL !== 'string') throw new Error('请输入字符串地址');
    var xhr = new XMLHttpRequest;
    var url = dataURL + '?_=' + Math.random(),
        jsonData = null;
    xhr.open('get', url, false);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            var val = xhr.responseText;
            jsonData = utils.formatJSON(val);
        }
    }
    xhr.send(null);
    return jsonData;
}

/**
 * 将js对象中的数据 按照模板模式插入元素中
 * @param {HTMLElement} curEle 要插入数据的元素
 * @param {Object} dataObj js对象
 * @param {String} template 模板字符串
 * @description 会通过{}传入的名字从js对象中找到相应数据并替换
 * @template '<a href="javascript:;"><img src="" imgSrc="{imgSrc}"></a>'
 */
function setJsonData(curEle, dataObj, template) {
    // <div><a href={1}><img src="" imgSrc={imgSrc}></a></div>
    dataObj = dataObj || 0;
    var str = '';
    if(typeof dataObj !== 'object') throw new Error('请输入正确的数据');
    var flag = /\{\w+}/g.test(template);
    for(var i = 0; i< dataObj.length; i++) {
        var curData = dataObj[i];
        if(flag) {
            // replace() 中的正则可以捕获小分组
            // 如果有多个 {}, 会进行循环
            var b = template.replace(/\{(\w+)}/g, function(value, value2, index) {
                return curData[value2];
            }); 
            str += b;  
        }else {
            str += template;
        }           
    }
    curEle.innerHTML = str;
}

var  utils = (function() {
    return {
        index:index,
        win: win,
        css: css,
        getCss:getCss,
        setCss:setCss,
        children: children,
        lastChild: lastChild,
        firstChild: firstChild,
        next: next,
        prev: prev,
        nextAll: nextAll,
        prevAll: prevAll,
        sibling: sibling,
        siblings: siblings,
        append: append,
        prepend: prepend,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClass: getElementsByClass,
        getJsonData: getJsonData,
        setJsonData: setJsonData
    }
})()

