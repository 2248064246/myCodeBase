/*
 * @Author: huangyingli
 * @Date: 2022-02-04 19:59:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-04 20:08:49
 * @Description:
 */
function visualize(analyser) {
  var canvas = document.createElement('canvas');
  var canvasCtx = canvas.getContext('2d');
  canvas.width = 640;
  canvas.height = 100;
  canvas.style.borderTop = '1px solid black';
  canvas.style.borderBottom = '1px solid black';
  canvas.style.boxShadow =
    '0 -2px 4px rgba(0, 0, 0, 0.7),0 3px 4px rgba(0, 0, 0, 0.7)';
  WIDTH = canvas.width;
  HEIGHT = canvas.height;

  document.body.appendChild(canvas);

  var visualSetting = 'frequencybars';

  if (visualSetting === 'sinewave') {
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var draw = function () {
      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = (WIDTH * 1.0) / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  } else if (visualSetting == 'frequencybars') {
    analyser.fftSize = 256;
    var bufferLengthAlt = analyser.frequencyBinCount;
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);
    console.log(bufferLengthAlt, dataArrayAlt);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    var drawAlt = function () {
      drawVisual = requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(dataArrayAlt);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = (WIDTH / bufferLengthAlt) * 1;
      var barHeight;
      var x = 0;

      for (var i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    };

    drawAlt();
  } else if (visualSetting == 'off') {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.fillStyle = 'red';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

module.exports = visualize
