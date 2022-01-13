/*
 * @Author: huangyingli
 * @Date: 2022-01-13 15:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-13 17:44:36
 * @Description:
 */

import '../../../../../node_modules/pica/dist/pica.js';

pica = pica();

let input = document.querySelector('input');
let img = new Image();

let origin = document.querySelector('.origin');

input.addEventListener('change', change);
function change() {
  let file = input.files[0];

  console.log('图片大小:', file.size / 1024);

  let reader = new FileReader();
  // 一定要在 onload 之后进行操作
  reader.onload = (event) => {
    img.src = event.target.result;
    img.onload = () => {
      // console.log(img)
      origin.width = img.width; // 通过这种方法可以获取图片尺寸, canvas在页面中的大小和它的画布大小并没有关系
      origin.height = img.height;
      let oCtx = origin.getContext('2d');
      oCtx.drawImage(img, 0, 0);

      let canvas = document.querySelector('.show');

      canvas.width = 300;
      canvas.height = (img.height * canvas.width) / img.width;

      var ctx2 = canvas.getContext('2d');
      ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          console.log('canvas 压缩:', blob.size / 1024);
        },
        'image/jpeg',
        1
      );

      let canvas2 = document.createElement('canvas');
      canvas2.width = canvas.width;
      canvas2.height = canvas.height;

      pica
        .resize(origin, canvas)
        .then((result) => pica.toBlob(result, 'image/jpeg', 1))
        .then((blob) => {
          console.log('pica压缩后大小:', blob.size / 1024, 'KB');
        });
    };
  };
  reader.readAsDataURL(file);
}
