
## 表单中按下`enter`切换焦点, 最后按下`enter`提交表单

```javaScript
/**
 * 按下enter切换焦点
 * @param {Element} field 表单元素
 * @param {Event} event 事件
 */
function handleEnter(field, event, next) {
  var keyCode = event.keyCode ? event.keyCode : event.which ?
    event.which : event.charCode;
  // ie 不兼容Array.from 和 filter
  // var formEleAry = Array.from(field.form.elements).filter(function (item) {
  //   return !!item.offsetParent
  // })
  var formEleAry = []
  for (var k = 0; k < field.form.elements.length; k++) {
    if (field.form.elements[k].offsetParent) {
      formEleAry.push(field.form.elements[k])
    }
  }
  if (keyCode == 13 || next) {
    var i;
    for (i = 0; i < formEleAry.length; i++) {
      if (field == formEleAry[i]) {
        break;
      }
    }
    i = (i + 1) % formEleAry.length;
    if (formEleAry[i].getAttribute('type') === 'button') {
      formSubmit() // 遇到表单提交按钮, 直接提交表单
      return
    }
    formEleAry[i].focus();
    return false;
  } else
    return true;
}
```