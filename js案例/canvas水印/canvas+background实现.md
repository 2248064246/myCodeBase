# canvas + background 实现

canvas 绘制单独一个水印, 然后导出为 base64 形式的图像格式, 再设置 background, 通过 repeat 填充整个背景.

```js
let styles;
function watermark() {
  let wm = {
    init,
    instances: [],
  };
  let defaultSettings = {
    container: document.body,
    width: '240px',
    height: '120px',
    textAlign: 'left',
    textBaseline: 'middle',
    font: '14px PingFang SC Regular,Microsoft Yahei',
    color: 'rgba(0, 0, 0, 0.25)',
    text: 'username',
    rotate: '30',
    zIndex: '',
    x: 10,
    y: 100,
    observe: false,
  };

  /**
   * 初始化
   * @param {Object} options
   */
  function init(options) {
    options = Object.assign(defaultSettings, options || {});

    wm.options = options;

    let canvas = document.createElement('canvas');

    canvas.setAttribute('width', options.width);
    canvas.setAttribute('height', options.height);
    let ctx = canvas.getContext('2d');

    ctx.textAlign = options.textAlign;
    ctx.textBaseline = options.textBaseline;
    ctx.font = options.font;
    ctx.fillStyle = options.color;
    ctx.rotate(-(Math.PI / 180) * options.rotate);
    ctx.fillText(options.text, options.x, options.y);

    let dataurl = canvas.toDataURL();
    let watermarkElem = document.createElement('div');
    styles = `position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:${
      isEmpty(options.zIndex) ? Math.max(getMaxZIndex(), 99) : options.zIndex
    };
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${dataurl}');`;
    watermarkElem.setAttribute('style', styles);

    // IE 10 pointer-event 兼容性
    watermarkElem.onclick = handlePointerEvent;

    clear();
    options.container.appendChild(watermarkElem);
    wm.instances.push(watermarkElem);

    if (options.observe) {
      observe(options);
    }
  }

  function handlePointerEvent(e) {
    e.currentTarget.setAttribute('style', `display:none;${styles}`);
    let bottomElement = document.elementFromPoint(e.clientX, e.clientY);
    console.log('bottomElement:', bottomElement);
    e.currentTarget.setAttribute('style', `${styles}`);
    bottomElement.click();
  }

  /**
   * 清除
   */
  function clear() {
    wm.instances.forEach((elem) => {
      elem.parentElement && elem.parentElement.removeChild(elem);
    });
  }

  /**
   * MutationObserver 监控
   * @param {Object} options
   */
  function observe(options) {
    const MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    if (MutationObserver) {
      let mutationIns = new MutationObserver(function () {
        console.log('MutationObserver Change');
        mutationIns.disconnect();
        mutationIns = null;
        wm.init(options);
      });

      mutationIns.observe(options.container, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }
  }

  return wm;
}

/**
 * 获取最大z-index
 */
function getMaxZIndex() {
  let arr = [...document.all].map(
    (e) => +window.getComputedStyle(e).zIndex || 0
  );
  return arr.length ? Math.max(...arr) : 0;
}

/**
 * 判断值是否为空
 * @param {Any} val
 */
function isEmpty(val) {
  return val === null || val === undefined || val === '';
}

export default watermark();
```

使用及参数说明

```
 - container 容器, defalut:document.body
        - width canvas 宽度, defalut:"240px"
        - height canvas 高度, defalut:"120px"
        - x 开始绘制文字的 x 坐标, defalut:10
        - y 开始绘制文字的 y 坐标, defalut:100
        - textAlign 文字对齐方式, defalut:"left"
        - textBaseline Baseline 对齐方式, defalut:"middle"
        - text 水印文字, defalut:"username"
        - font 字体, defalut:"14px PingFang SC RegularMicrosoft Yahei"
        - color 文字颜色, defalut:"rgba(0 0 0 0.25)"
        - rotate 旋转角度, defalut:"30"
        - zIndex z-index 数值
        - observe 使用 MutationObserver 检测 dom 被修改时重新绘制水印, defalut:false (这个功能最好不要开启)
```

[本篇源码](https://github.com/inooNgt/watermark-canvas)

[一个不错的参考](https://github.com/saucxs/watermark-dom)