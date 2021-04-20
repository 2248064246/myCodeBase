# Canvas 绘制文本相关

## 文本域(自动换行)
```javaScript
/**
 * 文本域(能够自动换行)
 * @param {CanvasConText} ctx '2d' canvas上下文
 * @param {String} text 要写入的文本
 * @param {Array} area 文本域区域, x轴位置, y轴位置, 宽度, 高度
 */
textArea (ctx, text, area, lineHeight = 45, fontSize, alignCenter = false, fontWight = 'normal', align = 'left', color = 'black', fontFamily = '宋体') {
  // area: 0: 起始点x轴位置, 1:, 2: 文本域宽度, 3: 文本域高度

  var areaW = area[2]
  var areaH = area[3]
  var lastSubStrIndex = 0 // 每次开始截取的字符串的索引
  var lineWidth = 0
  var initHeight = area[1];//绘制字体距离canvas顶部初始的高度
  var cutStrAryIndex = []; // 记录字符被裁减的位置, 数组长度为多少就换了多少次行

  for (var i = 0; i < text.length; i++) {
    lineWidth += ctx.measureText(text[i]).width // 不同的字体容纳情况不一样
    // 如果要做居中, 需要先循环一次, 每一行的超出位置
    if ((initHeight - area[1]) > areaH - lineHeight) {
      break;
    }
    if (lineWidth > areaW) {
      !alignCenter && this.text(ctx, text.substring(lastSubStrIndex, i), [area[0], initHeight], fontSize, fontWight, align, color, fontFamily)
      initHeight += lineHeight
      lineWidth = 0;
      lastSubStrIndex = i;
      cutStrAryIndex.push(i)
    }
    if (i == text.length - 1) {//绘制剩余部分 {
      !alignCenter && this.text(ctx, text.substring(lastSubStrIndex, i + 1), [area[0], initHeight], fontSize, fontWight, align, color, fontFamily)
      cutStrAryIndex.push(i + 1)
    }

  }

  if (alignCenter) {
    var divide = areaH / (cutStrAryIndex.length + 1) // 平分距离
    lastSubStrIndex = 0
    initHeight = area[1]
    initHeight += divide - lineHeight / 2
    cutStrAryIndex.forEach((item, index) => {

      this.text(ctx, text.substring(lastSubStrIndex, item), [area[0], initHeight], fontSize, fontWight, align, color, fontFamily)
      lastSubStrIndex = item
      initHeight += divide

    })
  }

},
```

## 文字字符字间距方法(横排)
```javaScript
/**
 * @param {Array} start 文字位置, x轴位置, y轴位置 
 */
letterSpacingText (ctx, text, start, fontSize, fontWeight = 'normal', align = 'center', color = 'black', fontFamily = '宋体', letterSpacing = 60) {
  if (fontWeight === 'bold') {
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  }
  ctx.font = `bold ${fontSize} ${fontFamily}`
  ctx.fillStyle = color
  ctx.textAlign = align
  var context = ctx;
  var canvas = context.canvas;
  var x = start[0];
  var y = start[1]
  if (!letterSpacing && canvas) {
    letterSpacing = parseFloat(window.getComputedStyle(canvas).letterSpacing);
  }
  if (!letterSpacing) {
    return this.fillText(text, x, y);
  }

  var arrText = text.split('');
  align = context.textAlign || 'left';

  // 这里仅考虑水平排列
  var originWidth = context.measureText(text).width;
  // 应用letterSpacing占据宽度
  var actualWidth = originWidth + letterSpacing * (arrText.length - 1);
  // 根据水平对齐方式确定第一个字符的坐标
  if (align == 'center') {
    x = x - actualWidth / 2;
  } else if (align == 'right') {
    x = x - actualWidth;
  }

  // 临时修改为文本左对齐
  context.textAlign = 'left';
  // 开始逐字绘制
  arrText.forEach(function (letter) {
    var letterWidth = context.measureText(letter).width;
    context.fillText(letter, x, y);
    // 确定下一个字符的横坐标
    x = x + letterWidth + letterSpacing;
  });
  // 对齐方式还原
  context.textAlign = align;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'none'
},
```

## 竖版文字方法(支持字间距)
```javaScript
/**
 * 竖版文字方法(支持添加字符边距)
 */
fillTextVertical (ctx, text, start, fontSize, fontWeight = 'normal', align = 'center', color = 'black', fontFamily = '宋体', space = 60) {
  if (fontWeight === 'bold') {
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  }
  ctx.font = `bold ${fontSize} ${fontFamily}`
  ctx.fillStyle = color
  var context = ctx;
  var x = start[0];
  var y = start[1]

  var arrText = text.split('');
  var arrWidth = arrText.map(function (letter) {
    return context.measureText(letter).width + space;
  });

  var baseline = context.textBaseline;

  if (align == 'left') {
    x = x + Math.max.apply(null, arrWidth) / 2;
  } else if (align == 'right') {
    x = x - Math.max.apply(null, arrWidth) / 2;
  }
  if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
    y = y - arrWidth[0] / 2;
  } else if (baseline == 'top' || baseline == 'hanging') {
    y = y + arrWidth[0] / 2;
  }

  context.textAlign = 'center';
  context.textBaseline = 'middle';


  // 开始逐字绘制
  arrText.forEach(function (letter, index) {
    // 确定下一个字符的纵坐标位置
    var letterWidth = arrWidth[index];
    // 是否需要旋转判断
    var code = letter.charCodeAt(0);
    if (code <= 256) {
      context.translate(x, y);
      // 英文字符，旋转90°
      context.rotate(90 * Math.PI / 180);
      context.translate(-x, -y);
    } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
      // y修正
      y = y + arrWidth[index - 1] / 2;
    }
    context.fillText(letter, x, y - letterWidth - space);
    // 旋转坐标系还原成初始态
    context.setTransform(1, 0, 0, 1, 0, 0);
    // 确定下一个字符的纵坐标位置
    letterWidth = arrWidth[index];
    y = y + letterWidth;
  });
  // 水平垂直对齐方式还原
  context.textAlign = align;
  context.textBaseline = baseline;
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'none'
},
```

## 普通文本方法

```javaScript
  /**
 * 文本方法
 */
text (ctx, text, start, fontSize, fontWeight = 'normal', align = 'center', color = 'black', fontFamily = '宋体') {
  if (fontWeight === 'bold') {
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  }
  ctx.font = `bold ${fontSize} ${fontFamily}`
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.fillText(text, start[0], start[1])
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = 'none'
},
```

## 划线方法

```javaScript
/**
 * 划线条方法
 * @param {Array} start 起始点x轴位置, y轴位置
 * @param {Array} end 结束点x轴位置, y轴位置
 */
line (ctx, start, end, color, width) {
  ctx.beginPath();
  ctx.fillStyle = color
  ctx.lineWidth = width
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);
  ctx.stroke();
},
```

